import Link from "next/link";
import Logo from "./Logo";

const cols = [
  {
    title: "Produits",
    links: [
      { label: "Nouveautés", href: "/nouveautes/" },
      { label: "Bestsellers", href: "/bestsellers/" },
      { label: "Promotions", href: "/promotions/" },
    ],
  },
  {
    title: "Catégories",
    links: [
      { label: "Chaussures", href: "/chaussures/" },
      { label: "Homme", href: "/homme/" },
      { label: "Femme", href: "/femme/" },
      { label: "Accessoires", href: "/accessoires/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Aide & FAQ", href: "/aide/" },
      { label: "Suivi de commande", href: "/suivre-commande/" },
      { label: "Retours", href: "/retours/" },
      { label: "Guide des tailles", href: "/guide-des-tailles/" },
    ],
  },
  {
    title: "Société",
    links: [
      { label: "À propos", href: "/a-propos/" },
      { label: "Carrières", href: "/carrieres/" },
      { label: "Boutiques", href: "/boutiques/" },
    ],
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.79 1.53V7.03a4.85 4.85 0 01-1.02-.34z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
];

const trustBadges = [
  { label: "Livraison gratuite dès 500 MAD", path: "M20 7H4C2.9 7 2 7.9 2 9v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 8.5 12 8.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" },
  { label: "Retours 30 jours", path: "M3 2v6h6M3 8C4.5 4.5 8 2 12 2a10 10 0 0110 10 10 10 0 01-10 10c-4.1 0-7.6-2.5-9.2-6" },
  { label: "Paiement sécurisé", path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white mt-20">
      {/* Trust bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center gap-3 py-3 md:py-0 md:px-6 first:pl-0 last:pr-0">
              <div className="w-8 h-8 border border-white/20 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d={b.path}/>
                </svg>
              </div>
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/70">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Brand + newsletter */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 pb-12 border-b border-white/10">
          <div>
            <Logo variant="light" />
            <p className="text-white/50 text-[13px] mt-4 max-w-xs leading-relaxed">
              Mode, accessoires et tech — tout ce qu&apos;il vous faut pour exprimer votre style au quotidien.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black text-[11px] uppercase tracking-[0.25em] text-white/50 mb-4">Newsletter</h3>
            <p className="text-white/60 text-[13px] mb-4 leading-relaxed">
              Nouveautés, offres exclusives et invitations en avant-première.
            </p>
            <form className="flex gap-0">
              <input
                type="email"
                required
                placeholder="Votre adresse email"
                className="flex-1 bg-white/5 border border-white/20 border-r-0 px-4 py-3 text-[13px] placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
              />
              <button className="bg-white text-black px-5 py-3 font-black uppercase text-[11px] tracking-wider hover:bg-neutral-100 transition-colors whitespace-nowrap">
                S&apos;inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-black text-[11px] uppercase tracking-[0.25em] text-white/50 mb-4">
                {c.title}
              </h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between gap-4 pt-8 border-t border-white/10 text-[11px] text-white/40">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} L&apos;ecomax.</span>
            <span>Tous droits réservés.</span>
          </div>
          <div className="flex gap-5">
            <Link href="/conditions/" className="hover:text-white/70 transition-colors">Conditions</Link>
            <Link href="/confidentialite/" className="hover:text-white/70 transition-colors">Confidentialité</Link>
            <Link href="/cookies/" className="hover:text-white/70 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
