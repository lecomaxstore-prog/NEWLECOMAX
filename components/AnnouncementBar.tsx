const items = [
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    text: "LIVRAISON GRATUITE DÈS 500 MAD",
    color: "#4ade80",
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
      </svg>
    ),
    text: "RETOURS GRATUITS SOUS 30 JOURS",
    color: "#60a5fa",
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">

        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    text: "PAIEMENT 100% SÉCURISÉ",
    color: "#a78bfa",
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    text: "SERVICE CLIENT 7J/7",
    color: "#fb923c",
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    text: "NOUVEAUTÉS CHAQUE SEMAINE",
    color: "#f472b6",
  },
];

export default function AnnouncementBar() {
  const loop = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden py-[9px] text-[10.5px] tracking-[0.2em] font-semibold select-none"
      style={{
        background: "linear-gradient(90deg, #0a0a0f 0%, #111118 50%, #0a0a0f 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10"
        style={{ background: "linear-gradient(to right, #0a0a0f, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10"
        style={{ background: "linear-gradient(to left, #0a0a0f, transparent)" }} />

      <div className="marquee-track group">
        {loop.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-white/70 hover:text-white/90 transition-colors duration-300">
            <span style={{ color: item.color, opacity: 0.9 }}>{item.icon}</span>
            <span>{item.text}</span>
            <span className="mx-3 inline-block w-[3px] h-[3px] rounded-full bg-white/20 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

