"use client";

import { useState } from "react";
import Image from "next/image";
import FormWizard from "@/components/FormWizard";

const INTRO_IMAGE =
  "https://images.unsplash.com/photo-1695795749106-0292b17936aa?auto=format&fit=crop&w=1200&q=80";

export default function AssessmentSection() {
  const [started, setStarted] = useState(false);

  return (
    <section id="assessment" className="bg-surface border-y border-hairline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        {!started ? (
          <div key="intro" className="fade-up">
            <div className="bg-paper rounded-2xl border border-hairline shadow-soft overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch lg:min-h-[640px]">
              {/* Image side (left) */}
              <div className="relative min-h-[280px] lg:min-h-full">
                <Image
                  src={INTRO_IMAGE}
                  alt="Yoga practice at a studio"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="text-sm text-white/90 leading-relaxed">
                    Understanding your posture and movement before we meet means your
                    session starts where it matters most.
                  </p>
                </div>
              </div>

              {/* Content side (right) */}
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-600">
                  Begin Here
                </span>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
                  Pre-Assessment Questionnaire
                </h2>

                <div className="mt-10">
                  <h3 className="font-display text-xl font-semibold text-ink mb-3">
                    Thank you for choosing Yog Shala
                  </h3>
                  <p className="text-ink-soft mb-8 leading-relaxed">
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
            </div>
          </div>
        ) : (
          <div key="questionnaire" className="fade-up">
            <FormWizard
              embedded
              scrollSectionId="assessment"
              onBack={() => setStarted(false)}
            />
          </div>
        )}
      </div>
    </section>
  );
}