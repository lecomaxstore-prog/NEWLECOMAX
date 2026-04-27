"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

type SortKey = "pertinence" | "prix-asc" | "prix-desc" | "nouveautes" | "promo";

const SORT_LABELS: Record<SortKey, string> = {
  pertinence: "Pertinence",
  "prix-asc": "Prix croissant",
  "prix-desc": "Prix decroissant",
  nouveautes: "Nouveautes",
  promo: "Promotions",
};

export default function CategoryFilters({
  products,
  subCategories,
}: {
  products: Product[];
  subCategories: string[];
}) {
  const [activeSub, setActiveSub] = useState<string>("Tous");
  const [sort, setSort] = useState<SortKey>("pertinence");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = activeSub === "Tous" ? products : products.filter((p) => p.subCategory === activeSub);
    switch (sort) {
      case "prix-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "prix-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "nouveautes": list = [...list].sort((a) => (a.badge === "Nouveau" ? -1 : 1)); break;
      case "promo": list = [...list].sort((a) => (a.oldPrice ? -1 : 1)); break;
    }
    return list;
  }, [products, activeSub, sort]);

  return (
    <>
      {/* Filter + sort bar */}
      <div className="sticky top-[60px] z-30 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">

            {/* Subcategory pills */}
            {["Tous", ...subCategories].map((s) => (
              <button
                key={s}
                onClick={() => setActiveSub(s)}
                className={`shrink-0 px-4 py-2 text-[12px] font-black uppercase tracking-wide border transition-all ${
                  activeSub === s
                    ? "bg-black text-white border-black"
                    : "border-neutral-200 text-neutral-500 hover:border-black hover:text-black"
                }`}
              >
                {s}
              </button>
            ))}

            {/* Sort — pushed right */}
            <div className="ml-auto shrink-0 relative">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 border border-neutral-200 px-4 py-2 text-[12px] font-black uppercase tracking-wide hover:border-black transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M7 12h10M11 18h2"/></svg>
                Trier
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 z-50 bg-white border border-neutral-200 shadow-xl min-w-[200px]">
                  {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                    <button
                      key={k}
                      onClick={() => { setSort(k); setSortOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-[13px] hover:bg-neutral-50 flex items-center justify-between transition-colors ${
                        sort === k ? "font-black" : "font-normal text-neutral-600"
                      }`}
                    >
                      {SORT_LABELS[k]}
                      {sort === k && (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-3 flex items-center justify-between">
        <p className="text-[13px] text-neutral-500">
          <span className="font-black text-black">{filtered.length}</span>
          {" "}article{filtered.length > 1 ? "s" : ""}
          {activeSub !== "Tous" && (
            <> dans <span className="font-bold text-black">{activeSub}</span></>
          )}
        </p>
        {activeSub !== "Tous" && (
          <button
            onClick={() => setActiveSub("Tous")}
            className="text-[12px] text-neutral-500 hover:text-black flex items-center gap-1.5 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            Effacer le filtre
          </button>
        )}
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        {filtered.length === 0 ? (
          <div className="py-20 text-center border border-neutral-100">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="mx-auto text-neutral-300 mb-4">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <p className="text-neutral-400 text-[15px] mb-4">Aucun article pour ce filtre.</p>
            <button
              onClick={() => setActiveSub("Tous")}
              className="bg-black text-white px-6 py-3 text-[12px] font-black uppercase tracking-wide hover:bg-neutral-800 transition-colors"
            >
              Voir tous les articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA strip */}
      <div className="border-t border-neutral-100 bg-neutral-50 py-10 text-center">
        <p className="text-[12px] uppercase tracking-[0.3em] text-neutral-400 mb-2">Livraison & retours</p>
        <p className="text-[14px] text-neutral-600">
          Livraison gratuite d&eacute;s 500 MAD &nbsp;·&nbsp; Retours gratuits sous 30 jours
        </p>
        <div className="flex items-center justify-center gap-6 mt-5">
          <Link href="/aide" className="text-[12px] font-black uppercase tracking-wide underline underline-offset-4 hover:no-underline">
            Centre d&apos;aide
          </Link>
          <Link href="/suivre-commande" className="text-[12px] font-black uppercase tracking-wide underline underline-offset-4 hover:no-underline">
            Suivre ma commande
          </Link>
        </div>
      </div>
    </>
  );
}