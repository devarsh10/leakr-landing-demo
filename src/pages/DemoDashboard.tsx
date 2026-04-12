import { useState, useEffect } from "react";
import DemoLayout from "../demo/DemoLayout";
import { getEntries, toDateString, fmtDuration, Entry } from "../demo/storage";
import { Link } from "../router";

type Period = "week" | "month" | "year";

function getPeriodRange(period: Period): { start: string; end: string; label: string } {
  const now = new Date();
  const today = toDateString(now);

  if (period === "week") {
    const dow = now.getDay(); // 0=Sun
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); // Monday
    return {
      start: toDateString(startDate),
      end: today,
      label: "This week",
    };
  }

  if (period === "month") {
    return {
      start: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`,
      end: today,
      label: now.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };
  }

  // year
  return {
    start: `${now.getFullYear()}-01-01`,
    end: today,
    label: String(now.getFullYear()),
  };
}

function filterByRange(entries: Entry[], start: string, end: string): Entry[] {
  return entries.filter((e) => e.date >= start && e.date <= end);
}

function groupByTask(entries: Entry[]): { task: string; total: number }[] {
  const map: Record<string, number> = {};
  for (const e of entries) {
    map[e.task] = (map[e.task] || 0) + e.duration;
  }
  return Object.entries(map)
    .map(([task, total]) => ({ task, total }))
    .sort((a, b) => b.total - a.total);
}

function groupByDate(entries: Entry[], start: string, end: string): { date: string; total: number }[] {
  const map: Record<string, number> = {};
  // Fill all dates in range
  const cur = new Date(start + "T00:00:00");
  const endDate = new Date(end + "T00:00:00");
  while (cur <= endDate) {
    map[toDateString(cur)] = 0;
    cur.setDate(cur.getDate() + 1);
  }
  for (const e of entries) {
    if (e.date in map) map[e.date] = (map[e.date] || 0) + e.duration;
  }
  return Object.entries(map).map(([date, total]) => ({ date, total }));
}

const BAR_COLORS = [
  "#E8A838", "#C4873A", "#D4956A", "#E8C080", "#A07840",
  "#CC9050", "#E8B860", "#B87030", "#F0C870", "#986828",
];

export default function DemoDashboard() {
  const [period, setPeriod] = useState<Period>("week");
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    setEntries(getEntries());
  }, []);

  const { start, end, label } = getPeriodRange(period);
  const filtered = filterByRange(entries, start, end);
  const byTask = groupByTask(filtered);
  const byDate = groupByDate(filtered, start, end);

  const totalTracked = filtered.reduce((s, e) => s + e.duration, 0);
  const activeDays = byDate.filter((d) => d.total > 0).length;
  const maxPerDay = Math.max(...byDate.map((d) => d.total), 1);
  const topTask = byTask[0]?.task ?? null;

  const isEmpty = filtered.length === 0;

  return (
    <DemoLayout currentPath="/demo/dashboard">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xl font-semibold text-foreground tracking-tight">Dashboard</p>
            <p className="text-xs font-mono text-muted-foreground mt-0.5">{label}</p>
          </div>

          {/* Period toggle */}
          <div
            className="flex items-center rounded-full p-1 gap-0.5"
            style={{ background: "rgba(26,26,26,0.06)", border: "1px solid rgba(26,26,26,0.08)" }}
          >
            {(["week", "month", "year"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  background: period === p ? "#1A1A1A" : "transparent",
                  color: period === p ? "#E8E4DC" : "rgba(26,26,26,0.55)",
                }}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {isEmpty ? (
          <div
            className="rounded-3xl px-8 py-16 flex flex-col items-center text-center"
            style={{ background: "#EEE9E1", border: "1px solid rgba(26,26,26,0.06)" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: "rgba(232,168,56,0.12)", border: "1px solid rgba(232,168,56,0.20)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8A838" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-foreground tracking-tight mb-2">No data for this period.</p>
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-xs mb-6">
              Log a few sessions from the Stopwatch tab and your patterns will show up here.
            </p>
            <Link
              to="/demo"
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-85"
              style={{ background: "#1A1A1A", color: "#E8E4DC" }}
            >
              Go to Stopwatch
            </Link>
          </div>
        ) : (
          <div className="space-y-5">

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "TOTAL TRACKED", value: fmtDuration(totalTracked) },
                { label: "ACTIVE DAYS", value: String(activeDays) },
                { label: "TOP SUBJECT", value: topTask ?? "—" },
              ].map(({ label: l, value }) => (
                <div
                  key={l}
                  className="rounded-2xl px-4 py-4"
                  style={{ background: "#EEE9E1", border: "1px solid rgba(26,26,26,0.08)" }}
                >
                  <p className="text-xs font-mono tracking-widest text-muted-foreground mb-1.5">{l}</p>
                  <p className="text-xl font-semibold text-foreground tracking-tight truncate">{value}</p>
                </div>
              ))}
            </div>

            {/* Daily activity bars */}
            <div
              className="rounded-2xl px-5 py-5"
              style={{ background: "#EEE9E1", border: "1px solid rgba(26,26,26,0.08)" }}
            >
              <p className="text-xs font-mono tracking-widest text-muted-foreground mb-5">DAILY ACTIVITY</p>
              <div className="flex items-end gap-1.5" style={{ height: 96 }}>
                {byDate.map(({ date, total }) => {
                  const heightPct = total > 0 ? Math.max(0.08, total / maxPerDay) : 0;
                  const isToday = date === toDateString(new Date());
                  return (
                    <div
                      key={date}
                      className="flex-1 flex flex-col items-center justify-end gap-1 group relative"
                    >
                      <div
                        className="w-full rounded-sm transition-all duration-300"
                        style={{
                          height: `${heightPct * 96}px`,
                          background: total > 0
                            ? isToday ? "#E8A838" : "rgba(26,26,26,0.18)"
                            : "rgba(26,26,26,0.06)",
                          minHeight: total > 0 ? 4 : 3,
                        }}
                      />
                      {/* Tooltip on hover */}
                      {total > 0 && (
                        <div
                          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10 whitespace-nowrap"
                        >
                          <div
                            className="px-2 py-1 rounded-lg text-xs font-mono"
                            style={{ background: "#1A1A1A", color: "#E8E4DC" }}
                          >
                            {fmtDuration(total)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Day labels — only show Mon/Wed/Fri for week, or 1/8/15/22 for month */}
              <div className="flex items-center gap-1.5 mt-2">
                {byDate.map(({ date }, i) => {
                  const d = new Date(date + "T00:00:00");
                  let lbl = "";
                  if (period === "week") {
                    lbl = d.toLocaleDateString("en-US", { weekday: "narrow" });
                  } else if (period === "month") {
                    const day = d.getDate();
                    lbl = [1, 8, 15, 22].includes(day) ? String(day) : "";
                  } else {
                    lbl = d.toLocaleDateString("en-US", { month: "narrow" });
                  }
                  return (
                    <div key={date} className="flex-1 text-center">
                      <span className="text-xs font-mono text-muted-foreground" style={{ fontSize: 10 }}>
                        {lbl}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time by subject */}
            <div
              className="rounded-2xl px-5 py-5"
              style={{ background: "#EEE9E1", border: "1px solid rgba(26,26,26,0.08)" }}
            >
              <p className="text-xs font-mono tracking-widest text-muted-foreground mb-4">TIME BY SUBJECT</p>
              <div className="space-y-3">
                {byTask.map(({ task, total }, i) => {
                  const pct = totalTracked > 0 ? (total / totalTracked) * 100 : 0;
                  return (
                    <div key={task}>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-sm font-medium text-foreground truncate max-w-[60%]">{task}</p>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-mono text-muted-foreground">{Math.round(pct)}%</span>
                          <span className="text-xs font-semibold font-mono text-foreground">{fmtDuration(total)}</span>
                        </div>
                      </div>
                      <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: "rgba(26,26,26,0.08)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            background: BAR_COLORS[i % BAR_COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        <p className="text-xs font-light text-muted-foreground text-center mt-10 leading-relaxed">
          Data is stored in your browser only — it clears when you close this tab.
        </p>
      </div>
    </DemoLayout>
  );
}
