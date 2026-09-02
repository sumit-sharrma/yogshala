"use client";

import { useState } from "react";
import FormWizard from "@/components/FormWizard";

export default function Home() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <FormWizard />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">Pre-Assessment Questionnaire</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Thank you for choosing Yog Shala. Please complete this questionnaire before your assessment so we can better understand your posture, movement, and goals.
          </p>

          <div className="bg-emerald-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-emerald-700">
              <span className="font-medium">Estimated time:</span> 7–8 minutes
            </p>
            <p className="text-sm text-emerald-700 mt-1">
              Your responses are saved automatically — you can return later if needed.
            </p>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="w-full py-3 px-6 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Start Questionnaire
          </button>
        </div>
      </div>
    </div>
  );
}
