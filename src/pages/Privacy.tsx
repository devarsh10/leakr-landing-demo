import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "What Leakr collects",
    body: [
      "Active window title — the name of the app or browser tab you are currently in.",
      "Session duration — how long each session ran, including paused time.",
      "Task name and notes — what you type into the session log at the end of a session.",
      "Timestamps — when sessions started and ended.",
    ],
  },
  {
    title: "What Leakr never collects",
    body: [
      "Keystrokes — we never read what you type, anywhere.",
      "Screen content — we cannot see what is on your screen.",
      "File or document contents — we have no access to your files.",
      "Microphone, camera, or location — none of these are requested or used.",
    ],
  },
  {
    title: "Where your data is stored",
    body: [
      "Your session data is stored securely in our database (Supabase). It is tied to your account and is never shared with third parties, advertisers, or employers.",
    ],
  },
  {
    title: "Who can see your data",
    body: [
      "Only you. Leakr is a personal productivity tool. Sessions are private by default. Sharing a session log is always a deliberate action you initiate — we never expose your data automatically.",
    ],
  },
  {
    title: "Deleting your data",
    body: [
      "You can delete individual sessions, clear your full history, or permanently close your account at any time from settings. Deletion is immediate and irreversible.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "If we make significant changes to how we handle your data, we will notify you via email before the changes take effect.",
    ],
  },
];

export default function Privacy() {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground font-light">
            Last updated: April 2026
          </p>
        </div>

        {/* Intro */}
        <p className="text-base font-light text-muted-foreground leading-relaxed mb-12 border-l-2 pl-4"
          style={{ borderColor: "rgba(232,168,56,0.5)" }}>
          Leakr is built on a simple principle: your data belongs to you. We collect the minimum needed to make the product work — and nothing else.
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
            Questions about your data?{" "}
            <a href="mailto:hello@leakr.app" className="text-foreground underline underline-offset-2 hover:text-muted-foreground transition-colors">
              hello@leakr.app
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
