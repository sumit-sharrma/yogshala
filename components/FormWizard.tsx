"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FormData, Question, FormSection } from "@/lib/types";
import { formSections, disclaimerQuestion, finalQuestion } from "@/lib/formSchema";
import { isNodeVisible } from "@/lib/visibility";
import { submitForm } from "@/lib/submitForm";
import { useAutoSave } from "@/hooks/useAutoSave";
import { trackEvent } from "@/components/Analytics";
import ProgressBar from "./ui/ProgressBar";
import QuestionRenderer from "./QuestionRenderer";

interface FormWizardProps {
  embedded?: boolean;
  scrollSectionId?: string;
  onBack?: () => void;
}

type Step = {
  base: Question;
  section: FormSection;
  followUps: Question[];
};

export default function FormWizard({ embedded = false, scrollSectionId, onBack }: FormWizardProps) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [savedFlash, setSavedFlash] = useState(false);
  const saveFlashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const progressRef = useRef(0);
  const submittedRef = useRef(false);

  const { clearSaved } = useAutoSave(formData, setFormData);

  const handleChange = useCallback((id: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    setSavedFlash(true);
    if (saveFlashTimer.current) clearTimeout(saveFlashTimer.current);
    saveFlashTimer.current = setTimeout(() => setSavedFlash(false), 1600);
  }, []);

  const handleBlur = useCallback((id: string) => {
    setTouched((prev) => ({ ...prev, [id]: true }));
  }, []);
const visibleSections = useMemo(() => formSections.filter((s) => isNodeVisible(s, formData)), [formData]);

  const steps = useMemo<Step[]>(() => {
    const result: Step[] = [];
    for (const section of visibleSections) {
      for (const q of section.questions) {
        if (!isNodeVisible(q, formData)) continue;

        const dep = q.dependsOn?.questionId;
        if (dep) {
          const target = result.find((s) => s.base.id === dep);
          if (target) {
            target.followUps.push(q);
          } else {
            result.push({ base: q, section, followUps: [] });
          }
        } else {
          result.push({ base: q, section, followUps: [] });
        }
      }
    }
    return result;
  }, [visibleSections, formData]);
  const clampedIndex = Math.min(stepIndex, Math.max(steps.length - 1, 0));
  const current = steps[clampedIndex];
  const currentQuestions = current ? [current.base, ...current.followUps] : [];

  const hasValue = (q: Question) => {
    const val = formData[q.id];
    return Array.isArray(val) ? val.length > 0 : val !== undefined && val !== "" && val !== null;
  };

  const getError = (q: Question): string | undefined => {
    if (!touched[q.id]) return undefined;
    const val = formData[q.id];
    if (q.required && !hasValue(q)) return "This field is required";
    return q.validate?.(val);
  };

  const scrollToTop = () => {
    if (embedded && scrollSectionId) {
      document.getElementById(scrollSectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (showFinal) return;
    const step = steps[clampedIndex];
    if (!step) return;

    const all = [step.base, ...step.followUps].filter((q) => isNodeVisible(q, formData));
    const invalid = all.find((q) => {
      const val = formData[q.id];
      if (q.required && !hasValue(q)) return true;
      return !!q.validate?.(val);
    });

    if (invalid) {
      setTouched((prev) => ({ ...prev, [invalid.id]: true }));
      scrollToTop();
      return;
    }

    if (clampedIndex < steps.length - 1) {
      setStepIndex(clampedIndex + 1);
      scrollToTop();
    } else {
      setShowFinal(true);
      scrollToTop();
    }
  };

  const handleBack = () => {
    if (showFinal) {
      setShowFinal(false);
    } else if (clampedIndex > 0) {
      setStepIndex(clampedIndex - 1);
      scrollToTop();
    }
  };

  // Clean up pending save-flash timer on unmount
  useEffect(() => {
    return () => {
      if (saveFlashTimer.current) clearTimeout(saveFlashTimer.current);
    };
  }, []);

  // Funnel: questionnaire started (once per session as embedded survives re-mounts)
  const mountedRef = useRef(false);
  const abandonSentRef = useRef(false);
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    trackEvent("form_started");

    const sendAbandon = () => {
      if (submittedRef.current || abandonSentRef.current) return;
      abandonSentRef.current = true;
      trackEvent("form_abandoned", { progressPct: progressRef.current });
    };
    window.addEventListener("pagehide", sendAbandon);

    return () => {
      window.removeEventListener("pagehide", sendAbandon);
      sendAbandon();
    };
  }, []);

  // Funnel: reaching each section + progress for abandon analysis
  useEffect(() => {
    progressRef.current = Math.round((clampedIndex / Math.max(steps.length, 1)) * 100);
    if (showFinal) {
      trackEvent("form_review");
      return;
    }
    const step = steps[clampedIndex];
    if (step) {
      trackEvent("form_section", { section: step.section.id, index: clampedIndex, total: steps.length });
    }
  }, [clampedIndex, showFinal, steps]);

  const validateAllVisible = () => {
    const invalid: Record<string, string> = {};
    steps.forEach(({ base, followUps }) => {
      [base, ...followUps]
        .filter((q) => isNodeVisible(q, formData))
        .forEach((q) => {
          const val = formData[q.id];
          if (q.required && !hasValue(q)) {
            invalid[q.id] = "This field is required";
          } else if (q.validate) {
            const msg = q.validate(val);
            if (msg) invalid[q.id] = msg;
          }
        });
    });
    return invalid;
  };

  const handleSubmit = async () => {
    const invalid = validateAllVisible();
    if (disclaimerQuestion.required && !hasValue(disclaimerQuestion)) {
      invalid[disclaimerQuestion.id] = "Please accept the disclaimer to continue";
    }
    if (Object.keys(invalid).length > 0) {
      setTouched((prev) => {
        const next = { ...prev };
        for (const id of Object.keys(invalid)) next[id] = true;
        return next;
      });
      setShowFinal(false);
      scrollToTop();
      return;
    }

    setIsSubmitting(true);
    const success = await submitForm(formData);
    if (success) {
      submittedRef.current = true;
      trackEvent("form_submitted");
      clearSaved();
      router.push("/thank-you");
    } else {
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const totalQuestions = steps.length;

  return (
    <div className={`bg-paper px-4 ${embedded ? "py-8" : "min-h-screen py-8"}`}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink mb-2">
            Pre-Assessment Questionnaire
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-ink-faint">Estimated time: 7–8 minutes</span>
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium transition-opacity duration-300 ${
                savedFlash ? "text-pine-700 opacity-100" : "text-ink-faint opacity-70"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {savedFlash ? "Saved" : "Auto-saved"}
            </span>
          </div>
        </div>

        <ProgressBar
          sections={visibleSections}
          currentSection={
            showFinal
              ? visibleSections.length - 1
              : steps[clampedIndex]
                ? visibleSections.findIndex((s) => s.id === steps[clampedIndex].section.id)
                : 0
          }
          currentQuestion={clampedIndex}
          totalQuestions={totalQuestions}
          complete={showFinal}
        />

        <div className="bg-surface rounded-2xl border border-hairline shadow-soft p-6 md:p-8">
          {showFinal ? (
            <>
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-600">
                  Final Step
                </span>
                <p className="mt-1 text-sm text-ink-faint">Almost done — review and submit.</p>
              </div>
              <QuestionRenderer
                question={disclaimerQuestion}
                formData={formData}
                onChange={handleChange}
                onBlur={handleBlur}
                error={getError(disclaimerQuestion)}
              />
              <QuestionRenderer
                question={finalQuestion}
                formData={formData}
                onChange={handleChange}
                onBlur={handleBlur}
                error={getError(finalQuestion)}
              />
            </>
          ) : (
            current && (
              <div
                onKeyDown={(e) => {
                  if (e.key === "Enter" && currentQuestions.every((q) => q.type !== "textarea")) {
                    e.preventDefault();
                    handleNext();
                  }
                }}
              >
                <QuestionRenderer
                  key={current.base.id}
                  question={current.base}
                  formData={formData}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError(current.base)}
                  sectionTitle={current.section.title}
                  sectionSubtitle={current.section.subtitle}
                  standalone
                />
                {current.followUps
                  .filter((q) => isNodeVisible(q, formData))
                  .map((q) => (
                    <div key={q.id} className="mt-6">
                      <QuestionRenderer
                        question={q}
                        formData={formData}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={getError(q)}
                      />
                    </div>
                  ))}
              </div>
            )
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-hairline">
            {onBack && (
              <button
                onClick={onBack}
                className="px-6 py-2.5 text-sm font-medium text-pine-700 bg-white rounded-lg border border-pine-100 hover:bg-pine-050 transition-colors"
              >
                Back to intro
              </button>
            )}

            <div className="flex items-center gap-3 ml-auto">
              {(clampedIndex > 0 || showFinal) && (
                <button
                  onClick={handleBack}
                  className="px-6 py-2.5 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
                >
                  Back
                </button>
              )}
              {showFinal ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-2.5 text-sm font-medium text-white bg-pine-900 rounded-lg hover:bg-pine-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-2.5 text-sm font-medium text-white bg-pine-900 rounded-lg hover:bg-pine-700 transition-colors"
                >
                  {clampedIndex === steps.length - 1 ? "Continue" : "Next"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}