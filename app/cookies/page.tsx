export const metadata = {
  title: "Politique de Cookies | L'ecomax",
};

export default function CookiesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-black text-3xl uppercase tracking-tight mb-2">Politique de Cookies</h1>
      <div className="w-10 h-[3px] bg-black mb-10" />

      <div className="space-y-10 text-[14px] text-neutral-700 leading-[1.8]">

        <section>
          <h2 className="font-black text-[13px] uppercase tracking-widest text-black mb-3">Qu'est-ce qu'un Cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, tablette ou mobile) lors de votre visite sur notre site. Il permet de mémoriser vos préférences et d'améliorer votre expérience de navigation.
          </p>
        </section>

        <section>
          <h2 className="font-black text-[13px] uppercase tracking-widest text-black mb-3">Types de Cookies Utilisés</h2>
          <div className="space-y-5">
            <div className="border border-neutral-100 p-5">
              <p className="font-black text-[12px] uppercase tracking-widest text-black mb-2">Cookies Essentiels</p>
              <p>Nécessaires au fonctionnement du site. Ils permettent notamment de conserver votre panier d'achat lors de votre session. Ces cookies ne peuvent pas être désactivés.</p>
            </div>
            <div className="border border-neutral-100 p-5">
              <p className="font-black text-[12px] uppercase tracking-widest text-black mb-2">Cookies de Performance</p>
              <p>Nous aident à comprendre comment les visiteurs interagissent avec notre site en collectant des informations de façon anonyme. Ces données nous permettent d'améliorer continuellement notre site.</p>
            </div>
            <div className="border border-neutral-100 p-5">
              <p className="font-black text-[12px] uppercase tracking-widest text-black mb-2">Cookies de Préférences</p>
              <p>Permettent au site de mémoriser vos choix (langue, région, taille préférée) pour vous offrir une expérience plus personnalisée lors de vos prochaines visites.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-black text-[13px] uppercase tracking-widest text-black mb-3">Durée de Conservation</h2>
          <p>
            Les cookies de session sont supprimés automatiquement à la fermeture de votre navigateur. Les cookies persistants sont conservés sur votre appareil pour une durée maximale de 13 mois.
          </p>
        </section>

        <section>
          <h2 className="font-black text-[13px] uppercase tracking-widest text-black mb-3">Gérer vos Cookies</h2>
          <p>
            Vous pouvez à tout moment modifier vos préférences en matière de cookies via les paramètres de votre navigateur. Notez que la désactivation de certains cookies peut affecter le fonctionnement du site et votre expérience d'achat.
          </p>
          <p className="mt-3">
            Pour en savoir plus sur la gestion des cookies selon votre navigateur, consultez les pages d'aide de Chrome, Firefox, Safari ou Edge.
          </p>
        </section>

        <section>
          <h2 className="font-black text-[13px] uppercase tracking-widest text-black mb-3">Contact</h2>
          <p>
            Pour toute question relative à notre utilisation des cookies, contactez-nous à : <a href="mailto:contact@lecomax.com" className="underline hover:text-black transition-colors">contact@lecomax.com</a>.
          </p>
        </section>

        <p className="text-neutral-400 text-[12px] pt-4 border-t border-neutral-100">
          Dernière mise à jour : avril 2026
        </p>
      </div>
    </main>
  );
}
