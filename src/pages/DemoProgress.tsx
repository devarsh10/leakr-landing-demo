import { useState, useEffect } from "react";
import DemoLayout from "../demo/DemoLayout";
import LogModal from "../demo/LogModal";
import {
  getEntriesByDate,
  deleteEntry,
  toDateString,
  fmtDuration,
  fmtTime,
  Entry,
} from "../demo/storage";

function localDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return localDateString(d);
}

function formatDateLabel(dateStr: string): string {
  const today = toDateString(new Date());
  const yesterday = addDays(today, -1);
  if (dateStr === today) return "Today";
  if (dateStr === yesterday) return "Yesterday";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function totalSeconds(entries: Entry[]): number {
  return entries.reduce((sum, e) => sum + e.duration, 0);
}

export default function DemoProgress() {
  const today = localDateString(new Date());
  const [date, setDate] = useState(today);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const reload = () => setEntries(getEntriesByDate(date));

  useEffect(() => { reload(); }, [date]);
  useEffect(() => {
    const onStorage = () => reload();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [date]);

  const handleDelete = (id: string) => {
    deleteEntry(id);
    setDeletingId(null);
    reload();
  };

  const isToday = date === today;
  const isAtStart = date <= "2024-01-01";

  const total = totalSeconds(entries);

  return (
    <DemoLayout currentPath="/demo/progress">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12">

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDate(addDays(date, -1))}
              disabled={isAtStart}
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-20"
              style={{ border: "1.5px solid rgba(26,26,26,0.12)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="text-center min-w-[160px]">
              <p className="text-base font-semibold text-foreground tracking-tight">{formatDateLabel(date)}</p>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">{date}</p>
            </div>

            <button
              onClick={() => setDate(addDays(date, 1))}
              disabled={isToday}
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-20"
              style={{ border: "1.5px solid rgba(26,26,26,0.12)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-85"
            style={{ background: "#1A1A1A", color: "#E8E4DC" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
            Log session
          </button>
        </div>

        {/* Summary card */}
        {entries.length > 0 && (
          <div
            className="rounded-2xl px-6 py-5 mb-6 flex items-center justify-between"
            style={{ background: "#EEE9E1", border: "1px solid rgba(26,26,26,0.08)" }}
          >
            <div>
              <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">TOTAL TRACKED</p>
              <p className="text-3xl font-semibold text-foreground tracking-tight">{fmtDuration(total)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1">SESSIONS</p>
              <p className="text-3xl font-semibold text-foreground tracking-tight">{entries.length}</p>
            </div>
          </div>
        )}

        {/* Entry list */}
        {entries.length === 0 ? (
          <div
            className="rounded-3xl px-8 py-16 flex flex-col items-center text-center"
            style={{ background: "#EEE9E1", border: "1px solid rgba(26,26,26,0.06)" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: "rgba(232,168,56,0.12)", border: "1px solid rgba(232,168,56,0.20)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8A838" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-foreground tracking-tight mb-2">
              {isToday ? "Nothing logged yet today." : "Nothing logged on this day."}
            </p>
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-xs">
              {isToday
                ? "Start the stopwatch or log a session manually to see your work here."
                : "You didn't log any sessions on this day — or data was cleared."}
            </p>
            {isToday && (
              <button
                onClick={() => setShowModal(true)}
                className="mt-6 px-5 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-85"
                style={{ background: "#1A1A1A", color: "#E8E4DC" }}
              >
                Log a session
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => {
              const expanded = expandedId === entry.id;
              const confirming = deletingId === entry.id;
              const hasDetails = entry.notes || entry.proof;

              return (
                <div
                  key={entry.id}
                  className="rounded-2xl overflow-hidden transition-all duration-200"
                  style={{ background: "#EEE9E1", border: "1px solid rgba(26,26,26,0.08)" }}
                >
                  {/* Main row */}
                  <div className="px-5 py-4 flex items-center gap-4">
                    {/* Duration pill */}
                    <div
                      className="shrink-0 px-3 py-1.5 rounded-xl"
                      style={{ background: "rgba(232,168,56,0.12)", border: "1px solid rgba(232,168,56,0.20)" }}
                    >
                      <span className="text-sm font-semibold font-mono" style={{ color: "#92400E" }}>
                        {fmtDuration(entry.duration)}
                      </span>
                    </div>

                    {/* Task + time */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{entry.task}</p>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">{fmtTime(entry.timestamp)}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {hasDetails && (
                        <button
                          onClick={() => setExpandedId(expanded ? null : entry.id)}
                          className="text-xs font-mono tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {expanded ? "less ↑" : "more ↓"}
                        </button>
                      )}
                      {confirming ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground font-light">Delete?</span>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="text-xs font-medium transition-colors"
                            style={{ color: "#E8A838" }}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeletingId(entry.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded details */}
                  {expanded && hasDetails && (
                    <div
                      className="px-5 pb-4 space-y-3"
                      style={{ borderTop: "1px solid rgba(26,26,26,0.07)" }}
                    >
                      {entry.notes && (
                        <div className="pt-3">
                          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1.5">LEARNING NOTES</p>
                          <p className="text-sm font-light text-foreground leading-relaxed">{entry.notes}</p>
                        </div>
                      )}
                      {entry.proof && (
                        <div className={entry.notes ? "" : "pt-3"}>
                          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1.5">PROOF OF WORK</p>
                          <p className="text-sm font-light text-foreground leading-relaxed break-all">{entry.proof}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Browser data notice */}
        <p className="text-xs font-light text-muted-foreground text-center mt-10 leading-relaxed">
          Data is stored in your browser only — it clears when you close this tab.
        </p>
      </div>

      {showModal && (
        <LogModal
          onSave={() => { setShowModal(false); reload(); }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </DemoLayout>
  );
}
