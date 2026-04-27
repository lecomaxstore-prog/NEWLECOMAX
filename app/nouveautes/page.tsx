import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function NouveautesPage() {
  const list = products.filter((p) => p.badge === "Nouveau");

  return (
    <div>
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Collection</p>
          <h1 className="h-display text-5xl mt-2">Nouveautés</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Découvrez les dernières arrivées de la saison — styles inédits et éditions limitées.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {list.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 py-20 text-center">Aucune nouveauté pour le moment. Revenez bientôt !</p>
        )}
      </section>
    </div>
  );
}
