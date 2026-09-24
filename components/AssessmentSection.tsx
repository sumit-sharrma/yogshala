"use client";

import { useState } from "react";
import FormWizard from "@/components/FormWizard";

export default function AssessmentSection() {
  const [started, setStarted] = useState(false);

  return (
    <section id="assessment" className="bg-surface border-y border-hairline">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        {!started ? (
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-600">
              Begin Here
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
              Pre-Assessment Questionnaire
            </h2>

            <div className="max-w-lg w-full mx-auto mt-12 text-left">
              <div className="bg-paper rounded-2xl border border-hairline shadow-soft p-8 md:p-12">
                <div className="w-16 h-16 bg-pine-050 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-pine-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <h3 className="font-display text-xl font-semibold text-ink text-center mb-3">
                  Thank you for choosing Yog Shala
                </h3>
                <p className="text-ink-soft text-center mb-6 leading-relaxed">
                  Please complete this questionnaire before your assessment so we can better
                  understand your posture, movement, and goals.
                </p>

                <div className="bg-pine-050 rounded-lg p-4 mb-8">
                  <p className="text-sm text-pine-700">
                    <span className="font-medium">Estimated time:</span> 7–8 minutes
                  </p>
                  <p className="text-sm text-pine-700 mt-1">
                    Your responses are saved automatically — you can return later if needed.
                  </p>
                </div>

                <button
                  onClick={() => setStarted(true)}
                  className="w-full py-3 px-6 bg-pine-900 text-white font-medium rounded-lg hover:bg-pine-700 transition-colors"
                >
                  Start Questionnaire
                </button>
              </div>
            </div>
          </div>
        ) : (
          <FormWizard embedded scrollSectionId="assessment" />
        )}
      </div>
    </section>
  );
}