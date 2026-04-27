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
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="h-display text-3xl md:text-4xl">Votre panier</h1>
      <p className="text-muted mt-1">
        {count} article{count !== 1 ? "s" : ""}
      </p>

      {items.length === 0 ? (
        <div className="mt-10 border border-line p-10 text-center">
          <p className="text-muted">Votre panier est vide.</p>
          <Link
            href="/"
            className="inline-block mt-6 bg-black text-white px-6 py-3 font-bold uppercase text-sm hover:bg-neutral-800"
          >
            Continuer mes achats
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 mt-8">
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {items.map((i) => (
                <li
                  key={i.slug + i.size}
                  className="py-5 grid grid-cols-[80px_1fr_auto] gap-4 items-start"
                >
                  <div className="relative w-20 h-24 bg-neutral-100">
                    <Image
                      src={i.image}
                      alt={i.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/produit/${i.slug}`}
                      className="font-semibold hover:underline"
                    >
                      {i.name}
                    </Link>
                    <p className="text-sm text-muted">Pointure : {i.size}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <label className="text-xs uppercase text-muted">
                        Qté
                      </label>
                      <div className="inline-flex border border-line">
                        <button
                          onClick={() =>
                            setQty(i.slug, i.size, i.quantity - 1)
                          }
                          className="px-3 py-1 hover:bg-neutral-100"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 min-w-[2rem] text-center">
                          {i.quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQty(i.slug, i.size, i.quantity + 1)
                          }
                          className="px-3 py-1 hover:bg-neutral-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(i.slug, i.size)}
                        className="text-sm underline underline-offset-4 text-muted hover:text-black"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-semibold">
                    {formatMAD(i.price * i.quantity)}
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={clear}
              className="mt-4 text-sm underline underline-offset-4 text-muted"
            >
              Vider le panier
            </button>
          </div>

          {/* Summary */}
          <aside className="bg-neutral-50 border border-line p-6 h-fit">
            <h2 className="font-bold uppercase">Récapitulatif</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Sous-total</dt>
                <dd>{formatMAD(total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Livraison</dt>
                <dd>{shipping === 0 ? "Gratuite" : formatMAD(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 font-bold text-base">
                <dt>Total</dt>
                <dd>{formatMAD(total + shipping)}</dd>
              </div>
            </dl>
            <Link href="/checkout" className="mt-6 w-full bg-black text-white py-4 font-bold uppercase text-sm hover:bg-neutral-800 block text-center">
              Passer à la caisse →
            </Link>
            <p className="mt-3 text-xs text-muted">
              Paiement sécurisé · Livraison sous 2 à 5 jours ouvrés au Maroc.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
