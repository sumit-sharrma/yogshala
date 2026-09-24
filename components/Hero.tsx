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
        className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-70"
      />
      <div
        aria-hidden
        className="absolute top-1/2 -left-32 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-60"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-sm text-emerald-700 font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Personalized posture & movement care
        </span>

        <h1 className="mt-6 text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">
          Move better.
          <br />
          <span className="text-emerald-600">Feel better.</span> Live better.
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed">
          Yog Shala combines modern posture science with the practice of yoga to help you
          understand your body, correct movement patterns, and build lasting alignment.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#assessment"
            className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Start Your Pre-Assessment
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-3 text-emerald-700 font-medium rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
          >
            How It Works
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {trustPoints.map((point) => (
            <div
              key={point.label}
              className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3"
            >
              <p className="text-sm font-semibold text-gray-900">{point.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{point.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}