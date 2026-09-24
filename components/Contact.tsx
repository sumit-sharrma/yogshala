const contactDetails = [
  {
    label: "Location",
    value: "123 Yoga Lane, Your City, ST 00000",
    icon: (
      <svg className="w-5 h-5 text-pine-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "hello@yogshala.com",
    icon: (
      <svg className="w-5 h-5 text-pine-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+1 (555) 010-2030",
    icon: (
      <svg className="w-5 h-5 text-pine-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.545 4.637a1 1 0 01-.27 1.12l-1.6 1.28a12.05 12.05 0 005.474 5.474l1.28-1.6a1 1 0 011.12-.27l4.637 1.545a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-surface border-t border-hairline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-600">
              Contact
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
              Ready to start your journey?
            </h2>
            <p className="mt-4 text-lg text-ink-soft leading-relaxed">
              Begin with the pre-assessment questionnaire — the easiest first step. For
              questions about sessions, rates, or availability, reach out anytime.
            </p>

            <ul className="mt-8 space-y-4">
              {contactDetails.map((item) => (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="w-11 h-11 bg-pine-050 rounded-full flex items-center justify-center shrink-0">
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">{item.label}</span>
                    <span className="block text-sm text-ink-soft">{item.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-paper rounded-2xl border border-hairline shadow-soft p-8 md:p-12">
            <h3 className="font-display text-xl font-semibold text-ink">Book your assessment</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              Complete the questionnaire and we will prepare a session focused entirely on you.
              Wear comfortable clothing so we can evaluate your movement accurately.
            </p>
            <a
              href="#assessment"
              className="mt-6 inline-flex w-full justify-center px-6 py-3 bg-pine-900 text-white font-medium rounded-lg hover:bg-pine-700 transition-colors"
            >
              Start Pre-Assessment
            </a>
            <p className="mt-4 text-xs text-ink-faint text-center">
              Prefer to talk first? Call or email us — we are happy to help.
            </p>
          </div>
        </div>
      </div>

      <footer className="border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-faint">© {new Date().getFullYear()} Yog Shala. All rights reserved.</p>
          <p className="text-sm text-ink-faint">Move better. Feel better. Live better.</p>
        </div>
      </footer>
    </section>
  );
}