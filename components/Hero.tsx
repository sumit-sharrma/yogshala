const trustPoints = [
  { label: "7–8 min pre-assessment", sub: "auto-saved progress" },
  { label: "In-person session", sub: "posture & movement" },
  { label: "Personalized plan", sub: "tailored to your goals" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-96 h-96 bg-pine-100 rounded-full blur-3xl opacity-70"
      />
      <div
        aria-hidden
        className="absolute top-1/2 -left-32 w-80 h-80 bg-clay-100 rounded-full blur-3xl opacity-60"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-hairline rounded-full text-sm text-ink-soft font-medium">
          <svg className="w-4 h-4 text-clay-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Personalized posture & movement care
        </span>

        <h1 className="mt-6 font-display text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] text-ink">
          Move better.
          <br />
          <span className="text-clay-600">Feel better.</span> Live better.
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-ink-soft leading-relaxed">
          Yog Shala combines modern posture science with the practice of yoga to help you
          understand your body, correct movement patterns, and build lasting alignment.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#assessment"
            className="w-full sm:w-auto px-8 py-3 bg-pine-900 text-white font-medium rounded-lg hover:bg-pine-700 transition-colors"
          >
            Start Your Pre-Assessment
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-3 text-pine-900 font-medium rounded-lg border border-hairline hover:bg-surface transition-colors"
          >
            How It Works
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {trustPoints.map((point) => (
            <div
              key={point.label}
              className="bg-surface rounded-xl border border-hairline shadow-soft px-5 py-3"
            >
              <p className="text-sm font-semibold text-ink">{point.label}</p>
              <p className="text-xs text-ink-soft mt-0.5">{point.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}