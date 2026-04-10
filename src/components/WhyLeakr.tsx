import { motion } from "framer-motion";

const ICONS = {
  "01": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  "02": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  "03": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  "04": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="14"/>
    </svg>
  ),
} as Record<string, JSX.Element>;

const REASONS = [
  {
    number: "01",
    title: "Full work history. No gaps.",
    problem: "Client asks what you worked on this week.",
    answer:
      "You open Leakr and show a timestamped log — every session, every task, every duration. No guessing, no reconstructing from memory.",
  },
  {
    number: "02",
    title: "Spot your exam blind spots.",
    problem: "You studied for 4 hours. Or did you?",
    answer:
      "Leakr tells you 38 minutes went to YouTube and 22 to Instagram. Your actual focused prep was 2h 58m. Now you know what to fix before the exam.",
  },
  {
    number: "03",
    title: "See the invisible overtime.",
    problem: "You feel like you worked all day.",
    answer:
      "Leakr shows you logged 4.5 focused hours. The rest was drift — tabs, feeds, distractions. That gap is why you feel busy but behind.",
  },
  {
    number: "04",
    title: "Know where your time actually goes.",
    problem: "You have three clients and five subjects.",
    answer:
      "The dashboard breaks your time by project, client, or subject — week, month, year. Rebalance before one area quietly eats the rest.",
  },
];

export default function WhyLeakr() {
  return (
    <section id="why-leakr" className="w-full bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-4">
            WHY LEAKR
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.08]">
            Four reasons people
            <br />
            start tracking.
          </h2>
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 md:p-10 space-y-5 hover:-translate-y-1 transition-transform duration-300"
              style={{
                background: "rgba(26,26,26,0.03)",
                border: "1px solid rgba(26,26,26,0.08)",
              }}
            >
              {/* Icon + number row */}
              <div className="flex items-center justify-between">
                <span
                  className="block font-mono font-medium leading-none select-none"
                  style={{
                    fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                    color: "rgba(26,26,26,0.07)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {r.number}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(232,168,56,0.10)",
                    color: "#E8A838",
                    border: "1px solid rgba(232,168,56,0.20)",
                  }}
                >
                  {ICONS[r.number]}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {r.title}
              </h3>

              {/* Problem */}
              <p
                className="text-sm font-medium"
                style={{ color: "rgba(26,26,26,0.45)" }}
              >
                {r.problem}
              </p>

              {/* Answer */}
              <p className="text-sm font-light leading-relaxed text-muted-foreground border-t border-border pt-5">
                {r.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
