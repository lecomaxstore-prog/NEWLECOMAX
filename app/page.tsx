import HeroBanner from "@/components/HeroBanner";
import CategoryTiles from "@/components/CategoryTiles";
import ProductRail from "@/components/ProductRail";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export default function HomePage() {
  const newArrivals = products.filter((p) => p.badge === "Nouveau");
  const bestSellers = products.filter((p) => p.badge === "Bestseller");
  const onSale = products.filter((p) => p.oldPrice);

  return (
    <>
      <HeroBanner />

      <ProductRail
        title="Nouveautés"
        products={newArrivals}
        cta={{ label: "Tout voir", href: "/chaussures" }}
      />

      <CategoryTiles />

      {/* ── Editorial split banner ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 grid md:grid-cols-2 gap-3">
        <Link
          href="/chaussures"
          className="relative block aspect-[4/3] overflow-hidden bg-neutral-100 group"
        >
          <Image
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
            alt="Chaussures running"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">Chaussures</p>
            <h3 className="h-display text-3xl md:text-4xl mt-2">
              Running &amp; Style
            </h3>
            <span className="inline-flex items-center gap-2 mt-5 bg-white text-black px-5 py-2.5 font-black uppercase text-[12px] tracking-wider group-hover:bg-neutral-100 transition-colors">
              Voir les chaussures
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </Link>
        <Link
          href="/accessoires"
          className="relative block aspect-[4/3] overflow-hidden bg-neutral-100 group"
        >
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
            alt="Tech & Audio"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">Tech &amp; Audio</p>
            <h3 className="h-display text-3xl md:text-4xl mt-2">
              Son &amp; Gaming
            </h3>
            <span className="inline-flex items-center gap-2 mt-5 bg-white text-black px-5 py-2.5 font-black uppercase text-[12px] tracking-wider group-hover:bg-neutral-100 transition-colors">
              Voir les accessoires
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </Link>
      </section>

      <ProductRail
        title="Bestsellers"
        products={bestSellers}
        cta={{ label: "Tout voir", href: "/homme" }}
      />

      {/* ── Promo strip ─────────────────────────────────────────── */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/50 mb-3">
              Offre limitée
            </p>
            <h2 className="h-display text-4xl md:text-6xl max-w-lg">
              Jusqu&apos;à&nbsp;
              <span className="text-white/90">-40%</span>
              <br />sur une sélection
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-white/60 max-w-xs text-sm leading-relaxed">
              Réductions exceptionnelles sur des incontournables.
              Tant qu&apos;il y en a.
            </p>
            <Link
              href="/promotions"
              className="self-start bg-white text-black px-8 py-4 font-black uppercase text-[13px] tracking-wider hover:bg-neutral-100 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              Voir les promos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <ProductRail
        title="En promotion"
        products={onSale}
        cta={{ label: "Voir les promos", href: "/promotions" }}
      />

      {/* ── ecoClub ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400 mb-3">
            ecoClub
          </p>
          <h2 className="h-display text-4xl md:text-5xl">
            Plus que des récompenses
          </h2>
          <p className="mt-4 text-neutral-500 max-w-lg text-[15px] leading-relaxed">
            Adhérez gratuitement et profitez d&apos;avantages exclusifs : accès
            anticipé aux nouveautés, livraison gratuite, et invitations à des
            événements.
          </p>
          <ul className="mt-5 space-y-2 text-[13px] text-neutral-600">
            {["Accès anticipé aux nouveautés", "Livraison gratuite permanente", "Offres membres exclusives"].map(b => (
              <li key={b} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[9px]">✓</span>
                {b}
              </li>
            ))}
          </ul>
          <Link
            href="/connexion"
            className="inline-flex items-center gap-2 mt-7 bg-black text-white px-7 py-4 font-black uppercase text-[13px] tracking-wider hover:bg-neutral-800 active:scale-95 transition-all"
          >
            Rejoindre l&apos;ecoClub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80"
            alt="Communauté ecoClub"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>
    </>
  );
}
