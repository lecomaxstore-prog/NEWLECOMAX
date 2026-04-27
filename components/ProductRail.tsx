import ProductCard from "./ProductCard";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductRail({
  title,
  products,
  cta,
}: {
  title: string;
  products: Product[];
  cta?: { label: string; href: string };
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="h-display text-3xl md:text-4xl">{title}</h2>
          <span className="block w-12 h-[3px] bg-black mt-2" />
        </div>
        {cta && (
          <Link
            href={cta.href}
            className="group flex items-center gap-2 text-[12px] font-black uppercase tracking-widest hover:opacity-60 transition-opacity"
          >
            {cta.label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4">
        {products.map((p) => (
          <div key={p.slug} className="min-w-[72%] sm:min-w-[42%] md:min-w-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
