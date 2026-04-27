import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">404</p>
      <h1 className="h-display text-4xl mt-3">Page introuvable</h1>
      <p className="mt-3 text-muted">
        Désolé, la page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 bg-black text-white px-6 py-3 font-bold uppercase text-sm hover:bg-neutral-800"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
