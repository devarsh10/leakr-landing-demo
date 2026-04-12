import { useState, useEffect, useRef } from "react";
import DemoLayout from "../demo/DemoLayout";
import LogModal from "../demo/LogModal";

function fmt(s: number) {
  const h   = Math.floor(s / 3600);
  const m   = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function Demo() {
  const [elapsed, setElapsed]     = useState(0);
  const [running, setRunning]     = useState(false);
  const [task, setTask]           = useState("");
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved]         = useState(false);
  const intervalRef               = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const handleReset = () => {
    setRunning(false);
    setElapsed(0);
    setTask("");
    setSaved(false);
  };

  const handleLog = () => {
    setRunning(false);
    setShowModal(true);
  };

  const handleSaved = () => {
    setShowModal(false);
    setSaved(true);
    handleReset();
  };

  return (
    <DemoLayout currentPath="/demo">
      <div className="flex-1 flex items-center max-w-7xl mx-auto w-full px-6 md:px-12 py-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left — context */}
          <div className="space-y-5">
            <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.06]">
              This is a browser preview.
            </p>
            <p className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.06]" style={{ color: "rgba(26,26,26,0.25)" }}>
              On Pro, the desktop app pauses automatically when you drift.
            </p>
            {/* Saved toast */}
            {saved && (
              <div
                className="rounded-2xl px-5 py-3.5 flex items-center gap-3"
                style={{ background: "rgba(232,168,56,0.10)", border: "1px solid rgba(232,168,56,0.25)" }}
              >
                <span style={{ color: "#E8A838" }}>✓</span>
                <p className="text-sm font-medium text-foreground">Session logged. Check Progress to see it.</p>
              </div>
            )}
          </div>

          {/* Right — timer card */}
          <div
            className="w-full rounded-3xl p-6 md:p-8 flex flex-col items-center gap-5"
            style={{ background: "#EEE9E1", border: "1px solid rgba(26,26,26,0.08)", boxShadow: "0 8px 32px rgba(26,26,26,0.08)" }}
          >
            {/* Clock */}
            <div className="text-center w-full">
              <p
                className="font-mono font-semibold leading-none tracking-tight select-none"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                  color: running ? "#1A1A1A" : "rgba(26,26,26,0.25)",
                  transition: "color 0.4s",
                }}
              >
                {fmt(elapsed)}
              </p>
              <p className="text-xs font-mono tracking-widest text-muted-foreground mt-2">
                hours · minutes · seconds
              </p>
            </div>

            {/* Task input */}
            <div className="w-full">
              <label className="text-xs font-mono tracking-widest text-muted-foreground block mb-2">
                TASK / ORG / SUBJECT
              </label>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g., Project Meeting, Physics, Client Work"
                className="w-full rounded-xl px-4 py-3 text-base font-light text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors"
                style={{ background: "rgba(26,26,26,0.06)", border: "1px solid rgba(26,26,26,0.10)" }}
              />
            </div>

            {/* Primary actions */}
            <div className="w-full flex gap-3">
              <button
                onClick={() => { setRunning((r) => !r); setSaved(false); }}
                className="flex-1 py-3.5 rounded-2xl text-base font-semibold flex items-center justify-center gap-2.5 transition-opacity hover:opacity-85"
                style={{ background: "#1A1A1A", color: "#E8E4DC" }}
              >
                {running ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                    </svg>
                    Pause
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                    {elapsed > 0 ? "Resume" : "Start"}
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3.5 rounded-2xl text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                style={{ border: "1.5px solid rgba(26,26,26,0.14)" }}
              >
                Reset
              </button>
            </div>

            {/* Divider */}
            <div className="w-full" style={{ borderTop: "1px solid rgba(26,26,26,0.08)" }} />

            {/* Log actions */}
            <div className="w-full flex gap-3">
              <button
                onClick={handleLog}
                disabled={elapsed === 0}
                className="flex-1 py-3.5 rounded-2xl text-base font-semibold flex items-center justify-center gap-2 transition-opacity disabled:opacity-25 hover:opacity-85"
                style={{ background: "#E8A838", color: "#1A1A1A" }}
              >
                Stop & log session
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-3.5 rounded-2xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors leading-tight text-center"
                style={{ border: "1.5px solid rgba(26,26,26,0.14)" }}
              >
                Log from<br />stopwatch
              </button>
            </div>

            {/* Hint */}
            <p className="text-xs text-muted-foreground font-light text-center leading-relaxed">
              Tracked time on your own stopwatch or wall clock?{" "}
              <button
                onClick={() => setShowModal(true)}
                className="text-foreground font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
              >
                Log it manually →
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <LogModal
          prefillSeconds={elapsed}
          prefillTask={task}
          onSave={handleSaved}
          onCancel={() => setShowModal(false)}
        />
      )}
    </DemoLayout>
  );
}
