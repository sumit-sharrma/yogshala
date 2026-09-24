const pillars = [
  {
    title: "Assessment first",
    description: "Every journey begins with understanding your baseline — your posture, range of motion, and daily movement habits.",
  },
  {
    title: "Yoga at the core",
    description: "We draw on yoga's principles of breath, alignment, and mindfulness to guide movement correction.",
  },
  {
    title: "One-to-one care",
    description: "Private sessions focus entirely on you — no crowds, no one-size-fits-all routines.",
  },
];

const icons = {
  assessment: (
    <svg className="w-6 h-6 text-pine-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  yoga: (
    <svg className="w-6 h-6 text-pine-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 10-6.364-2.636M12 7v4m0 0a2 2 0 100 4m0-4h4m-4 0V7" />
    </svg>
  ),
  care: (
    <svg className="w-6 h-6 text-pine-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm.5 1.63a6 6 0 013.5 1.63M10 13.87V15s-5-1-5 5v0" />
    </svg>
  ),
};

export default function About() {
  return (
    <section id="about" className="bg-surface border-y border-hairline">
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
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="bg-paper rounded-xl border border-hairline p-8"
            >
              <div className="w-12 h-12 bg-pine-050 rounded-full flex items-center justify-center mb-5">
                {icons[index === 0 ? "assessment" : index === 1 ? "yoga" : "care"]}
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">{pillar.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}