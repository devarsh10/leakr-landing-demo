const SITES = [
  "YouTube",
  "Instagram",
  "Reddit",
  "Twitter / X",
  "Netflix",
  "TikTok",
  "Twitch",
  "Discord",
  "Facebook",
  "WhatsApp Web",
  "Hacker News",
  "LinkedIn Feed",
];

// Duplicate for seamless loop
const ITEMS = [...SITES, ...SITES];

export default function DistractionTicker() {
  return (
    <div className="w-full overflow-hidden border-y border-border py-4" style={{ background: "rgba(26,26,26,0.025)" }}>
      <div className="flex items-center gap-6 mb-0">

        {/* Fixed label */}
        <div
          className="flex-shrink-0 flex items-center gap-2 pl-6 md:pl-12 pr-4 z-10"
          style={{ background: "inherit" }}
        >
          <span
            className="text-[10px] font-mono tracking-widest whitespace-nowrap"
            style={{ color: "rgba(26,26,26,0.35)" }}
          >
            LEAKR PAUSES THESE
          </span>
          <span style={{ color: "rgba(232,168,56,0.7)", fontSize: 12 }}>→</span>
        </div>

        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden">
          <div
            className="flex gap-8 w-max"
            style={{
              animation: "ticker 28s linear infinite",
            }}
          >
            {ITEMS.map((site, i) => (
              <span
                key={i}
                className="flex items-center gap-2.5 whitespace-nowrap text-sm font-light"
                style={{ color: "rgba(26,26,26,0.45)" }}
              >
                <span
                  className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: "rgba(232,168,56,0.5)" }}
                />
                {site}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
