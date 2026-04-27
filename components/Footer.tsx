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

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-10 pb-10 border-b border-white/15">
          <div>
            <Logo variant="light" />
            <h3 className="h-display text-2xl mt-5 mb-3">Rejoignez la newsletter</h3>
            <p className="text-white/70 text-sm max-w-md">
              Inscrivez-vous et recevez en avant-première nos nouveautés, offres
              exclusives et invitations.
            </p>
          </div>
          <form className="flex gap-2 self-end w-full">
            <input
              type="email"
              required
              placeholder="Votre adresse email"
              className="flex-1 bg-transparent border border-white/30 px-4 py-3 placeholder-white/50 focus:outline-none focus:border-white"
            />
            <button className="bg-white text-black px-6 py-3 font-bold uppercase text-sm hover:bg-neutral-200">
              S&apos;inscrire
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-bold uppercase text-sm mb-3 tracking-brand">
                {c.title}
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 pt-8 border-t border-white/15 text-xs text-white/60">
          <div>© {new Date().getFullYear()} L&apos;ecomax. Tous droits réservés.</div>
          <div className="flex gap-5">
            <Link href="/conditions/">Conditions d&apos;utilisation</Link>
            <Link href="/confidentialite/">Confidentialité</Link>
            <Link href="/cookies/">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
