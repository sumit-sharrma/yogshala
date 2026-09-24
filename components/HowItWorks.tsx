const steps = [
  {
    title: "Complete the pre-assessment",
    description: "Answer a short questionnaire about your posture, pain, activity, and goals. It takes about 7–8 minutes and saves automatically.",
  },
  {
    title: "We review your responses",
    description: "Your answers help us prepare and focus the session on what matters most to you before you arrive.",
  },
  {
    title: "In-person assessment session",
    description: "We evaluate your posture, range of motion, and movement patterns together, in comfortable clothing.",
  },
  {
    title: "Get your personalized plan",
    description: "Walk away with clear guidance and a practice tailored to your body, with follow-up as you progress.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            From first click to first session
          </h2>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            A clear, guided path from understanding where you are to getting the care you need.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
            >
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mb-5">
                <span className="text-lg font-bold text-white">{index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}