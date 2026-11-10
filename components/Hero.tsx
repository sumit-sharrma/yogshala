import Image from "next/image";

const trustPoints = [
  {
    label: "7–8 min pre-assessment",
    sub: "Quick, thoughtful questionnaire with auto-saved progress",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "In-person session",
    sub: "Hands-on evaluation of posture and movement patterns",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: "Personalized plan",
    sub: "A practice tailored to your body, posture, and goals",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6M9 8h2M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const HERO_IMAGE = "/images/hero.jpeg";

export default function Hero() {
  return (
    <>
      {/* Full-bleed imagery hero — copy only, nothing overlaps */}
      <section id="top" className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={HERO_IMAGE}
            alt="Yoga studio hero section"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-[3px]" />
        </div>

        <div className="relative max-w-[1120px] mx-auto px-4 sm:px-6 pt-24 pb-16 sm:pb-20 w-full">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white font-medium">
            <svg className="w-4 h-4 text-clay-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Personalized posture & movement care
          </span>

          <h1 className="mt-6 font-display text-fluid-hero font-semibold tracking-tight leading-[1.05] text-white">
            Understand Your Body.
            <br />
            <span className="text-clay-400">Move With Purpose.</span> Live With Ease.
          </h1>

          <p className="mt-6 max-w-2xl text-fluid-body text-white/80 leading-relaxed">
            Sthiram Yoga Shala combines functional movements with traditional yoga to help you
            understand your body, correct movement patterns, and build lasting alignment.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#assessment"
              className="px-8 py-3 bg-clay-500 text-white font-medium rounded-lg hover:bg-clay-600 transition-colors"
            >
              Start Your Pre-Assessment
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-3 text-white font-medium rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Separate trust strip — its own band, clearly divided from the hero */}
      <section className="border-t border-hairline bg-surface">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 divide-hairline sm:divide-x sm:divide-x-hairline">
            {trustPoints.map((point) => (
              <div key={point.label} className="flex items-start gap-4 px-2 py-4 sm:py-0 sm:px-8 first:pl-0 last:pr-0 sm:first:pl-0 sm:last:pr-0">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-pine-050 text-pine-700 flex items-center justify-center">
                  {point.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{point.label}</p>
                  <p className="text-sm text-ink-soft mt-1 leading-relaxed">{point.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}