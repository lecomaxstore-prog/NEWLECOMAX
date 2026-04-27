export default function RetoursPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Politique</p>
      <h1 className="h-display text-4xl mt-2 mb-8">Retours & Échanges</h1>

      <div className="space-y-10 text-neutral-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-black mb-3">Retour gratuit sous 30 jours</h2>
          <p>
            Vous disposez de <strong>30 jours</strong> à compter de la réception de votre commande pour retourner
            tout article non porté, dans son emballage d&apos;origine, avec l&apos;étiquette intacte.
            Les frais de retour sont entièrement pris en charge par L&apos;ecomax.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Conditions d&apos;éligibilité</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Article non porté et non lavé</li>
            <li>Étiquette d&apos;origine attachée</li>
            <li>Emballage original intact</li>
            <li>Preuve d&apos;achat (email de confirmation ou facture)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Comment initier un retour ?</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>Connectez-vous à votre compte et accédez à vos commandes.</li>
            <li>Sélectionnez l&apos;article à retourner et la raison du retour.</li>
            <li>Imprimez l&apos;étiquette de retour prépayée.</li>
            <li>Déposez le colis dans le bureau de poste ou point relais le plus proche.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Remboursement</h2>
          <p>
            Une fois le retour reçu et validé, votre remboursement sera traité sous <strong>5 à 7 jours ouvrés</strong>.
            Le montant sera crédité sur le moyen de paiement d&apos;origine.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Échanges</h2>
          <p>
            Vous souhaitez échanger votre article contre une autre taille ou couleur ? Effectuez un retour
            et passez une nouvelle commande. Vous bénéficierez de la livraison offerte sur votre nouvel achat.
          </p>
        </section>

        <section className="bg-neutral-50 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-black mb-2">Besoin d&apos;aide ?</h2>
          <p>
            Notre équipe est disponible 7j/7 pour vous accompagner.{" "}
            <a href="/aide/" className="underline font-medium text-black hover:text-neutral-600">
              Contactez le support
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
