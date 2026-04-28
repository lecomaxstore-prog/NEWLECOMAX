import Link from "next/link";

export const metadata = { title: "Conditions d'utilisation | L'ecomax" };

const sections = [
  {
    title: "1. Acceptation des conditions",
    body: `En accédant et en utilisant le site L'ecomax (lecomax.com), vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.`,
  },
  {
    title: "2. Utilisation du site",
    body: `Le site L'ecomax est destiné à un usage personnel et non commercial. Vous vous engagez à ne pas utiliser ce site à des fins illégales ou interdites par les présentes conditions. Vous êtes responsable de toutes les activités réalisées sous votre compte.`,
  },
  {
    title: "3. Compte utilisateur",
    body: `Pour accéder à certaines fonctionnalités, vous devez créer un compte. Vous êtes responsable de maintenir la confidentialité de vos identifiants de connexion et de toutes les activités effectuées sous votre compte. Informez-nous immédiatement de toute utilisation non autorisée de votre compte.`,
  },
  {
    title: "4. Commandes et paiements",
    body: `En passant une commande sur L'ecomax, vous déclarez que toutes les informations fournies sont exactes et complètes. Nous nous réservons le droit d'annuler ou de refuser toute commande pour des raisons légitimes (rupture de stock, erreur de prix, suspicion de fraude). Les prix affichés sont en Dirhams marocains (DH) et incluent la TVA applicable.`,
  },
  {
    title: "5. Livraison",
    body: `Les délais de livraison sont donnés à titre indicatif. L'ecomax ne saurait être tenu responsable des retards causés par des tiers (transporteurs, douanes). La livraison est gratuite pour toute commande supérieure à 500 DH au Maroc.`,
  },
  {
    title: "6. Retours et remboursements",
    body: `Vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour retourner un article non utilisé dans son emballage d'origine. Les frais de retour sont à votre charge sauf en cas d'erreur de notre part ou de produit défectueux. Le remboursement sera effectué dans les 7 jours ouvrables suivant la réception du retour.`,
  },
  {
    title: "7. Propriété intellectuelle",
    body: `Tout le contenu de ce site (textes, images, logos, icônes, vidéos) est la propriété exclusive de L'ecomax et est protégé par les lois relatives à la propriété intellectuelle. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement interdite.`,
  },
  {
    title: "8. Limitation de responsabilité",
    body: `L'ecomax ne saurait être tenu responsable de tout dommage direct ou indirect résultant de l'utilisation ou de l'impossibilité d'utiliser ce site, y compris les pertes de données, les interruptions de service ou les virus informatiques.`,
  },
  {
    title: "9. Modification des conditions",
    body: `L'ecomax se réserve le droit de modifier ces conditions d'utilisation à tout moment. Les modifications prennent effet dès leur publication sur le site. Il est de votre responsabilité de consulter régulièrement ces conditions.`,
  },
  {
    title: "10. Droit applicable",
    body: `Les présentes conditions d'utilisation sont régies par le droit marocain. Tout litige relatif à leur interprétation ou leur exécution sera soumis aux tribunaux compétents de Casablanca, Maroc.`,
  },
];

export default function ConditionsUtilisationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-8">
        <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
        <span>/</span>
        <span className="text-black">Conditions d&apos;utilisation</span>
      </div>

      {/* Header */}
      <div className="border-b border-neutral-200 pb-8 mb-10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-3">Légal</p>
        <h1 className="font-black text-[32px] sm:text-[40px] uppercase tracking-tighter leading-none mb-4">
          Conditions<br />d&apos;utilisation
        </h1>
        <p className="text-[12px] text-neutral-400">Dernière mise à jour : 28 avril 2026</p>
      </div>

      {/* Intro */}
      <p className="text-[13px] text-neutral-600 leading-relaxed mb-10">
        Bienvenue sur L&apos;ecomax. Veuillez lire attentivement les présentes conditions d&apos;utilisation avant d&apos;utiliser notre site ou de passer une commande.
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
        <p className="text-[11px] font-black uppercase tracking-widest mb-1">Questions ?</p>
        <p className="text-[12px] text-neutral-500 leading-relaxed">
          Pour toute question concernant ces conditions, contactez-nous à{" "}
          <a href="mailto:support@lecomax.com" className="font-bold text-black underline underline-offset-2 hover:no-underline">
            support@lecomax.com
          </a>
        </p>
      </div>

      {/* Back link */}
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Retour à l&apos;accueil
        </Link>
      </div>

    </div>
  );
}
