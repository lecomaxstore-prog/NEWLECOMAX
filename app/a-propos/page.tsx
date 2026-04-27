export default function AProposPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 mb-5">Fondée en 2026 · Sidi Bennour</p>
          <h1 className="h-display text-6xl md:text-7xl">L&apos;ecomax</h1>
          <p className="mt-7 text-lg text-white/65 leading-relaxed max-w-xl mx-auto">
            Une jeune marque marocaine née de la passion du style et du mouvement.
            On est là pour vous habiller — simplement, bien, et à prix juste.
          </p>
        </div>
      </section>

      {/* Histoire */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 mb-4">Notre histoire</p>
            <h2 className="text-3xl font-bold mb-5">Tout commence par une idée simple</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              L&apos;ecomax est né à Sidi Bennour d&apos;un constat simple : il est difficile de trouver de bonnes sneakers et des vêtements
              de qualité à des prix raisonnables dans notre région. Alors on a décidé de le faire nous-mêmes.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Fondée en 2026, notre boutique est la première étape d&apos;une aventure qui ne fait que commencer.
              Chaque produit est soigneusement sélectionné — pour sa durabilité, son confort et son style.
            </p>
          </div>
          <div className="relative bg-neutral-950 rounded-3xl aspect-square flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black" />
            <span className="h-display text-[120px] text-white/10 select-none relative z-10">L</span>
            <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white/60 text-xs uppercase tracking-widest">Est. 2026 · Sidi Bennour</p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-neutral-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 mb-3 text-center">Ce qu&apos;on défend</p>
          <h2 className="text-3xl font-bold mb-12 text-center">Nos valeurs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                ),
                title: "Authenticité",
                desc: "Uniquement des produits authentiques, garantis d'origine. Zéro compromis sur la qualité de ce qu'on vous propose.",
              },
              {
                icon: (
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                ),
                title: "Prix justes",
                desc: "On croit que la qualité ne devrait pas être réservée à une élite. Nos prix sont pensés pour être accessibles à tous.",
              },
              {
                icon: (
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                ),
                title: "Service humain",
                desc: "Une vraie équipe derrière chaque commande. On répond à vos questions, on résout vos problèmes, et on s'améliore chaque jour.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 border border-neutral-100">
                <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white">{v.icon}</svg>
                </div>
                <h3 className="font-bold text-base mb-2">{v.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres — réalistes pour une boutique en démarrage */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-b border-neutral-100">
        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 mb-12 text-center">Où on en est</p>
        <div className="grid grid-cols-3 gap-8 text-center">
          {[
            { value: "2026", label: "Année de création" },
            { value: "30+",  label: "Modèles sélectionnés" },
            { value: "1",     label: "Boutique à Sidi Bennour" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="h-display text-4xl md:text-5xl">{stat.value}</p>
              <p className="text-neutral-500 mt-2 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-4">Nous contacter</p>
          <h2 className="text-3xl font-bold mb-4">On est juste au début.</h2>
          <p className="text-white/60 mb-10 leading-relaxed">
            L&apos;ecomax grandit avec vous. Retrouvez-nous en boutique à Sidi Bennour
            ou contactez-nous directement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/212699289568"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-7 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a
              href="mailto:contact@lecomax.com"
              className="inline-flex items-center gap-2.5 border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              contact@lecomax.com
            </a>
          </div>
          <p className="text-white/40 text-sm mt-8">
            Boutique · Sidi Bennour, Maroc
          </p>
        </div>
      </section>
    </div>
  );
}

