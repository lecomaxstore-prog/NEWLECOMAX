import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[88vh] min-h-[560px] bg-black text-white overflow-hidden">
      {/* Ken-Burns background */}
      <Image
        src="/ecomax-hero-banner.jpg.png"
        alt="L'ecomax — Nouvelle collection"
        fill
        priority
        className="object-cover object-center hero-image"
      />

      {/* Gradient: clear image at top, dark base at bottom for legible text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-10 flex flex-col justify-end pb-16 md:pb-20">

        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-3 mb-5">
          <span className="hero-divider w-8" />
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 font-semibold">
            L&apos;ecomax · Nouvelle collection 2026
          </p>
        </div>

        {/* Headline */}
        <h1 className="hero-headline h-display text-[clamp(2.6rem,8vw,6rem)] max-w-2xl leading-[0.92]">
          Style &amp; Tech.<br />
          <span className="text-white">À votre image.</span>
        </h1>

        {/* Sub */}
        <p className="hero-sub mt-5 max-w-sm text-white/70 text-[14px] leading-relaxed">
          Mode, accessoires et tech — tout ce qu&apos;il vous faut
          pour exprimer votre style au quotidien.
        </p>

        {/* CTAs */}
        <div className="hero-ctas mt-7 flex flex-wrap gap-3">
          <Link
            href="/homme"
            className="bg-white text-black px-7 py-3.5 font-black uppercase text-[12px] tracking-wider hover:bg-neutral-100 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            Découvrir la collection
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link
            href="/promotions"
            className="border border-white/50 text-white px-7 py-3.5 font-bold uppercase text-[12px] tracking-wider hover:bg-white/10 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            Voir les promotions
          </Link>
        </div>

        {/* Trust micro-signals */}
        <div className="hero-ctas mt-6 flex items-center gap-5 text-white/45 text-[11px] uppercase tracking-widest">
          <span>✓ Livraison gratuite dès 500 MAD</span>
          <span className="hidden sm:block">✓ Retours 30 jours</span>
          <span className="hidden md:block">✓ Paiement sécurisé</span>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-ctas absolute bottom-6 right-6 md:right-10 flex flex-col items-center gap-1.5 text-white/30">
        <span className="text-[10px] uppercase tracking-widest rotate-90 origin-center">Scroll</span>
        <span className="w-px h-8 bg-white/20" />
      </div>
    </section>
  );
}
