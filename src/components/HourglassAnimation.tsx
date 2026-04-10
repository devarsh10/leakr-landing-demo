import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, CSSProperties, ReactNode } from "react";

const STROKE = "#1A1A1A";
const AMBER  = "#E8A838";

const cardBase: CSSProperties = {
  background: "#EEE9E1",
  border: "1px solid rgba(26,26,26,0.10)",
  borderRadius: 16,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
};

// ─── Floating card (desktop only) ────────────────────────────────────────────

function FloatingCard({
  children,
  delay,
  floatDuration = 3.6,
  floatY = -8,
  style,
}: {
  children: ReactNode;
  delay: number;
  floatDuration?: number;
  floatY?: number;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        style={style}
        animate={{ y: [0, floatY, 0] }}
        transition={{
          duration: floatDuration,
          delay: delay + 0.65,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// ─── Timer formatter ──────────────────────────────────────────────────────────

function fmt(s: number) {
  const h   = Math.floor(s / 3600);
  const m   = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// ─── Session card ─────────────────────────────────────────────────────────────

function SessionCard({
  elapsed,
  paused,
  fullWidth = false,
}: {
  elapsed: number;
  paused: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div
      style={{
        background: "#EEE9E1",
        border: "1px solid rgba(26,26,26,0.10)",
        borderRadius: 24,
        padding: "22px 24px",
        width: fullWidth ? "100%" : 288,
        boxShadow: "0 8px 32px rgba(26,26,26,0.10)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: paused ? "rgba(26,26,26,0.25)" : AMBER,
            display: "inline-block",
            transition: "background 0.4s ease",
          }} />
          <span style={{ fontSize: 13, fontFamily: "DM Sans, sans-serif", color: STROKE, fontWeight: 600 }}>
            leakr
          </span>
        </div>

        <AnimatePresence mode="wait">
          {paused ? (
            <motion.span
              key="paused"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25 }}
              style={{
                fontSize: 10, fontFamily: "'DM Mono', monospace",
                color: "#92400E", letterSpacing: "0.08em",
                background: "rgba(232,168,56,0.15)",
                padding: "2px 8px", borderRadius: 99,
                border: "1px solid rgba(232,168,56,0.30)",
              }}
            >
              PAUSED
            </motion.span>
          ) : (
            <motion.span
              key="live"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25 }}
              style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#9A9490", letterSpacing: "0.1em" }}
            >
              LIVE
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Timer */}
      <div style={{ marginBottom: 20 }}>
        <p style={{
          fontSize: 9, letterSpacing: "0.12em", color: "#9A9490",
          fontFamily: "DM Sans, sans-serif", textTransform: "uppercase", marginBottom: 5,
        }}>
          Session Duration
        </p>
        <motion.p
          animate={{ opacity: paused ? 0.45 : 1 }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: 38, fontFamily: "'DM Mono', monospace", color: STROKE, lineHeight: 1.05, fontWeight: 400 }}
        >
          {fmt(elapsed)}
        </motion.p>
      </div>

      {/* App rows */}
      <div style={{ borderTop: "1px solid rgba(26,26,26,0.08)", paddingTop: 14 }}>
        {[
          { app: "figma.com",   label: "Active",   isActive: true,  isYT: false },
          { app: "notion.so",   label: "0:32:05",  isActive: false, isYT: false },
          { app: "youtube.com", label: "Paused ⏸", isActive: false, isYT: true  },
        ].map((row, i) => {
          const dimFigma    = paused && row.isActive;
          const highlightYT = paused && row.isYT;
          return (
            <motion.div
              key={row.app}
              animate={{
                opacity: highlightYT ? 1 : dimFigma ? 0.45 : row.isYT ? 0.25 : 1,
                backgroundColor: highlightYT ? "rgba(232,168,56,0.08)" : "transparent",
              }}
              transition={{ duration: 0.4 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 6px", borderRadius: 8,
                borderBottom: i < 2 ? "1px solid rgba(26,26,26,0.06)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <motion.div
                  animate={{
                    background: highlightYT ? AMBER : (row.isActive && !paused) ? AMBER : "rgba(26,26,26,0.18)",
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0 }}
                />
                <span style={{ fontSize: 12, color: STROKE, fontFamily: "DM Sans, sans-serif" }}>
                  {row.app}
                </span>
              </div>
              <motion.span
                animate={{
                  color: highlightYT ? AMBER : (row.isActive && !paused) ? AMBER : "#9A9490",
                }}
                transition={{ duration: 0.4 }}
                style={{
                  fontSize: 11,
                  fontFamily: i === 1 ? "'DM Mono', monospace" : "DM Sans, sans-serif",
                  fontWeight: highlightYT || (row.isActive && !paused) ? 500 : 400,
                }}
              >
                {row.label}
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      {/* Focus bar */}
      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.10em", color: "#9A9490", fontFamily: "DM Sans, sans-serif", textTransform: "uppercase" }}>
            Focus Score
          </span>
          <span style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", color: STROKE }}>74%</span>
        </div>
        <div style={{ height: 4, background: "rgba(26,26,26,0.08)", borderRadius: 99, overflow: "hidden" }}>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "74%" }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "100%", background: AMBER, borderRadius: 99 }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Shared sub-cards ─────────────────────────────────────────────────────────

function StreakCard() {
  return (
    <div style={{ ...cardBase, padding: "12px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>🔥</span>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: STROKE, fontFamily: "DM Sans, sans-serif", marginBottom: 2 }}>
            12-day streak
          </p>
          <p style={{ fontSize: 10, color: "#9A9490", fontFamily: "DM Sans, sans-serif" }}>
            Keep it going →
          </p>
        </div>
      </div>
    </div>
  );
}

function StudyLogCard() {
  return (
    <div style={{ ...cardBase, padding: "14px 17px" }}>
      <p style={{
        fontSize: 9, letterSpacing: "0.12em", color: "#9A9490",
        fontFamily: "DM Sans, sans-serif", textTransform: "uppercase", marginBottom: 10,
      }}>
        Today's Study Log
      </p>
      {[
        { text: "Organic Chemistry · Ch.12", time: "2h 14m" },
        { text: "Mock Test · Physics",        time: "1h 30m" },
      ].map((item, i) => (
        <div key={item.text} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: i === 0 ? 8 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 15, height: 15, borderRadius: "50%", background: STROKE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="7" height="5" viewBox="0 0 8 6" fill="none">
                <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 11, color: STROKE, fontFamily: "DM Sans, sans-serif" }}>{item.text}</span>
          </div>
          <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#9A9490", flexShrink: 0 }}>{item.time}</span>
        </div>
      ))}
    </div>
  );
}

function YouTubeBadge() {
  return (
    <div style={{ ...cardBase, padding: "10px 14px" }}>
      <span style={{
        background: "#FFFBEB", color: "#92400E",
        fontSize: 11, fontFamily: "DM Sans, sans-serif", fontWeight: 500,
        padding: "5px 13px", borderRadius: 99,
        border: "1px solid rgba(232,168,56,0.30)",
        display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
      }}>
        ⏸ YouTube detected — timer paused
      </span>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function HourglassAnimation() {
  const [elapsed, setElapsed]               = useState(1 * 3600 + 42 * 60);
  const [youtubeDetected, setYoutubeDetected] = useState(false);

  // Cycle: run 5s → pause 3.5s → repeat
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const cycle = (nowPaused: boolean) => {
      setYoutubeDetected(nowPaused);
      t = setTimeout(() => cycle(!nowPaused), nowPaused ? 3500 : 5000);
    };
    t = setTimeout(() => cycle(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Timer only ticks when not paused
  useEffect(() => {
    if (youtubeDetected) return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [youtubeDetected]);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on md+)
          Vertical stack — no absolute positioning
      ══════════════════════════════════════════════════════════════ */}
      <div className="md:hidden flex flex-col gap-3 w-full">

        {/* Session card — full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <SessionCard elapsed={elapsed} paused={youtubeDetected} fullWidth />
        </motion.div>

        {/* YouTube badge — slides in/out below session card */}
        <AnimatePresence>
          {youtubeDetected && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <YouTubeBadge />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Streak + Study log side by side */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-3"
        >
          <StreakCard />
          <StudyLogCard />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden on mobile)
          Absolute positioned floating cards around session card
      ══════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block relative w-full" style={{ minHeight: 520 }}>

        {/* Central session card */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <SessionCard elapsed={elapsed} paused={youtubeDetected} />
            </motion.div>
          </motion.div>
        </div>

        {/* YouTube badge — top-right, appears/disappears */}
        <div className="absolute right-0" style={{ top: "18%" }}>
          <AnimatePresence>
            {youtubeDetected && (
              <motion.div
                initial={{ opacity: 0, x: 24, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <YouTubeBadge />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Study log — bottom-left */}
        <div className="absolute left-0" style={{ bottom: "6%" }}>
          <FloatingCard delay={0.9} floatDuration={3.9} floatY={-7} style={{ ...cardBase, padding: "14px 17px", minWidth: 218 }}>
            <StudyLogCard />
          </FloatingCard>
        </div>

        {/* Streak — top-left */}
        <div className="absolute left-0" style={{ top: "14%" }}>
          <FloatingCard delay={1.2} floatDuration={4.6} floatY={-6}>
            <StreakCard />
          </FloatingCard>
        </div>
      </div>
    </>
  );
}
