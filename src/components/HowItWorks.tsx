import { motion } from "framer-motion";

// ─── Step data ────────────────────────────────────────────────────────────────

const FREE_STEPS = [
  {
    number: "01",
    title: "Start your session",
    description: "Hit start when you're ready to focus. Leakr begins your timer instantly.",
  },
  {
    number: "02",
    title: "Pause when you drift",
    description: "Stepped away or switching context? Pause manually — and resume when you're back.",
  },
  {
    number: "03",
    title: "Stop and log",
    description: "When you're done, stop the timer. Write what you accomplished and save the session.",
  },
];

const DISTRACTION_SITES = ["YouTube", "Instagram", "Reddit", "Twitter", "+ your own"];

const PRO_STEPS = [
  {
    number: "01",
    title: "Start your session",
    description: "Hit start. From here, Leakr takes over — no babysitting required.",
  },
  {
    number: "02",
    title: "Leakr auto-detects distractions",
    description: "The moment you switch to a flagged site, your timer pauses automatically.",
    highlight: true,
    showSites: true,
  },
  {
    number: "03",
    title: "Auto-resumes when you return",
    description: "Close the distraction and your timer picks up right where it left off. Stop and log when you're done.",
    highlight: true,
  },
];

// ─── Step card ────────────────────────────────────────────────────────────────

function StepCard({
  number,
  title,
  description,
  highlight = false,
  showSites = false,
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  highlight?: boolean;
  showSites?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-4 items-start"
    >
      {/* Number circle */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: highlight ? "#E8A838" : "rgba(26,26,26,0.07)",
            border: highlight ? "none" : "1px solid rgba(26,26,26,0.10)",
          }}
        >
          <span
            className="font-mono text-xs font-semibold"
            style={{ color: highlight ? "#1A1A1A" : "rgba(26,26,26,0.45)" }}
          >
            {number}
          </span>
        </div>
      </div>

      {/* Text + optional site chips */}
      <div className="pb-8">
        <h4 className="text-sm font-semibold tracking-tight mb-1 text-foreground">
          {title}
        </h4>
        <p className="text-sm font-light leading-relaxed text-muted-foreground">
          {description}
        </p>

        {showSites && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {DISTRACTION_SITES.map((site) => (
              <span
                key={site}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  background: site === "+ your own"
                    ? "rgba(26,26,26,0.05)"
                    : "rgba(232,168,56,0.12)",
                  color: site === "+ your own"
                    ? "rgba(26,26,26,0.40)"
                    : "#92400E",
                  border: site === "+ your own"
                    ? "1px dashed rgba(26,26,26,0.18)"
                    : "1px solid rgba(232,168,56,0.28)",
                }}
              >
                {site}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Tier column ──────────────────────────────────────────────────────────────

function TierColumn({
  tier,
  badge,
  tagline,
  steps,
  isPro = false,
  baseDelay = 0,
}: {
  tier: string;
  badge: string;
  tagline: string;
  steps: typeof FREE_STEPS;
  isPro?: boolean;
  baseDelay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: baseDelay, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 flex flex-col rounded-3xl p-8 md:p-10"
      style={{
        background: isPro ? "rgba(232,168,56,0.06)" : "rgba(26,26,26,0.03)",
        border: isPro ? "1px solid rgba(232,168,56,0.22)" : "1px solid rgba(26,26,26,0.08)",
      }}
    >
      {/* Tier label */}
      <div className="flex items-center gap-2.5 mb-6">
        <span
          className="text-xs font-mono tracking-widest px-3 py-1 rounded-full"
          style={{
            background: isPro ? "rgba(232,168,56,0.15)" : "rgba(26,26,26,0.07)",
            color: isPro ? "#92400E" : "rgba(26,26,26,0.55)",
            border: isPro ? "1px solid rgba(232,168,56,0.30)" : "1px solid rgba(26,26,26,0.10)",
          }}
        >
          {badge}
        </span>
        <span className="text-lg font-semibold tracking-tight text-foreground">{tier}</span>
      </div>

      {/* Tagline */}
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8 max-w-xs">
        {tagline}
      </p>

      {/* Steps */}
      <div>
        {steps.map((step, i) => (
          <StepCard
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            highlight={"highlight" in step ? step.highlight : false}
            showSites={"showSites" in step ? step.showSites : false}
            delay={baseDelay + 0.1 + i * 0.08}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-background">
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
            HOW IT WORKS
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.08]">
            Start manually.
            <br />
            Let Pro handle the rest.
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-5">
          <TierColumn
            tier="Free"
            badge="FREE"
            tagline="You're in full control. Start, pause, and stop your timer manually — Leakr handles the logging."
            steps={FREE_STEPS}
            isPro={false}
            baseDelay={0}
          />
          <TierColumn
            tier="Pro"
            badge="PRO"
            tagline="Start the timer once. Leakr watches for distractions and pauses automatically — so your focus score is always honest."
            steps={PRO_STEPS}
            isPro={true}
            baseDelay={0.1}
          />
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs text-muted-foreground font-light mt-8 text-center"
        >
          Both tiers end with a session log — task, duration, learnings, and proof of work.
        </motion.p>
      </div>
    </section>
  );
}
