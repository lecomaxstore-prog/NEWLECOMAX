export default function CarrieresPage() {
  const jobs = [
    {
      title: "Responsable Marketing Digital",
      location: "Casablanca",
      type: "CDI",
      desc: "Gérer et développer notre présence en ligne, créer des campagnes publicitaires percutantes et analyser les performances.",
    },
    {
      title: "Chargé(e) de la Relation Client",
      location: "Casablanca",
      type: "CDI",
      desc: "Accompagner nos clients par chat, email et téléphone. Résoudre les problèmes avec empathie et réactivité.",
    },
    {
      title: "Gestionnaire de Stock",
      location: "Casablanca",
      type: "CDI",
      desc: "Superviser la réception, le rangement et l'expédition des produits. Assurer la précision des inventaires.",
    },
    {
      title: "Développeur(se) Front-End",
      location: "Remote",
      type: "CDI / Freelance",
      desc: "Contribuer à l'amélioration continue de notre site e-commerce (React / Next.js). Passionné(e) par l'UX.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Rejoignez-nous</p>
          <h1 className="h-display text-5xl">Carrières</h1>
          <p className="mt-5 text-white/70 max-w-xl text-lg leading-relaxed">
            Nous construisons l&apos;avenir du retail sportif au Maroc. Rejoignez une équipe passionnée,
            ambitieuse et soudée.
          </p>
        </div>
      </section>

      {/* Offres */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Postes ouverts</h2>
        <div className="space-y-5">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <div className="flex gap-3 mt-1 text-sm text-neutral-500">
                    <span>{job.location}</span>
                    <span>·</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <a
                  href={`mailto:contact@lecomax.com?subject=Candidature – ${encodeURIComponent(job.title)}`}
                  className="shrink-0 bg-black text-white text-sm px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Postuler
                </a>
              </div>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{job.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Candidature spontanée */}
      <section className="bg-neutral-50 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Vous ne trouvez pas votre poste ?</h2>
          <p className="text-neutral-600 mb-6">
            Envoyez-nous une candidature spontanée. Nous lisons chaque message avec attention.
          </p>
          <a
            href="mailto:contact@lecomax.com?subject=Candidature spontanée"
            className="inline-block bg-black text-white px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
          >
            Envoyer ma candidature
          </a>
        </div>
      </section>
    </div>
  );
}
