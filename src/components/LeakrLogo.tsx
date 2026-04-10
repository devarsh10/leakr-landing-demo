/**
 * LeakrLogo — SVG recreation of the actual Leakr logo.
 *
 * The logo is a thin-line hourglass with:
 *   • Smooth organic S-curves (not geometric straight lines)
 *   • Rounded rectangular caps at top and bottom
 *   • Inner curves showing the sand flow funnel (top) and sand pile (bottom)
 *   • A crack / broken chunk on the lower-left of the bottom chamber
 *   • Three sand dots leaking outward from the crack
 *
 * viewBox 0 0 200 270 — all coordinates are in that space.
 * Scale by setting `height`; width is computed proportionally.
 */

interface LeakrLogoProps {
  /** Height in px. Width scales automatically (ratio ≈ 200/270). */
  height?: number;
  /** Stroke/fill colour. Defaults to #1A1A1A (site foreground). */
  color?: string;
}

export default function LeakrLogo({ height = 28, color = "#1A1A1A" }: LeakrLogoProps) {
  const width = Math.round(height * (200 / 270));

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Leakr logo"
    >
      {/* ── Top cap ──────────────────────────────────────────── */}
      <rect
        x="25" y="10" width="150" height="25"
        rx="10"
        stroke={color} strokeWidth="3.5"
      />

      {/* ── Outer right S-curve (no crack — continuous) ────── */}
      <path
        d="M 166 35
           C 166 92, 111 117, 107 135
           C 111 153, 166 180, 166 235"
        stroke={color} strokeWidth="3.5" strokeLinecap="round"
      />

      {/* ── Outer left S-curve — SPLIT at crack ────────────── */}
      {/* Upper: top cap → crack start point ≈ (46, 193) */}
      <path
        d="M 34 35
           C 34 92, 89 117, 93 135
           C 90 150, 62 167, 46 193"
        stroke={color} strokeWidth="3.5" strokeLinecap="round"
      />
      {/* Crack — angular broken piece */}
      <path
        d="M 46 193 L 34 200 L 43 211"
        stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Lower: resume after crack → bottom cap */}
      <path
        d="M 37 211 C 34 222, 34 230, 34 235"
        stroke={color} strokeWidth="3.5" strokeLinecap="round"
      />

      {/* ── Bottom cap ───────────────────────────────────────── */}
      <rect
        x="25" y="235" width="150" height="25"
        rx="10"
        stroke={color} strokeWidth="3.5"
      />

      {/* ── Inner curves — TOP CHAMBER (sand flow funnel) ───── */}
      {/* Left inner wall of the sand cone */}
      <path
        d="M 76 35 C 76 77, 91 113, 93 135"
        stroke={color} strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Right inner wall (mirror) */}
      <path
        d="M 124 35 C 124 77, 109 113, 107 135"
        stroke={color} strokeWidth="2.5" strokeLinecap="round"
      />

      {/* ── Inner curves — BOTTOM CHAMBER (sand pile) ────────── */}
      {/* Left inner: neck → sand pile left edge */}
      <path
        d="M 93 135 C 91 156, 56 186, 52 224"
        stroke={color} strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Right inner: neck → sand pile right edge (mirror) */}
      <path
        d="M 107 135 C 109 156, 144 186, 148 224"
        stroke={color} strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Sand pile surface — curved floor of accumulated sand */}
      <path
        d="M 52 224 Q 100 231 148 224"
        stroke={color} strokeWidth="2.5" strokeLinecap="round"
      />

      {/* ── Sand dots leaking from crack ──────────────────────── */}
      <circle cx="26" cy="192" r="3.5" fill={color} />
      <circle cx="18" cy="202" r="3"   fill={color} />
      <circle cx="23" cy="212" r="2.5" fill={color} />
    </svg>
  );
}
