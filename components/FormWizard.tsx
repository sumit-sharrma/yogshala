"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FormData } from "@/lib/types";
import { formSections, finalQuestion } from "@/lib/formSchema";
import { submitForm } from "@/lib/submitForm";
import { useAutoSave } from "@/hooks/useAutoSave";
import ProgressBar from "./ui/ProgressBar";
import QuestionRenderer from "./QuestionRenderer";

export default function FormWizard() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const { clearSaved } = useAutoSave(formData, setFormData);

  const handleChange = useCallback((id: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleNext = () => {
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

        <ProgressBar sections={formSections} currentSection={showFinal ? formSections.length : currentSection} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {showFinal ? (
            <>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Final Question</h2>
              <QuestionRenderer
                question={finalQuestion}
                formData={formData}
                onChange={handleChange}
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
