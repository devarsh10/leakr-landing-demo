import { useState } from "react";
import { saveEntry } from "./storage";

interface Props {
  prefillSeconds?: number;
  prefillTask?: string;
  onSave: () => void;
  onCancel: () => void;
}

export default function LogModal({ prefillSeconds = 0, prefillTask = "", onSave, onCancel }: Props) {
  const prefillMinutes = prefillSeconds > 0 ? Math.max(1, Math.round(prefillSeconds / 60)) : 0;

  const [task, setTask]       = useState(prefillTask);
  const [minutes, setMinutes] = useState(prefillMinutes > 0 ? String(prefillMinutes) : "");
  const [notes, setNotes]     = useState("");
  const [proof, setProof]     = useState("");
  const [error, setError]     = useState("");

  const handleSubmit = () => {
    if (!task.trim()) { setError("Please enter a task or subject."); return; }
    const mins = parseInt(minutes);
    if (!minutes || isNaN(mins) || mins <= 0) { setError("Please enter a valid duration."); return; }

    saveEntry({
      task: task.trim(),
      duration: mins * 60,
      notes: notes.trim(),
      proof: proof.trim(),
      timestamp: Date.now(),
    });
    onSave();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(26,26,26,0.45)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-8 space-y-5"
        style={{ background: "#EEE9E1", border: "1px solid rgba(26,26,26,0.10)", boxShadow: "0 24px 64px rgba(26,26,26,0.18)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground tracking-tight">Log a session</h2>
            <p className="text-xs text-muted-foreground font-light mt-1">What did you work on?</p>
          </div>
          <button onClick={onCancel} className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none mt-0.5">×</button>
        </div>

        {/* Task */}
        <div>
          <label className="text-xs font-mono tracking-widest text-muted-foreground block mb-2">TASK / ORG / SUBJECT</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g., Project Meeting, Physics, Client Work"
            className="w-full rounded-xl px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
            style={{ background: "rgba(26,26,26,0.06)", border: "1px solid rgba(26,26,26,0.10)" }}
          />
        </div>

        {/* Duration */}
        <div>
          <label className="text-xs font-mono tracking-widest text-muted-foreground block mb-2">DURATION (MINUTES)</label>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="e.g., 90"
            min={1}
            className="w-full rounded-xl px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
            style={{ background: "rgba(26,26,26,0.06)", border: "1px solid rgba(26,26,26,0.10)" }}
          />
        </div>

        {/* Learning notes */}
        <div>
          <label className="text-xs font-mono tracking-widest text-muted-foreground block mb-2">LEARNING NOTES <span className="normal-case font-light">(optional)</span></label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What did you learn, finish, or figure out?"
            rows={3}
            className="w-full rounded-xl px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none resize-none transition-colors"
            style={{ background: "rgba(26,26,26,0.06)", border: "1px solid rgba(26,26,26,0.10)" }}
          />
        </div>

        {/* Proof of work */}
        <div>
          <label className="text-xs font-mono tracking-widest text-muted-foreground block mb-2">PROOF OF WORK <span className="normal-case font-light">(optional)</span></label>
          <input
            type="text"
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            placeholder="e.g., PR link, doc URL, screenshot description"
            className="w-full rounded-xl px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
            style={{ background: "rgba(26,26,26,0.06)", border: "1px solid rgba(26,26,26,0.10)" }}
          />
        </div>

        {/* Error */}
        {error && <p className="text-xs font-light" style={{ color: "#E8A838" }}>{error}</p>}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            style={{ border: "1px solid rgba(26,26,26,0.12)" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-full text-sm font-medium transition-opacity hover:opacity-85"
            style={{ background: "#1A1A1A", color: "#E8E4DC" }}
          >
            Log session
          </button>
        </div>
      </div>
    </div>
  );
}
