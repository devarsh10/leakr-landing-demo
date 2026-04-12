import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

type State = "idle" | "loading" | "success" | "duplicate" | "error";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");

    const { error } = await supabase
      .from("waitlist")
      .insert({ email: email.trim().toLowerCase() });

    if (!error) {
      setState("success");
      setEmail("");
    } else if (error.code === "23505") {
      // unique violation — already signed up
      setState("duplicate");
    } else {
      setState("error");
    }
  };

  return (
    <section id="early-access" className="w-full" style={{ background: "#1A1A1A" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {/* Label */}
          <p className="text-[11px] font-mono tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            EARLY ACCESS
          </p>

          {/* Headline */}
          <h2
            className="font-semibold tracking-tight leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "#FFFFFF",
            }}
          >
            Your time is worth
            <br />
            defending.
          </h2>

          {/* Sub */}
          <p className="text-base font-light leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
            Join the waitlist. Free forever for individuals.
            No credit card required.
          </p>

          {/* Teams teaser */}
          <p className="text-xs font-mono tracking-wide mb-10" style={{ color: "rgba(232,168,56,0.65)" }}>
            For teams — coming soon.
          </p>

          {/* Success state */}
          {state === "success" ? (
            <div
              className="flex items-center gap-3 max-w-md rounded-full px-6 py-4"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <span style={{ color: "#E8A838" }}>✓</span>
              <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.8)" }}>
                You're on the list. We'll email you the moment Leakr launches.
              </p>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
                  placeholder="you@example.com"
                  required
                  className="flex-1 h-12 rounded-full px-5 text-sm font-light focus:outline-none focus:ring-2 placeholder:text-white/25"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#FFFFFF",
                  }}
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="h-12 px-7 rounded-full text-sm font-medium whitespace-nowrap transition-opacity hover:opacity-85 disabled:opacity-60"
                  style={{ background: "#E8A838", color: "#1A1A1A" }}
                >
                  {state === "loading" ? "Joining..." : "Join the waitlist"}
                </button>
              </form>

              {/* Inline feedback */}
              {state === "duplicate" && (
                <p className="mt-3 text-xs font-light" style={{ color: "rgba(232,168,56,0.8)" }}>
                  You're already on the list. We'll be in touch.
                </p>
              )}
              {state === "error" && (
                <p className="mt-3 text-xs font-light" style={{ color: "rgba(255,100,100,0.8)" }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
