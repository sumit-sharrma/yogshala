const links = [
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#assessment", label: "Assessment" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2">
          <span className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3c.5 3.5-1.5 5.5-3 7 4-1 6-1.5 7.5-4M12 3c-.5 3.5 1.5 5.5 3 7-4-1-6-1.5-7.5-4M12 21s2-3.5 2-6c0-2-2-2-2-4 0-2 2-2 2-4 0-2.5-2-4-2-4s-2 1.5-2 4c0 2 2 2 2 4 0 2-2 2-2 4 0 2.5 2 6 2 6z" />
            </svg>
          </span>
          <span className="text-lg font-bold text-gray-900">Yog Shala</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#assessment"
          className="px-4 sm:px-5 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Book Assessment
        </a>
      </nav>
    </header>
  );
}