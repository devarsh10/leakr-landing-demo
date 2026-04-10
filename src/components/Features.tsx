import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

// ── Shared colours ────────────────────────────────────────────────────────────
const AMBER = "#E8A838";
const INK   = "#1A1A1A";

// ─────────────────────────────────────────────────────────────────────────────
// Card 01 mini-UI — Session Log form
// ─────────────────────────────────────────────────────────────────────────────
const SessionLogUI = () => (
  <div
    className="rounded-2xl border border-border mt-6 overflow-hidden"
    style={{ background: "rgba(26,26,26,0.02)" }}
  >
    {/* Header */}
    <div
      className="flex items-center justify-between px-4 py-3 border-b border-border"
      style={{ background: "rgba(26,26,26,0.03)" }}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: AMBER }} />
        <span className="text-xs font-medium text-foreground">Session ended</span>
      </div>
      <span className="text-xs font-mono text-muted-foreground">01:42:33</span>
    </div>

    <div className="p-4 space-y-3">
      {/* Task */}
      <div>
        <p className="text-[10px] font-mono tracking-widest text-muted-foreground mb-1.5">TASK</p>
        <div
          className="w-full rounded-lg px-3 py-2 text-sm text-foreground border border-border"
          style={{ background: "rgba(26,26,26,0.04)" }}
        >
          Redesigned the pricing page
        </div>
      </div>

      {/* Learning */}
      <div>
        <p className="text-[10px] font-mono tracking-widest text-muted-foreground mb-1.5">LEARNING / NOTES</p>
        <div
          className="w-full rounded-lg px-3 py-2 text-xs text-muted-foreground border border-border leading-relaxed"
          style={{ background: "rgba(26,26,26,0.04)" }}
        >
          Users prefer monthly pricing shown first. Reduced cognitive load by removing the comparison table.
        </div>
      </div>

      {/* Proof of work */}
      <div
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 border border-dashed border-border"
        style={{ background: "rgba(26,26,26,0.02)" }}
      >
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ background: INK }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v6M3 7l3 3 3-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-xs text-muted-foreground">Add proof of work — screenshot, link, or file</span>
      </div>

      {/* Save */}
      <button
        className="w-full rounded-lg py-2.5 text-xs font-medium text-background transition-opacity hover:opacity-85"
        style={{ background: INK }}
      >
        Save session log
      </button>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Card 02 mini-UI — Project / Time Entries by date
// ─────────────────────────────────────────────────────────────────────────────

const DATES = ["Mon 7", "Tue 8", "Wed 9", "Thu 10"];

const ENTRIES: Record<string, { task: string; org: string; duration: string }[]> = {
  "Mon 7":  [
    { task: "Redesigned pricing page",  org: "Acme Corp",  duration: "1h 42m" },
    { task: "Fixed auth bug",           org: "Acme Corp",  duration: "0h 53m" },
  ],
  "Tue 8":  [
    { task: "Organic Chemistry · Ch.12", org: "JEE Prep",  duration: "2h 14m" },
    { task: "Mock Test · Physics",       org: "JEE Prep",  duration: "1h 30m" },
  ],
  "Wed 9":  [
    { task: "Client onboarding call",   org: "Beta Labs",  duration: "0h 45m" },
    { task: "Landing page copy",        org: "Beta Labs",  duration: "2h 10m" },
  ],
  "Thu 10": [
    { task: "Essay — Political Theory", org: "UPSC Prep",  duration: "1h 55m" },
    { task: "Current affairs review",   org: "UPSC Prep",  duration: "1h 20m" },
  ],
};

const ProjectEntriesUI = () => {
  const [active, setActive] = useState("Mon 7");
  const entries = ENTRIES[active];

  return (
    <div className="mt-6">
      {/* Date tabs */}
      <div className="flex gap-1.5 mb-4 overflow-x-auto pb-0.5">
        {DATES.map((d) => (
          <button
            key={d}
            onClick={() => setActive(d)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
            style={{
              background: active === d ? INK : "transparent",
              color: active === d ? "white" : "hsl(var(--muted-foreground))",
              borderColor: active === d ? INK : "hsl(var(--border))",
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Entries */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="space-y-0 rounded-2xl border border-border overflow-hidden"
          style={{ background: "rgba(26,26,26,0.02)" }}
        >
          {entries.map((e, i) => (
            <div
              key={e.task}
              className="flex items-start justify-between gap-3 px-4 py-3"
              style={{ borderBottom: i < entries.length - 1 ? "1px solid hsl(var(--border))" : "none" }}
            >
              <div className="min-w-0">
                <p className="text-sm text-foreground font-light truncate">{e.task}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{e.org}</p>
              </div>
              <span className="text-xs font-mono text-muted-foreground flex-shrink-0 pt-0.5">
                {e.duration}
              </span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Card 03 mini-UI — Dashboard: time allocation
// ─────────────────────────────────────────────────────────────────────────────

type Range = "Week" | "Month" | "Year";

const TOTAL_HOURS: Record<Range, number> = {
  Week:  168,
  Month: 720,
  Year:  8760,
};

const RANGE_LABEL: Record<Range, string> = {
  Week:  "Week (168h)",
  Month: "Month (720h)",
  Year:  "Year (8,760h)",
};

const ALLOCATION: Record<Range, { label: string; hours: number; color: string }[]> = {
  Week: [
    { label: "Acme Corp",  hours: 12.5, color: INK      },
    { label: "JEE Prep",   hours: 8.2,  color: AMBER    },
    { label: "UPSC Prep",  hours: 5.7,  color: "#9A9490"},
    { label: "Beta Labs",  hours: 3.1,  color: "#C4B89A"},
  ],
  Month: [
    { label: "Acme Corp",  hours: 48,   color: INK      },
    { label: "JEE Prep",   hours: 34,   color: AMBER    },
    { label: "UPSC Prep",  hours: 22,   color: "#9A9490"},
    { label: "Beta Labs",  hours: 11,   color: "#C4B89A"},
  ],
  Year: [
    { label: "Acme Corp",  hours: 580,  color: INK      },
    { label: "JEE Prep",   hours: 410,  color: AMBER    },
    { label: "UPSC Prep",  hours: 260,  color: "#9A9490"},
    { label: "Beta Labs",  hours: 130,  color: "#C4B89A"},
  ],
};

const DashboardUI = () => {
  const [range, setRange] = useState<Range>("Week");
  const data      = ALLOCATION[range];
  const max       = data[0].hours;
  const total     = data.reduce((s, d) => s + d.hours, 0);
  const available = TOTAL_HOURS[range];

  return (
    <div className="mt-6">
      {/* Toggle */}
      <div
        className="inline-flex rounded-full p-0.5 mb-5"
        style={{ background: "rgba(26,26,26,0.06)", border: "1px solid hsl(var(--border))" }}
      >
        {(["Week", "Month", "Year"] as Range[]).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 font-medium whitespace-nowrap"
            style={{
              background: range === r ? INK : "transparent",
              color: range === r ? "white" : "hsl(var(--muted-foreground))",
            }}
          >
            {RANGE_LABEL[r]}
          </button>
        ))}
      </div>

      {/* Allocation bars */}
      <AnimatePresence mode="wait">
        <motion.div
          key={range}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          {data.map((row) => (
            <div key={row.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-foreground font-light">{row.label}</span>
                <span className="text-xs font-mono text-muted-foreground">
                  {row.hours}h
                </span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: "rgba(26,26,26,0.08)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(row.hours / max) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: "100%", background: row.color, borderRadius: 99 }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Total */}
      <div
        className="mt-5 pt-4 border-t border-border flex items-center justify-between"
      >
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
          TOTAL THIS {range.toUpperCase()}
        </span>
        <span className="text-sm font-semibold text-foreground">
          {total}h{" "}
          <span className="text-xs font-normal text-muted-foreground">
            / {available.toLocaleString()}h
          </span>
        </span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────────────────────

export default function Features() {
  return (
    <section
      id="features"
      className="w-full"
      style={{ background: "hsl(var(--surface))" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-12">
          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-4">
            PRODUCT
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.08]">
            Log it. Browse it.
            <br />
            Understand it.
          </h2>
        </motion.div>

        <div className="space-y-4">

          {/* ── Card 01: Session Log — full width ───────────────────── */}
          <motion.div
            {...fadeUp(0.05)}
            className="bg-card rounded-3xl border border-border p-8 md:p-10 hover:-translate-y-1 transition-transform duration-300"
            style={{ boxShadow: "0 1px 4px rgba(26,26,26,0.06)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">

              {/* Text */}
              <div>
                <p className="text-[11px] font-mono tracking-widest text-muted-foreground mb-4">
                  01 — SESSION LOG
                </p>
                <h3 className="text-2xl font-semibold text-foreground tracking-tight leading-tight mb-4">
                  Every session ends
                  <br />
                  with a record.
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                  When you pause or stop your timer, Leakr prompts you to log
                  the task, the duration (auto-filled), and any notes or
                  learnings. Optionally attach a screenshot, link, or file as
                  proof of work — for clients who need evidence, or for
                  yourself when you look back months later.
                </p>
                <ul className="space-y-2">
                  {[
                    "Task name & duration — auto captured",
                    "Learning / notes field for reflection",
                    "Proof of work — screenshot, link, or file",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground font-light">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: INK }}
                      >
                        <svg width="7" height="5" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mini UI */}
              <SessionLogUI />
            </div>
          </motion.div>

          {/* ── Cards 02 + 03 — two columns ──────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Card 02: Time Entries */}
            <motion.div
              {...fadeUp(0.1)}
              className="bg-card rounded-3xl border border-border p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300"
              style={{ boxShadow: "0 1px 4px rgba(26,26,26,0.06)" }}
            >
              <div>
                <p className="text-[11px] font-mono tracking-widest text-muted-foreground mb-4">
                  02 — TIME ENTRIES
                </p>
                <h3 className="text-xl font-semibold text-foreground tracking-tight leading-tight mb-3">
                  Browse any day.
                  <br />
                  See exactly what happened.
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Every logged session is stored under its date. Jump to any
                  day and see every task, which project or subject it belonged
                  to, and how long it took. Your complete work history — always
                  one click away.
                </p>
              </div>
              <ProjectEntriesUI />
            </motion.div>

            {/* Card 03: Dashboard */}
            <motion.div
              {...fadeUp(0.15)}
              className="bg-card rounded-3xl border border-border p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300"
              style={{ boxShadow: "0 1px 4px rgba(26,26,26,0.06)" }}
            >
              <div>
                <p className="text-[11px] font-mono tracking-widest text-muted-foreground mb-4">
                  03 — DASHBOARD
                </p>
                <h3 className="text-xl font-semibold text-foreground tracking-tight leading-tight mb-3">
                  Know where your
                  <br />
                  hours actually went.
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Your dashboard shows time allocation by organisation,
                  subject, or task — across any week, month, or year. See at a
                  glance which client got most of your focus, or which subject
                  you're neglecting before it's too late.
                </p>
              </div>
              <DashboardUI />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
