"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FormData, Question } from "@/lib/types";
import { formSections, disclaimerQuestion, finalQuestion } from "@/lib/formSchema";
import { isNodeVisible } from "@/lib/visibility";
import { submitForm } from "@/lib/submitForm";
import { useAutoSave } from "@/hooks/useAutoSave";
import ProgressBar from "./ui/ProgressBar";
import QuestionRenderer from "./QuestionRenderer";

interface FormWizardProps {
  embedded?: boolean;
  scrollSectionId?: string;
}

export default function FormWizard({ embedded = false, scrollSectionId }: FormWizardProps) {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { clearSaved } = useAutoSave(formData, setFormData);

  const handleChange = useCallback((id: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleBlur = useCallback((id: string) => {
    setTouched((prev) => ({ ...prev, [id]: true }));
  }, []);

  const isVisible = useCallback(
    (q: Question) => isNodeVisible(q, formData),
    [formData]
  );

  const visibleSections = formSections.filter((s) => isNodeVisible(s, formData));
  const sectionIndex = Math.min(currentSection, visibleSections.length - 1);

  const hasValue = (q: Question) => {
    const val = formData[q.id];
    return Array.isArray(val) ? val.length > 0 : val !== undefined && val !== "" && val !== null;
  };

  // Returns error message for a field (only when touched & invalid), or undefined
  const getError = (q: Question): string | undefined => {
    if (!q.required || !isVisible(q)) return undefined;
    if (!touched[q.id]) return undefined;
    return hasValue(q) ? undefined : "This field is required";
  };

  const validateAllVisible = () => {
    const invalid: Record<string, string> = {};
    visibleSections.forEach((section) => {
      section.questions.forEach((q) => {
        if (q.required && isVisible(q) && !hasValue(q)) {
          invalid[q.id] = "This field is required";
        }
      });
    });
    return invalid;
  };

  const markSectionTouched = (sectionIndex: number) => {
    setTouched((prev) => {
      const next = { ...prev };
      visibleSections[sectionIndex].questions.forEach((q) => {
        if (isVisible(q)) next[q.id] = true;
      });
      return next;
    });
  };

  const handleNext = () => {
    markSectionTouched(sectionIndex);
    // Recompute validation for current section
    const section = visibleSections[sectionIndex];
    const hasInvalid = section.questions.some(
      (q) => q.required && isVisible(q) && !hasValue(q)
    );

    if (hasInvalid) {
      scrollToTop();
      return;
    }

    if (sectionIndex < visibleSections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      scrollToTop();
    } else {
      setShowFinal(true);
      scrollToTop();
    }
  };

  const handleBack = () => {
    if (showFinal) {
      setShowFinal(false);
    } else if (sectionIndex > 0) {
      setCurrentSection((prev) => prev - 1);
      scrollToTop();
    }
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
      scrollToTop();
      return;
    }

    setIsSubmitting(true);
    const success = await submitForm(formData);
    if (success) {
      clearSaved();
      router.push("/thank-you");
    } else {
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    if (embedded && scrollSectionId) {
      document.getElementById(scrollSectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const section = visibleSections[sectionIndex];

  return (
    <div className={`bg-gray-50 px-4 ${embedded ? "py-4" : "min-h-screen py-8"}`}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pre-Assessment Questionnaire</h1>
          <p className="text-sm text-gray-500">Estimated time: 7–8 minutes</p>
        </div>

        <ProgressBar sections={visibleSections} currentSection={showFinal ? visibleSections.length - 1 : sectionIndex} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {showFinal ? (
            <>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Final Question</h2>
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
            <>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">{section.title}</h2>
              {section.questions.map((question) => (
                <QuestionRenderer
                  key={question.id}
                  question={question}
                  formData={formData}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError(question)}
                />
              ))}
            </>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {(sectionIndex > 0 || showFinal) && (
              <button
                onClick={handleBack}
                className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Back
              </button>
            )}

            <div className="ml-auto">
              {showFinal ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  {currentSection === visibleSections.length - 1 ? "Continue" : "Next"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
