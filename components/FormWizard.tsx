"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FormData } from "@/lib/types";
import { formSections, finalQuestion } from "@/lib/formSchema";
import { submitForm } from "@/lib/submitForm";
import { useAutoSave } from "@/hooks/useAutoSave";
import ProgressBar from "./ui/ProgressBar";
import QuestionRenderer from "./QuestionRenderer";

interface QuestionLike {
  id: string;
  label: string;
  required?: boolean;
  dependsOn?: {
    questionId: string;
    value: string | string[];
  };
}

export default function FormWizard() {
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
    (q: QuestionLike) => {
      if (!q.dependsOn) return true;
      const { questionId, value } = q.dependsOn;
      const answer = formData[questionId];
      if (Array.isArray(answer)) {
        if (Array.isArray(value)) return value.some((v) => answer.includes(v));
        return answer.includes(value);
      }
      if (Array.isArray(value)) return value.includes(answer as string);
      return answer === value;
    },
    [formData]
  );

  const hasValue = (q: QuestionLike) => {
    const val = formData[q.id];
    return Array.isArray(val) ? val.length > 0 : val !== undefined && val !== "" && val !== null;
  };

  // Returns error message for a field (only when touched & invalid), or undefined
  const getError = (q: QuestionLike): string | undefined => {
    if (!q.required || !isVisible(q)) return undefined;
    if (!touched[q.id]) return undefined;
    return hasValue(q) ? undefined : "This field is required";
  };

  const validateAllVisible = () => {
    const invalid: Record<string, string> = {};
    const sections = [...formSections];
    sections.forEach((section) => {
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
      formSections[sectionIndex].questions.forEach((q) => {
        if (isVisible(q)) next[q.id] = true;
      });
      return next;
    });
  };

  const handleNext = () => {
    markSectionTouched(currentSection);
    // Recompute validation for current section
    const section = formSections[currentSection];
    const hasInvalid = section.questions.some(
      (q) => q.required && isVisible(q) && !hasValue(q)
    );

    if (hasInvalid) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentSection < formSections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowFinal(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (showFinal) {
      setShowFinal(false);
    } else if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    const invalid = validateAllVisible();
    if (Object.keys(invalid).length > 0) {
      setTouched((prev) => {
        const next = { ...prev };
        for (const id of Object.keys(invalid)) next[id] = true;
        return next;
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  const section = formSections[currentSection];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pre-Assessment Questionnaire</h1>
          <p className="text-sm text-gray-500">Estimated time: 7–8 minutes</p>
        </div>

        <ProgressBar sections={formSections} currentSection={showFinal ? formSections.length - 1 : currentSection} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {showFinal ? (
            <>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Final Question</h2>
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
            {(currentSection > 0 || showFinal) && (
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
                  {currentSection === formSections.length - 1 ? "Continue" : "Next"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
