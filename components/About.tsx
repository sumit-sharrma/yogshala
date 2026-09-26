"use client";

import { useEffect, useRef, useState } from "react";
import { StepAssessIllustration } from "./ui/StepIllustrations";
import { PillarYogaIllustration, PillarCareIllustration } from "./ui/PillarIllustrations";

const pillars = [
  {
    title: "Assessment first",
    description: "Every journey begins with understanding your baseline — your posture, range of motion, and daily movement habits.",
    Illustration: StepAssessIllustration,
  },
  {
    title: "Yoga at the core",
    description: "We draw on yoga's principles of breath, alignment, and mindfulness to guide movement correction.",
    Illustration: PillarYogaIllustration,
  },
  {
    title: "One-to-one care",
    description: "Private sessions focus entirely on you — no crowds, no one-size-fits-all routines.",
    Illustration: PillarCareIllustration,
  },
];

export default function About() {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className={inView ? "in-view bg-surface border-y border-hairline" : "bg-surface border-y border-hairline"}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-600">
            About Yog Shala
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
            A mindful approach to how you move
          </h2>
          <p className="mt-4 text-lg text-ink-soft leading-relaxed">
            Yog Shala was founded on a simple belief: lasting change starts with awareness.
            Our structured pre-assessment and guided sessions help you understand your body&apos;s
            habits, uncover what limits you, and build the strength and freedom to move with ease.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-paper rounded-xl border border-hairline p-8"
            >
              <div className="w-24 h-24 mx-auto mb-5 step-icon">
                <pillar.Illustration />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2 text-center">{pillar.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed text-center">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}