import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HourglassAnimation from "./HourglassAnimation";

// stagger helper
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section className="w-full min-h-[92vh] flex items-center pt-16 relative overflow-hidden">
      {/* Soft amber glow — desktop only */}
      <div
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(232,168,56,0.13) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* ── Left: copy ─────────────────────────────────────── */}
          <div className="space-y-8">

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.13)}
              className="text-[48px] md:text-[64px] lg:text-[72px] font-semibold leading-[1.04] tracking-tight text-foreground"
            >
              Stop leaking
              <br />
              time.
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.19)}
              className="text-base md:text-xl text-muted-foreground font-light leading-relaxed max-w-md"
            >
              Leakr watches your active window and pauses your timer the moment
              you drift — whether you're billing a client or deep in exam prep.
              Stay focused. Log what you accomplished. Build the habit.
            </motion.p>

            {/* Philosophical line */}
            <motion.p
              {...fadeUp(0.23)}
              className="text-sm text-muted-foreground font-light leading-relaxed max-w-sm"
              style={{ borderLeft: "2px solid rgba(232,168,56,0.5)", paddingLeft: "12px" }}
            >
              AI tools do the work for you. Leakr makes you better at it.
            </motion.p>

            {/* Trust line */}
            <motion.p
              {...fadeUp(0.26)}
              className="text-xs text-muted-foreground font-light tracking-wide"
            >
              🔒 Tracks window titles — never keystrokes, never content.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.25)} className="flex items-center gap-4 flex-wrap">
              <Link
                to="/demo"
                className="bg-foreground text-background text-sm px-7 py-3.5 rounded-full font-medium hover:opacity-85 transition-opacity"
              >
                Try the demo
              </Link>
              <a
                href="#how-it-works"
                className="text-sm text-foreground px-7 py-3.5 rounded-full font-medium border border-foreground/20 hover:border-foreground/50 transition-colors"
              >
                See how it works
              </a>
            </motion.div>

          </div>

          {/* ── Right: product preview ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <HourglassAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
