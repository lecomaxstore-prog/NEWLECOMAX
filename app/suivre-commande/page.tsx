"use client";

import { useState } from "react";

const statuses: Record<string, { label: string; color: string; description: string }> = {
  confirmed: {
    label: "Confirmée",
    color: "bg-blue-500",
    description: "Votre commande a été reçue et est en cours de traitement.",
  },
  processing: {
    label: "En préparation",
    color: "bg-yellow-500",
    description: "Votre commande est en cours de préparation dans notre entrepôt.",
  },
  shipped: {
    label: "Expédiée",
    color: "bg-purple-500",
    description: "Votre commande est en route vers l'adresse de livraison.",
  },
  delivered: {
    label: "Livrée",
    color: "bg-green-500",
    description: "Votre commande a été livrée avec succès.",
  },
};

export default function SuivreCommandePage() {
  const [orderNum, setOrderNum] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (orderNum.trim() && email.trim()) setSubmitted(true);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 mb-2">Commandes</p>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
          Suivre ma commande
        </h1>
        <p className="mt-3 text-neutral-500 text-[15px]">
          Entrez votre numéro de commande et votre e-mail pour consulter l&apos;état de votre livraison.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5">
              Numéro de commande
            </label>
            <input
              type="text"
              placeholder="Ex: ECO-2026-00123"
              value={orderNum}
              onChange={(e) => setOrderNum(e.target.value)}
              className="w-full border border-neutral-300 focus:border-black outline-none px-4 py-3 text-[14px] transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5">
              Adresse e-mail
            </label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-neutral-300 focus:border-black outline-none px-4 py-3 text-[14px] transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-4 font-black uppercase text-[13px] tracking-wider hover:bg-neutral-800 transition-colors"
          >
            Suivre ma commande
          </button>
        </form>
      ) : (
        <div className="border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400">Commande</p>
              <p className="font-black text-lg">{orderNum}</p>
            </div>
            <span className="bg-yellow-100 text-yellow-800 text-[11px] font-bold uppercase px-3 py-1 tracking-wide">
              En préparation
            </span>
          </div>

          {/* Progress steps */}
          <div className="space-y-0">
            {Object.entries(statuses).map(([key, s], i, arr) => {
              const isActive = key === "processing";
              const isDone = i < Object.keys(statuses).indexOf("processing");
              return (
                <div key={key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                        isDone ? "bg-black" : isActive ? "bg-black ring-4 ring-neutral-200" : "bg-neutral-200"
                      }`}
                    />
                    {i < arr.length - 1 && (
                      <div className={`w-px flex-1 my-1 ${isDone || isActive ? "bg-neutral-300" : "bg-neutral-100"}`} />
                    )}
                  </div>
                  <div className="pb-5">
                    <p className={`font-bold text-[13px] ${isActive ? "" : isDone ? "text-neutral-400" : "text-neutral-300"}`}>
                      {s.label}
                    </p>
                    {isActive && (
                      <p className="text-neutral-500 text-[12px] mt-0.5">{s.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => { setSubmitted(false); setOrderNum(""); setEmail(""); }}
            className="mt-4 text-[12px] underline underline-offset-2 text-neutral-400 hover:text-black"
          >
            Chercher une autre commande
          </button>
        </div>
      )}

      <div className="mt-10 p-5 bg-neutral-50 border border-neutral-100">
        <p className="font-bold text-[13px] mb-1">Vous avez un problème avec votre commande ?</p>
        <p className="text-neutral-500 text-[12px]">
          Notre service client est disponible 7j/7.{" "}
          <a href="mailto:contact@lecomax.com" className="underline underline-offset-2 hover:text-black">
            Contactez-nous
          </a>
        </p>
      </div>
    </div>
  );
}
