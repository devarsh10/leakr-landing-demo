import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TOPICS = [
  { label: "General question", email: "getleakr@gmail.com" },
  { label: "Privacy or data request", email: "getleakr@gmail.com" },
  { label: "Bug report", email: "getleakr@gmail.com" },
  { label: "Early access / waitlist", email: "getleakr@gmail.com" },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 md:px-12 pt-36 pb-24">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-4">
            CONTACT
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.06] mb-6">
            Get in touch.
          </h1>
          <p className="text-base font-light text-muted-foreground leading-relaxed max-w-md">
            We're a small team. You'll hear back from a real person — usually within one business day.
          </p>
        </div>

        {/* Primary email */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-10"
          style={{ background: "rgba(26,26,26,0.03)", border: "1px solid rgba(26,26,26,0.08)" }}
        >
          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-3">EMAIL US AT</p>
          <a
            href="mailto:getleakr@gmail.com"
            className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight hover:text-muted-foreground transition-colors"
          >
            getleakr@gmail.com
          </a>
        </div>

        {/* Topic list */}
        <div>
          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-5">WHAT TO WRITE ABOUT</p>
          <div className="space-y-3">
            {TOPICS.map((t) => (
              <a
                key={t.label}
                href={`mailto:${t.email}?subject=${encodeURIComponent(t.label)}`}
                className="flex items-center justify-between group rounded-2xl px-6 py-4 transition-colors"
                style={{ background: "rgba(26,26,26,0.03)", border: "1px solid rgba(26,26,26,0.08)" }}
              >
                <span className="text-sm font-medium text-foreground">{t.label}</span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm font-light text-muted-foreground">
            For privacy-related requests (data export or deletion), please include your account email in the message so we can process it quickly.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
