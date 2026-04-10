import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "What Leakr is",
    body: [
      "Leakr is a personal time tracking tool. It helps you measure focused work time, log session notes, and understand where your hours go. It is not a surveillance tool and is not intended for use by employers to monitor employees.",
    ],
  },
  {
    title: "Your account",
    body: [
      "You are responsible for maintaining the security of your account credentials.",
      "You may not share your account with others or use Leakr to track time on behalf of another person without their knowledge.",
      "You can close your account at any time. All your data will be permanently deleted.",
    ],
  },
  {
    title: "Free and Pro tiers",
    body: [
      "The Free tier is free forever for individual personal use.",
      "The Pro tier unlocks automatic distraction detection and additional features. Pricing is shown at the time of upgrade.",
      "We reserve the right to change Pro pricing with at least 30 days notice to existing subscribers.",
    ],
  },
  {
    title: "Acceptable use",
    body: [
      "Use Leakr for lawful purposes only.",
      "Do not attempt to reverse engineer, scrape, or interfere with the service.",
      "Do not use Leakr to track or monitor another person without their explicit consent.",
    ],
  },
  {
    title: "Availability",
    body: [
      "We aim for high availability but do not guarantee uninterrupted service. We are not liable for any loss resulting from downtime or data unavailability.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "We may update these terms from time to time. If we make significant changes, we will notify you via email before they take effect. Continued use of Leakr after that date constitutes acceptance of the updated terms.",
    ],
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 md:px-12 pt-36 pb-24">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-4">
            LEGAL
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.06] mb-6">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground font-light">
            Last updated: April 2026
          </p>
        </div>

        {/* Intro */}
        <p className="text-base font-light text-muted-foreground leading-relaxed mb-12 border-l-2 pl-4"
          style={{ borderColor: "rgba(232,168,56,0.5)" }}>
          By using Leakr, you agree to these terms. They are written to be readable — not to trap you. If something is unclear, email us.
        </p>

        {/* Sections */}
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-semibold text-foreground tracking-tight mb-4">
                {s.title}
              </h2>
              <ul className="space-y-3">
                {s.body.map((line, i) => (
                  <li key={i} className="flex gap-3 text-sm font-light text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(232,168,56,0.6)" }} />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm font-light text-muted-foreground">
            Questions about these terms?{" "}
            <a href="mailto:getleakr@gmail.com" className="text-foreground underline underline-offset-2 hover:text-muted-foreground transition-colors">
              getleakr@gmail.com
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
