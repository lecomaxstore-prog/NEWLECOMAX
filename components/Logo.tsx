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
  const accent = variant === "dark" ? "#6b7280" : "#9ca3af";

  return (
    /* Outer span: hover scale — no overflow clip so scale isn't cut */
    <span
      className={`inline-flex items-center transition-transform duration-200 ease-out hover:scale-[1.04] ${className}`}
    >
      {/* Inner span: overflow-hidden to clip the shimmer sweep */}
      <span className="relative inline-flex items-center gap-2.5 overflow-hidden">

        {/* Periodic shimmer sweep that crosses the whole logo every 4 s */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10"
          style={{
            width: "38%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
            animation: "logo-sweep 4s ease-in-out 0.9s infinite",
          }}
        />

        <svg
          width="33"
          height="26"
          viewBox="0 0 33 26"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          {/* Bar 1 — lightest, first to arrive */}
          <g style={{ animation: "logo-bar-in 0.52s cubic-bezier(0.34,1.56,0.64,1) both" }}>
            <path d="M0 22 L7 22 L13 4 L6 4 Z" fill={fg} opacity="0.35" />
          </g>
          {/* Bar 2 — medium */}
          <g style={{ animation: "logo-bar-in 0.52s cubic-bezier(0.34,1.56,0.64,1) 0.08s both" }}>
            <path d="M10 22 L17 22 L23 4 L16 4 Z" fill={fg} opacity="0.7" />
          </g>
          {/* Bar 3 — accent, last */}
          <g style={{ animation: "logo-bar-in 0.52s cubic-bezier(0.34,1.56,0.64,1) 0.16s both" }}>
            <path d="M20 22 L27 22 L33 4 L26 4 Z" fill={accent} />
          </g>
        </svg>

        {showWordmark && (
          <span
            className="flex items-baseline leading-none"
            style={{ animation: "logo-text-in 0.4s cubic-bezier(0.22,1,0.36,1) 0.28s both" }}
          >
            <span
              className="font-black text-[22px] tracking-[-0.02em]"
              style={{ color: fg }}
            >
              L&apos;
            </span>
            <span
              className="font-black text-[22px] tracking-[-0.02em]"
              style={{ color: accent }}
            >
              eco
            </span>
            <span
              className="font-black text-[22px] tracking-[-0.02em]"
              style={{ color: fg }}
            >
              max
            </span>
          </span>
        )}
      </span>
    </span>
  );
}
