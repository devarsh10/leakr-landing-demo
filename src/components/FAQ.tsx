import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const FAQS = [
  {
    q: "Is Leakr free?",
    a: "Yes. Leakr has a free plan, always — manual timer, session logging, and progress tracking at no cost. A Pro plan with auto-pause detection and advanced insights is coming. Pricing will be announced at launch.",
  },
  {
    q: "Where is my data stored?",
    a: "Your session data is stored securely in our database. It never leaves your account and is never shared with third parties, employers, or anyone else. You own your data — full stop.",
  },
  {
    q: "Can I delete my data?",
    a: "Yes, anytime. You can delete individual sessions, clear your full history, or permanently close your account from settings. Deletion is immediate and irreversible.",
  },
  {
    q: "Can my employer or client see my sessions?",
    a: "No. Leakr is a personal tool — your sessions are private by default. You choose what to share and with whom. Sharing a session log is always a deliberate action initiated by you.",
  },
  {
    q: "Does Leakr run in the background all the time?",
    a: "Only when you start a session. Leakr does not auto-start on login or run silently in the background. When you stop a session, it stops. You are always in control of when it's active.",
  },
  {
    q: "Does it track what I type or read?",
    a: "Never. Leakr reads only the active window title — the name of the app or browser tab you're in. It cannot see your keystrokes, message content, document text, or anything on your screen.",
  },
];

function FAQItem({
  q, a, index, open, onToggle,
}: {
  q: string; a: string; index: number; open: boolean; onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="text-base font-medium text-foreground tracking-tight group-hover:text-foreground/80 transition-colors">
          {q}
        </span>

        {/* Plus / minus icon */}
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{
            background: open ? "#E8A838" : "rgba(26,26,26,0.07)",
            border: open ? "none" : "1px solid rgba(26,26,26,0.10)",
          }}
        >
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <line x1="6" y1="1" x2="6" y2="11" stroke={open ? "#1A1A1A" : "rgba(26,26,26,0.5)"} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="6" x2="11" y2="6" stroke={open ? "#1A1A1A" : "rgba(26,26,26,0.5)"} strokeWidth="1.5" strokeLinecap="round" />
          </motion.svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="text-sm font-light leading-relaxed text-muted-foreground pb-6 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20">

          {/* Left — sticky header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="md:sticky md:top-28 self-start"
          >
            <p className="text-xs font-mono tracking-widest text-muted-foreground mb-4">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.08] mb-6">
              Privacy first.
              <br />
              No surprises.
            </h2>
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-xs">
              Leakr is a tool you run for yourself. Here's exactly what it sees — and what it never touches.
            </p>
          </motion.div>

          {/* Right — accordion */}
          <div className="border-t border-border">
            {FAQS.map((item, i) => (
              <FAQItem
                key={item.q}
                q={item.q}
                a={item.a}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
