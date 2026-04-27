import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  categories,
  productsByCategory,
  subCategoriesFor,
} from "@/lib/products";
import CategoryFilters from "@/components/CategoryFilters";

const valid = new Set(categories.map((c) => c.slug));

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!valid.has(category as never)) notFound();

  const cat = categories.find((c) => c.slug === category)!;
  const list = productsByCategory(category);
  const subCategories = subCategoriesFor(category);
  const newCount = list.filter((p) => p.badge === "Nouveau").length;
  const promoCount = list.filter((p) => p.oldPrice).length;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[52vh] min-h-[340px] bg-black overflow-hidden">
        <Image
          src={cat.hero}
          alt={cat.label}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-10">
          <nav className="flex items-center gap-1.5 text-white/40 text-[11px] uppercase tracking-[0.2em] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white/80">{cat.label}</span>
          </nav>

          <h1 className="h-display text-5xl md:text-7xl text-white leading-[0.92]">
            {cat.label}
          </h1>
          <p className="mt-3 text-white/60 max-w-md text-[14px] leading-relaxed">
            {cat.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-[12px] text-white/50 uppercase tracking-wide">
              {list.length} articles
            </span>
            {newCount > 0 && (
              <span className="text-[11px] font-black uppercase bg-white text-black px-2.5 py-1 tracking-wide">
                {newCount} nouveaut&eacute;s
              </span>
            )}
            {promoCount > 0 && (
              <span className="text-[11px] font-black uppercase bg-red-600 text-white px-2.5 py-1 tracking-wide">
                {promoCount} en promo
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Filters + grid */}
      <CategoryFilters products={list} subCategories={subCategories} />
    </div>
  );
}