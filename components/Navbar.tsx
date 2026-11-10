import Image from "next/image";

const links = [
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#assessment", label: "Assessment" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b border-hairline">
      <nav className="max-w-[1120px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.jpeg"
            alt="Yog Shala logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">Yog Shala</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#assessment"
          className="px-4 sm:px-5 py-2 text-sm font-medium text-white bg-pine-900 rounded-lg hover:bg-pine-700 transition-colors"
        >
          Book Assessment
        </a>
      </nav>
    </header>
  );
}