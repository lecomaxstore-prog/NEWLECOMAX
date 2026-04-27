import HeroBanner from "@/components/HeroBanner";
import CategoryTiles from "@/components/CategoryTiles";
import ProductRail from "@/components/ProductRail";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export default function HomePage() {
  const baasploa = products.find((p) => p.slug === "c-baasploa-course-homme");
  const newArrivals = [
    ...(baasploa ? [baasploa] : []),
    ...products.filter((p) => p.badge === "Nouveau" && p.slug !== "c-baasploa-course-homme"),
  ];
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
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid md:grid-cols-2 gap-3">
        <ScrollReveal direction="up">
          <Link
          href="/chaussures"
          className="relative block aspect-[4/3] overflow-hidden bg-neutral-100 group"
        >
          <Image
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
            alt="Chaussures running"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/60 font-bold mb-2">Chaussures</p>
            <h3 className="h-display text-3xl md:text-4xl">
              Running &amp; Style
            </h3>
            <span className="inline-flex items-center gap-2 mt-5 bg-white text-black px-5 py-2.5 font-black uppercase text-[11px] tracking-[0.15em] group-hover:bg-neutral-100 transition-colors">
              Voir les chaussures
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </Link>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={120}>
          <Link
          href="/accessoires"
          className="relative block aspect-[4/3] overflow-hidden bg-neutral-100 group"
        >
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
            alt="Tech & Audio"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/60 font-bold mb-2">Tech &amp; Audio</p>
            <h3 className="h-display text-3xl md:text-4xl">
              Son &amp; Gaming
            </h3>
            <span className="inline-flex items-center gap-2 mt-5 bg-white text-black px-5 py-2.5 font-black uppercase text-[11px] tracking-[0.15em] group-hover:bg-neutral-100 transition-colors">
              Voir les accessoires
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </Link>
        </ScrollReveal>
      </section>

      <ProductRail
        title="Bestsellers"
        products={bestSellers}
        cta={{ label: "Tout voir", href: "/homme" }}
      />

      {/* ── Promo strip ─────────────────────────────────────────── */}
      <ScrollReveal direction="scale">
      <section className="bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-4">
              Offre limitée
            </p>
            <h2 className="h-display text-4xl md:text-[5.5rem] max-w-xl leading-[0.88]">
              Jusqu&apos;à&nbsp;
              <span className="text-white/80">−40%</span>
              <br />sur une sélection
            </h2>
          </div>
          <div className="flex flex-col gap-5 md:items-end">
            <p className="text-white/50 max-w-xs text-[13px] leading-relaxed md:text-right">
              Réductions exceptionnelles sur des incontournables.
              Tant qu&apos;il y en a.
            </p>
            <Link
              href="/promotions"
              className="self-start md:self-auto bg-white text-black px-8 py-4 font-black uppercase text-[11px] tracking-[0.18em] hover:bg-neutral-100 active:scale-[0.97] transition-all inline-flex items-center gap-2.5"
            >
              Voir les promos
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ProductRail
        title="En promotion"
        products={onSale}
        cta={{ label: "Voir les promos", href: "/promotions" }}
      />

      {/* ── ecoClub ─────────────────────────────────────────────── */}      <ScrollReveal direction="up">      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold mb-4">
            ecoClub
          </p>
          <h2 className="h-display text-4xl md:text-[3.5rem]">
            Plus que des<br/>récompenses
          </h2>
          <p className="mt-5 text-neutral-500 max-w-lg text-[14px] leading-relaxed">
            Adhérez gratuitement et profitez d&apos;avantages exclusifs : accès
            anticipé aux nouveautés, livraison gratuite, et invitations à des
            événements.
          </p>
          <ul className="mt-6 space-y-3">
            {["Accès anticipé aux nouveautés", "Livraison gratuite permanente", "Offres membres exclusives"].map(b => (
              <li key={b} className="flex items-center gap-3 text-[13px] text-neutral-600">
                <span className="w-5 h-5 shrink-0 bg-black text-white flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
          <Link
            href="/connexion"
            className="inline-flex items-center gap-2.5 mt-8 bg-black text-white px-8 py-4 font-black uppercase text-[11px] tracking-[0.18em] hover:bg-neutral-800 active:scale-[0.97] transition-all"
          >
            Rejoindre l&apos;ecoClub
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80"
            alt="Communauté ecoClub"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          />
          {/* Minimal overlay */}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
        </div>
      </section>
      </ScrollReveal>
    </>
  );
}
