import { motion } from "framer-motion";

export default function WaitlistCTA() {
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
            Join 312 people already on the list. Free forever for individuals.
            No credit card required.
          </p>

          {/* Teams teaser */}
          <p className="text-xs font-mono tracking-wide mb-10" style={{ color: "rgba(232,168,56,0.65)" }}>
            For teams — coming soon.
          </p>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md"
          >
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 h-12 rounded-full px-5 text-sm font-light focus:outline-none focus:ring-2 placeholder:text-white/25"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#FFFFFF",
              }}
            />
            <button
              type="submit"
              className="h-12 px-7 rounded-full text-sm font-medium whitespace-nowrap transition-opacity hover:opacity-85"
              style={{ background: "#E8A838", color: "#1A1A1A" }}
            >
              Join the waitlist
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
