// ─── Types ────────────────────────────────────────────────────────────────────

export interface Entry {
  id: string;
  task: string;
  duration: number; // in seconds
  notes: string;
  proof: string;
  timestamp: number; // Date.now()
  date: string; // YYYY-MM-DD
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const KEY = "leakr_demo_entries";

export function getEntries(): Entry[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveEntry(entry: Omit<Entry, "id" | "date">): Entry {
  const entries = getEntries();
  const newEntry: Entry = {
    ...entry,
    id: crypto.randomUUID(),
    date: new Date(entry.timestamp).toISOString().split("T")[0],
  };
  entries.unshift(newEntry);
  localStorage.setItem(KEY, JSON.stringify(entries));
  return newEntry;
}

export function deleteEntry(id: string): void {
  const entries = getEntries().filter((e) => e.id !== id);
  localStorage.setItem(KEY, JSON.stringify(entries));
}

export function getEntriesByDate(date: string): Entry[] {
  return getEntries().filter((e) => e.date === date);
}

export function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function fmtDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function fmtTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
