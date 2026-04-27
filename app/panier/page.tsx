"use client";

export const dynamic = "force-static";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatMAD } from "@/lib/products";

export default function CartPage() {
  const { items, total, count, setQty, remove, clear } = useCart();
  const shipping = total >= 500 || total === 0 ? 0 : 49;

  return (
    <div className="min-h-[60vh]">
      {/* Page header */}
      <div className="border-b border-neutral-100 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <p className="label-eyebrow mb-2">Boutique</p>
          <h1 className="h-display text-3xl md:text-4xl">Votre panier</h1>
          {count > 0 && (
            <p className="text-neutral-400 text-sm mt-1.5">
              {count} article{count !== 1 ? "s" : ""} sélectionné{count !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {items.length === 0 ? (
          <div className="py-24 flex flex-col items-center text-center">
            {/* Empty bag icon */}
            <div className="w-20 h-20 border-2 border-neutral-200 flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-300">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <h2 className="h-display text-2xl mb-2">Panier vide</h2>
            <p className="text-neutral-400 text-sm mb-8 max-w-xs">Découvrez notre sélection et ajoutez vos articles préférés.</p>
            <Link
              href="/"
              className="bg-black text-white px-8 py-4 font-black uppercase text-[12px] tracking-[0.12em] hover:bg-neutral-800 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              Découvrir la boutique
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 mt-2">
            {/* Items list */}
            <div>
              {/* Free shipping progress */}
              {total < 500 && (
                <div className="mb-6 p-4 bg-neutral-50 border border-neutral-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">
                      Livraison gratuite dès 500 MAD
                    </span>
                    <span className="text-[11px] font-black text-black">{formatMAD(500 - total)} restants</span>
                  </div>
                  <div className="h-[3px] bg-neutral-200 overflow-hidden">
                    <div
                      className="h-full bg-black transition-all duration-500"
                      style={{ width: `${Math.min(100, (total / 500) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {total >= 500 && (
                <div className="mb-6 p-3.5 bg-black text-white flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 7H4C2.9 7 2 7.9 2 9v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"/><path d="M16 3H8L4 7h16l-4-4z"/><path d="M12 12v4M10 14h4"/></svg>
                  Livraison gratuite offerte !
                </div>
              )}

              <ul className="divide-y divide-neutral-100">
                {items.map((i) => (
                  <li
                    key={i.slug + i.size}
                    className="py-6 grid grid-cols-[88px_1fr] gap-5 items-start"
                  >
                    {/* Product image */}
                    <Link href={`/produit/${i.slug}`} className="relative block w-[88px] h-[110px] bg-neutral-50 overflow-hidden group">
                      <Image
                        src={i.image}
                        alt={i.name}
                        fill
                        sizes="88px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/produit/${i.slug}`}
                            className="font-bold text-[14px] leading-snug hover:text-neutral-600 transition-colors line-clamp-2"
                          >
                            {i.name}
                          </Link>
                          <p className="text-[12px] text-neutral-400 mt-0.5 uppercase tracking-wide">
                            Pointure : {i.size}
                          </p>
                        </div>
                        <span className="font-black text-[15px] whitespace-nowrap shrink-0">
                          {formatMAD(i.price * i.quantity)}
                        </span>
                      </div>

                      {/* Actions row */}
                      <div className="mt-3 flex items-center gap-4">
                        {/* Qty stepper */}
                        <div className="inline-flex border border-neutral-200 divide-x divide-neutral-200">
                          <button
                            onClick={() => setQty(i.slug, i.size, i.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-lg font-light hover:bg-neutral-50 transition-colors"
                            aria-label="Diminuer"
                          >
                            −
                          </button>
                          <span className="w-9 h-8 flex items-center justify-center text-[13px] font-bold">
                            {i.quantity}
                          </span>
                          <button
                            onClick={() => setQty(i.slug, i.size, i.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-lg font-light hover:bg-neutral-50 transition-colors"
                            aria-label="Augmenter"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => remove(i.slug, i.size)}
                          className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-neutral-400 hover:text-black transition-colors font-bold"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                          Retirer
                        </button>
                      </div>

                      {/* Unit price */}
                      <p className="text-[11px] text-neutral-400 mt-1">{formatMAD(i.price)} / unité</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={clear}
                  className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-neutral-400 hover:text-black transition-colors font-bold"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  Vider le panier
                </button>
                <Link
                  href="/"
                  className="text-[11px] uppercase tracking-wider text-neutral-400 hover:text-black transition-colors font-bold flex items-center gap-1.5"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Continuer les achats
                </Link>
              </div>
            </div>

            {/* Order summary */}
            <aside>
              <div className="border border-neutral-200 p-6 sticky top-24">
                <h2 className="font-black text-[12px] uppercase tracking-[0.18em] mb-5 pb-4 border-b border-neutral-100">
                  Récapitulatif
                </h2>

                <dl className="space-y-3 text-[13px]">
                  <div className="flex justify-between text-neutral-600">
                    <dt>Sous-total ({count} article{count !== 1 ? "s" : ""})</dt>
                    <dd className="font-semibold text-black">{formatMAD(total)}</dd>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <dt>Livraison</dt>
                    <dd className={`font-semibold ${shipping === 0 ? "text-black" : "text-black"}`}>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-bold">Gratuite</span>
                      ) : formatMAD(shipping)}
                    </dd>
                  </div>
                </dl>

                <div className="flex justify-between mt-5 pt-5 border-t border-neutral-200 font-black">
                  <span className="text-[14px] uppercase tracking-wide">Total</span>
                  <span className="text-[18px]">{formatMAD(total + shipping)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="mt-6 w-full bg-black text-white py-4 font-black uppercase text-[12px] tracking-[0.15em] hover:bg-neutral-800 active:scale-[0.98] transition-all block text-center"
                >
                  Passer à la caisse
                </Link>

                {/* Trust signals */}
                <div className="mt-5 space-y-2">
                  {[
                    { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Paiement 100% sécurisé" },
                    { icon: "M5 12h14M12 5l7 7-7 7", label: "Livraison 2–5 jours ouvrés au Maroc" },
                    { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Retours gratuits sous 30 jours" },
                  ].map(t => (
                    <div key={t.label} className="flex items-center gap-2.5 text-[11px] text-neutral-500">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0 text-neutral-400">
                        <path d={t.icon}/>
                      </svg>
                      {t.label}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
