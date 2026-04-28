type Props = {
  className?: string;
  variant?: "dark" | "light";
  showWordmark?: boolean;
};

export default function Logo({
  className = "",
  variant = "dark",
  showWordmark = true,
}: Props) {
  const fg = variant === "dark" ? "#0a0a0a" : "#ffffff";
  const mid = variant === "dark" ? "rgba(10,10,10,0.55)" : "rgba(255,255,255,0.55)";
  const accent = variant === "dark" ? "#10b981" : "#34d399"; // emerald green accent

  return (
    <span
      className={`inline-flex items-center transition-all duration-300 ease-out hover:scale-[1.05] hover:opacity-90 ${className}`}
    >
      <span className="relative inline-flex items-center gap-[10px] overflow-hidden">

        {/* Shimmer sweep */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10"
          style={{
            width: "45%",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
            animation: "logo-sweep 5s ease-in-out 1.2s infinite",
          }}
        />

        {/* Icon mark — 3 rising bars with glow dot */}
        <svg
          width="30"
          height="28"
          viewBox="0 0 30 28"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          {/* Bar 1 — short */}
          <g style={{ animation: "logo-bar-in 0.55s cubic-bezier(0.34,1.56,0.64,1) 0s both" }}>
            <rect x="0" y="14" width="7" height="14" rx="1.5" fill={fg} opacity="0.25" />
          </g>
          {/* Bar 2 — medium */}
          <g style={{ animation: "logo-bar-in 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.09s both" }}>
            <rect x="11.5" y="7" width="7" height="21" rx="1.5" fill={fg} opacity="0.65" />
          </g>
          {/* Bar 3 — tall */}
          <g style={{ animation: "logo-bar-in 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.18s both" }}>
            <rect x="23" y="0" width="7" height="28" rx="1.5" fill={fg} />
          </g>
          {/* Accent dot at top of bar 3 */}
          <g style={{ animation: "logo-dot-in 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.38s both" }}>
            <circle cx="26.5" cy="2.5" r="2.5" fill={accent} />
          </g>
        </svg>

        {showWordmark && (
          <span
            className="flex items-baseline leading-none"
            style={{ animation: "logo-text-in 0.45s cubic-bezier(0.22,1,0.36,1) 0.3s both" }}
          >
            <span className="font-black text-[21px] tracking-[-0.03em]" style={{ color: fg }}>
              L&apos;
            </span>
            <span className="font-black text-[21px] tracking-[-0.03em]" style={{ color: mid }}>
              eco
            </span>
            <span className="font-black text-[21px] tracking-[-0.03em]" style={{ color: fg }}>
              max
            </span>
          </span>
        )}
      </span>
    </span>
  );
}
