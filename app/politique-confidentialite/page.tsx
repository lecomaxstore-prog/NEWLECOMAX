import Link from "next/link";

export const metadata = { title: "Politique de confidentialité | L'ecomax" };

const sections = [
  {
    title: "1. Responsable du traitement",
    body: `L'ecomax est responsable du traitement de vos données personnelles collectées via ce site. Pour toute question relative à vos données, vous pouvez nous contacter à support@lecomax.com.`,
  },
  {
    title: "2. Données collectées",
    body: `Nous collectons les données suivantes lors de votre utilisation du site : informations d'identité (prénom, nom), coordonnées (adresse email, numéro de téléphone, adresse postale), données de transaction (historique des commandes, méthodes de paiement), données de navigation (adresse IP, cookies, pages visitées, temps de visite).`,
  },
  {
    title: "3. Finalités du traitement",
    body: `Vos données sont utilisées pour : traiter et livrer vos commandes, gérer votre compte client, vous envoyer des confirmations et notifications de commande, améliorer notre site et nos services, vous adresser des communications commerciales (avec votre consentement), prévenir la fraude et assurer la sécurité du site.`,
  },
  {
    title: "4. Base légale",
    body: `Le traitement de vos données repose sur : l'exécution du contrat (traitement des commandes), votre consentement (communications marketing), notre intérêt légitime (amélioration du service, sécurité), le respect d'obligations légales (comptabilité, facturation).`,
  },
  {
    title: "5. Durée de conservation",
    body: `Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées. Les données de compte sont conservées tant que votre compte est actif. Les données de transaction sont conservées 10 ans conformément aux obligations légales. Les données de navigation sont conservées 13 mois maximum.`,
  },
  {
    title: "6. Partage des données",
    body: `Vos données peuvent être partagées avec nos prestataires de services (transporteurs pour la livraison, prestataires de paiement, hébergeurs). Ces partenaires sont contractuellement tenus de respecter la confidentialité de vos données. Nous ne vendons jamais vos données personnelles à des tiers.`,
  },
  {
    title: "7. Cookies",
    body: `Notre site utilise des cookies pour améliorer votre expérience de navigation, mémoriser vos préférences et analyser notre trafic. Vous pouvez paramétrer votre navigateur pour refuser les cookies, bien que cela puisse affecter certaines fonctionnalités du site. Les cookies publicitaires ne sont déposés qu'avec votre consentement.`,
  },
  {
    title: "8. Vos droits",
    body: `Conformément à la réglementation applicable, vous disposez des droits suivants concernant vos données : droit d'accès, droit de rectification, droit à l'effacement, droit à la limitation du traitement, droit à la portabilité, droit d'opposition. Pour exercer ces droits, contactez-nous à support@lecomax.com avec une pièce d'identité.`,
  },
  {
    title: "9. Sécurité",
    body: `Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction. Les transmissions de données sensibles sont chiffrées via le protocole SSL/TLS.`,
  },
  {
    title: "10. Modifications",
    body: `Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page avec la date de mise à jour. Nous vous encourageons à consulter régulièrement cette page.`,
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-8">
        <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
        <span>/</span>
        <span className="text-black">Politique de confidentialité</span>
      </div>

      {/* Header */}
      <div className="border-b border-neutral-200 pb-8 mb-10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-3">Légal</p>
        <h1 className="font-black text-[32px] sm:text-[40px] uppercase tracking-tighter leading-none mb-4">
          Politique de<br />confidentialité
        </h1>
        <p className="text-[12px] text-neutral-400">Dernière mise à jour : 28 avril 2026</p>
      </div>

      {/* Intro */}
      <p className="text-[13px] text-neutral-600 leading-relaxed mb-10">
        La protection de vos données personnelles est une priorité pour L&apos;ecomax. Cette politique décrit comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site.
      </p>

      {/* Sections */}
      <div className="flex flex-col gap-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-black text-[13px] uppercase tracking-widest mb-3">{s.title}</h2>
            <p className="text-[13px] text-neutral-600 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      {/* Contact strip */}
      <div className="mt-12 border border-neutral-200 px-6 py-5 bg-neutral-50">
        <p className="text-[11px] font-black uppercase tracking-widest mb-1">Exercer vos droits</p>
        <p className="text-[12px] text-neutral-500 leading-relaxed">
          Pour toute demande relative à vos données personnelles, contactez notre délégué à la protection des données à{" "}
          <a href="mailto:privacy@lecomax.com" className="font-bold text-black underline underline-offset-2 hover:no-underline">
            privacy@lecomax.com
          </a>
        </p>
      </div>

      {/* Links */}
      <div className="mt-8 flex items-center gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/conditions-utilisation"
          className="text-[11px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
        >
          Conditions d&apos;utilisation →
        </Link>
      </div>

    </div>
  );
}
