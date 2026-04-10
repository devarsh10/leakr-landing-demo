import { useEffect, useState } from "react";
import { Link } from "../router";
const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(232,228,220,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(26,26,26,0.08)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-18 flex items-center justify-between" style={{ height: "72px" }}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/leakr.jpeg"
            alt="Leakr"
            height={44}
            width={44}
            className="object-contain rounded-md"
          />
          <span className="text-foreground text-lg font-semibold tracking-tight">
            leakr
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          to="/#early-access"
          className="bg-foreground text-background text-sm px-4 py-2 md:text-base md:px-6 md:py-3 rounded-full font-medium hover:opacity-85 transition-opacity whitespace-nowrap"
        >
          <span className="md:hidden">Join waitlist</span>
          <span className="hidden md:inline">Get early access</span>
        </Link>
      </div>
    </header>
  );
}
