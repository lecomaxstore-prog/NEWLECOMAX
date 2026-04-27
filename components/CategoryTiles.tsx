import Image from "next/image";
import Link from "next/link";
import { categories, productsByCategory } from "@/lib/products";

const categoryImages: Record<string, string> = {
  homme:
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=900&q=80",
  femme:
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
  chaussures:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  accessoires:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
};

export default function CategoryTiles() {
  const cats = categories.map((c) => ({
    ...c,
    count: productsByCategory(c.slug).length,
    image: categoryImages[c.slug],
  }));

  const [main, ...rest] = cats;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="flex items-end justify-between mb-6">
        <h2 className="h-display text-3xl md:text-4xl">
          Acheter par catégorie
        </h2>
        <span className="hidden md:block text-sm text-muted">
          {cats.reduce((s, c) => s + c.count, 0)} articles
        </span>
      </div>

      {/* Asymmetric grid: 1 tall left + 4 in 2×2 right */}
      <div className="grid md:grid-cols-[1.25fr_1fr] gap-3">
        {/* Large left tile */}
        <Tile
          {...main}
          aspect="aspect-[3/4] md:aspect-auto md:h-full"
          textSize="text-4xl"
          sizes="(min-width: 768px) 55vw, 100vw"
        />

        {/* 2×2 right grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          {rest.map((c) => (
            <Tile
              key={c.slug}
              {...c}
              aspect="aspect-[4/3]"
              textSize="text-2xl"
              sizes="(min-width: 768px) 22vw, 50vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Tile({
  slug,
  label,
  count,
  image,
  aspect,
  textSize,
  sizes,
}: {
  slug: string;
  label: string;
  count: number;
  image: string;
  aspect: string;
  textSize: string;
  sizes: string;
}) {
  return (
    <Link
      href={`/${slug}`}
      className={`relative block ${aspect} overflow-hidden bg-neutral-100 group`}
    >
      <Image
        src={image}
        alt={label}
        fill
        sizes={sizes}
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <p className="text-white/60 text-[10px] uppercase tracking-[0.25em] mb-1">
          {count} articles
        </p>
        <h3 className={`h-display text-white ${textSize}`}>{label}</h3>
        <span className="mt-3 inline-flex items-center gap-2 self-start bg-white text-black text-[11px] font-bold uppercase px-3 py-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Découvrir
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
