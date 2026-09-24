const testimonials = [
  {
    quote:
      "The assessment completely changed how I think about my posture. I finally understand why my back was hurting and what to do about it.",
    name: "Priya S.",
    role: "Software Engineer",
  },
  {
    quote:
      "I came in skeptical and left feeling heard. The plan was simple, personal, and actually fits into my week. My shoulders are nothing like they used to be.",
    name: "Arjun M.",
    role: "Graduate Student",
  },
  {
    quote:
      "A calm, structured space. The pre-assessment made my session incredibly productive — we spent the whole hour working on me instead of explaining things from scratch.",
    name: "Neha K.",
    role: "School Teacher",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-600">
            Testimonials
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
            What our clients say
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col bg-surface rounded-xl border border-hairline shadow-soft p-8"
            >
              <div className="flex gap-0.5 text-clay-500 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg key={index} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.363 1.118l1.286 3.958c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.175 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.285-3.958a1 1 0 00-.362-1.118L2.363 9.385c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-ink-soft leading-relaxed mb-6 flex-1">
                “{item.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="w-10 h-10 bg-pine-050 rounded-full flex items-center justify-center text-pine-700 font-semibold">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{item.name}</span>
                  <span className="block text-xs text-ink-faint">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}