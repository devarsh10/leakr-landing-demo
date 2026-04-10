import { Link } from "../router";

const PRODUCT_LINKS = [
  { label: "Features",     href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Why Leakr",    href: "/#why-leakr" },
  { label: "Try Demo",     href: "/demo" },
];

const LEGAL_LINKS = [
  { label: "Privacy",  href: "/privacy" },
  { label: "Terms",    href: "/terms" },
  { label: "Contact",  href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border">

      {/* ── Main footer body ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-20">

          {/* Brand + tagline */}
          <div className="space-y-4 max-w-xs">
            <p className="text-base font-semibold text-foreground tracking-tight">leakr</p>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Time tracking for focused people. Know where your hours go — before they're gone.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              <a href="#" aria-label="X (Twitter)" className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <p className="text-xs font-mono tracking-widest text-muted-foreground mb-5">PRODUCT</p>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <p className="text-xs font-mono tracking-widest text-muted-foreground mb-5">LEGAL</p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Large brand mark ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-4">
        <p
          className="font-bold text-foreground leading-none select-none"
          style={{
            fontSize: "clamp(3rem, 16vw, 14rem)",
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            color: "#1A1A1A",
          }}
        >
          leakr
        </p>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <div
        className="max-w-7xl mx-auto px-6 md:px-12 py-5"
        style={{ borderTop: "1px solid rgba(26,26,26,0.08)" }}
      >
        <span className="text-xs text-muted-foreground">
          © Leakr {new Date().getFullYear()} · Built for people who value their time.
        </span>
      </div>

    </footer>
  );
}
