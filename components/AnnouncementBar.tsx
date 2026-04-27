export default function AnnouncementBar() {
  const items = [
    { icon: "🚚", text: "LIVRAISON GRATUITE DÈS 500 MAD" },
    { icon: "↩️", text: "RETOURS GRATUITS SOUS 30 JOURS" },
    { icon: "⭐", text: "REJOIGNEZ L'ECOCLUB & GAGNEZ DES POINTS" },
    { icon: "🔒", text: "PAIEMENT 100% SÉCURISÉ" },
    { icon: "💬", text: "SERVICE CLIENT 7J/7" },
    { icon: "✨", text: "NOUVEAUTÉS CHAQUE SEMAINE" },
  ];
  const loop = [...items, ...items];
  return (
    <div className="bg-neutral-950 text-white/80 text-[11px] tracking-[0.18em] py-2.5 overflow-hidden">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span key={i} className="font-semibold flex items-center gap-2">
            <span className="opacity-70 text-[10px]">{item.icon}</span>
            {item.text}
            <span className="opacity-20 mx-2">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
