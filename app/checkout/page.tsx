"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { formatMAD } from "@/lib/products";

type Field = {
  prenom: string; nom: string; email: string; telephone: string;
  adresse: string; ville: string; codePostal: string;
};

const empty: Field = {
  prenom: "", nom: "", email: "", telephone: "",
  adresse: "", ville: "", codePostal: "",
};

const CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Meknès", "Oujda", "Kénitra", "Tétouan", "Salé", "Nador",
];

function Input({
  label, name, value, error, type = "text", placeholder, onChange,
}: {
  label: string; name: keyof Field; value: string; error?: string;
  type?: string; placeholder?: string;
  onChange: (k: keyof Field, v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-[0.08em] text-neutral-500">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(name, e.target.value)}
          className={`w-full px-4 py-3 text-sm border rounded-lg outline-none transition-all duration-200 bg-white
            focus:ring-2 focus:ring-black/10 focus:border-black
            ${error ? "border-red-400 bg-red-50/40" : "border-neutral-200 hover:border-neutral-400"}`}
        />
        {error && (
          <p className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}

function Section({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="border border-neutral-100 rounded-2xl p-6 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-black flex items-center justify-center shrink-0">
          {step}
        </span>
        <h2 className="font-bold text-[15px] uppercase tracking-[0.06em]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [form, setForm] = useState<Field>(empty);
  const [errors, setErrors] = useState<Partial<Field>>({});
  const [payment, setPayment] = useState<"livraison" | "carte">("livraison");
  const [loading, setLoading] = useState(false);

  const shipping = total >= 500 || total === 0 ? 0 : 49;
  const grandTotal = total + shipping;

  const set = (k: keyof Field, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): Partial<Field> => {
    const e: Partial<Field> = {};
    if (!form.prenom.trim()) e.prenom = "Requis";
    if (!form.nom.trim()) e.nom = "Requis";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide";
    if (!/^[0-9+\s\-()]{8,15}$/.test(form.telephone)) e.telephone = "Numéro invalide";
    if (!form.adresse.trim()) e.adresse = "Requis";
    if (!form.ville.trim()) e.ville = "Requis";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const number = `ECO-${Math.floor(100000 + Math.random() * 900000)}`;
    localStorage.setItem(
      "lecomax_last_order",
      JSON.stringify({ number, items, total: grandTotal, shipping, customer: form, payment, date: new Date().toISOString() })
    );
    clear();
    setTimeout(() => router.push("/merci"), 600);
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-neutral-400 text-sm mb-6">Votre panier est vide.</p>
        <Link href="/" className="inline-block bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-wide rounded-full hover:bg-neutral-800 transition-colors">
          Continuer mes achats
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-neutral-100 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/panier" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-black transition-colors font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Panier
          </Link>
          <span className="font-black text-[13px] uppercase tracking-[0.12em]">L&apos;ecomax</span>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="font-medium">Paiement sécurisé</span>
          </div>
        </div>
        {/* Progress */}
        <div className="flex border-t border-neutral-50">
          {["Informations", "Livraison", "Confirmation"].map((s, i) => (
            <div key={s} className={`flex-1 py-2 text-center text-[10px] font-bold uppercase tracking-[0.1em] ${i === 0 ? "text-black border-b-2 border-black" : "text-neutral-300"}`}>
              {s}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="max-w-5xl mx-auto px-4 py-8 grid lg:grid-cols-[1fr_380px] gap-6 items-start">
          {/* ── Left: Form ── */}
          <div className="flex flex-col gap-5">
            <Section step={1} title="Vos coordonnées">
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <Input label="Prénom" name="prenom" value={form.prenom} error={errors.prenom} onChange={set} placeholder="Mohammed" />
                <Input label="Nom" name="nom" value={form.nom} error={errors.nom} onChange={set} placeholder="El Idrissi" />
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6">
                <Input label="Adresse email" name="email" value={form.email} error={errors.email} type="email" onChange={set} placeholder="exemple@gmail.com" />
                <Input label="Téléphone" name="telephone" value={form.telephone} error={errors.telephone} type="tel" onChange={set} placeholder="06 12 34 56 78" />
              </div>
            </Section>

            <Section step={2} title="Adresse de livraison">
              <div className="flex flex-col gap-6">
                <Input label="Adresse complète" name="adresse" value={form.adresse} error={errors.adresse} onChange={set} placeholder="25 Rue Mohammed V, Appt 4" />
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-neutral-500">Ville</label>
                    <select
                      value={form.ville}
                      onChange={(e) => set("ville", e.target.value)}
                      className={`w-full px-4 py-3 text-sm border rounded-lg outline-none transition-all duration-200 bg-white appearance-none cursor-pointer
                        focus:ring-2 focus:ring-black/10 focus:border-black
                        ${errors.ville ? "border-red-400 bg-red-50/40" : "border-neutral-200 hover:border-neutral-400"}`}
                    >
                      <option value="">Choisir...</option>
                      {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.ville && <p className="text-[10px] text-red-500 font-medium">{errors.ville}</p>}
                  </div>
                  <Input label="Code postal" name="codePostal" value={form.codePostal} onChange={set} placeholder="20000" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-[0.08em] text-neutral-500">Pays</label>
                  <div className="flex items-center gap-3 px-4 py-3 border border-neutral-200 rounded-lg bg-neutral-50">
                    <span className="text-lg">🇲🇦</span>
                    <span className="text-sm font-medium text-neutral-700">Maroc</span>
                    <span className="ml-auto text-[10px] text-neutral-400 uppercase font-bold">Seul pays disponible</span>
                  </div>
                </div>
              </div>
            </Section>

            <Section step={3} title="Mode de paiement">
              <div className="flex flex-col gap-3">
                {[
                  { id: "livraison", label: "Paiement à la livraison", sub: "Payez en espèces à la réception de votre colis.", icon: "💵" },
                  { id: "carte", label: "Carte bancaire", sub: "Disponible prochainement.", icon: "💳", disabled: true },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => !opt.disabled && setPayment(opt.id as "livraison" | "carte")}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200
                      ${opt.disabled ? "opacity-40 cursor-not-allowed border-neutral-100 bg-neutral-50" :
                        payment === opt.id ? "border-black bg-black/[0.02] shadow-[0_0_0_1px_black]" : "border-neutral-200 hover:border-neutral-400 bg-white"}`}
                  >
                    <span className="text-2xl mt-0.5 shrink-0">{opt.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[13px]">{opt.label}</span>
                        {!opt.disabled && (
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ml-auto shrink-0 ${payment === opt.id ? "border-black bg-black" : "border-neutral-300"}`}>
                            {payment === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-neutral-400 mt-0.5">{opt.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </Section>

            {/* Submit (mobile) */}
            <button
              type="submit"
              disabled={loading}
              className="lg:hidden w-full bg-black text-white py-4 rounded-2xl font-bold uppercase text-sm tracking-[0.08em] hover:bg-neutral-800 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Traitement...
                </>
              ) : (
                <>Confirmer ma commande &rarr;</>
              )}
            </button>
          </div>

          {/* ── Right: Order summary ── */}
          <aside className="lg:sticky lg:top-[97px]">
            <div className="bg-white border border-neutral-100 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="px-5 py-4 border-b border-neutral-100">
                <h3 className="font-bold text-[13px] uppercase tracking-[0.08em]">Récapitulatif</h3>
                <p className="text-xs text-neutral-400 mt-0.5">{items.reduce((s, i) => s + i.quantity, 0)} article{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}</p>
              </div>

              {/* Items */}
              <ul className="divide-y divide-neutral-50 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.slug + item.size} className="flex items-center gap-3 px-5 py-3">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                      <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-700 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold leading-tight truncate">{item.name}</p>
                      <p className="text-[11px] text-neutral-400">{item.size}</p>
                    </div>
                    <span className="text-[12px] font-bold shrink-0">{formatMAD(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="px-5 py-4 border-t border-neutral-100 space-y-2">
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Sous-total</span><span>{formatMAD(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Livraison</span>
                  <span className={shipping === 0 ? "text-emerald-600 font-semibold" : ""}>{shipping === 0 ? "Gratuite" : formatMAD(shipping)}</span>
                </div>
                {shipping === 0 && total > 0 && (
                  <p className="text-[10px] text-emerald-600 font-medium">✓ Livraison offerte dès 500 MAD</p>
                )}
                <div className="flex justify-between font-black text-base pt-2 border-t border-neutral-100">
                  <span>Total</span><span>{formatMAD(grandTotal)}</span>
                </div>
              </div>

              {/* CTA (desktop) */}
              <div className="px-5 pb-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="hidden lg:flex w-full bg-black text-white py-4 rounded-2xl font-bold uppercase text-sm tracking-[0.08em] hover:bg-neutral-800 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    <>Confirmer ma commande &rarr;</>
                  )}
                </button>
                <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-neutral-400 font-medium">
                  <span className="flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    SSL sécurisé
                  </span>
                  <span>·</span>
                  <span>🚚 Livraison 2–5 jours</span>
                  <span>·</span>
                  <span>↩ Retours 14j</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
