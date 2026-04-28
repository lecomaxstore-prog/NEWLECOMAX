"use client";

import Link from "next/link";
import { useState } from "react";

const TABS = ["Toutes", "En cours", "Livrées", "Annulées"] as const;
type Tab = typeof TABS[number];

export default function CommandesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Toutes");

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-neutral-400 mb-1">Mon compte</p>
          <h1 className="font-black text-[26px] uppercase tracking-tight">Mes commandes</h1>
        </div>
        <Link
          href="/suivre-commande"
          className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border border-neutral-200 px-4 py-2.5 hover:border-black hover:bg-black hover:text-white transition-colors mb-1"
        >
          Suivre un colis →
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-0 border-b border-neutral-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[11px] font-black uppercase tracking-widest pb-3 px-3 border-b-2 transition-colors ${
              activeTab === tab
                ? "border-black text-black"
                : "border-transparent text-neutral-400 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="bg-white border border-neutral-100 px-8 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 border-2 border-dashed border-neutral-200 flex items-center justify-center mb-6">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-300">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-2">
          Aucune commande
        </p>
        <p className="text-[12px] text-neutral-400 max-w-[260px] leading-relaxed mb-8">
          Vous n&apos;avez passé aucune commande pour l&apos;instant. Explorez notre catalogue pour commencer.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-black text-white font-black text-[11px] uppercase tracking-widest px-6 py-3.5 hover:bg-neutral-800 active:bg-neutral-900 transition-colors"
        >
          Découvrir la boutique
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      {/* Info strip */}
      <div className="border border-neutral-100 bg-white px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-start gap-4 flex-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400 shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-[12px] text-neutral-500 leading-relaxed">
            Les commandes passées avant la création de votre compte ne sont pas affichées ici.
            Pour les retrouver, utilisez votre numéro de commande dans le{" "}
            <a href="/suivre-commande" className="font-bold text-black underline underline-offset-2 hover:no-underline">
              suivi de commande
            </a>.
          </p>
        </div>
      </div>

    </div>
  );
}
