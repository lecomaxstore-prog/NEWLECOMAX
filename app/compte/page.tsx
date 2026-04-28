"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { products } from "@/lib/products";

type UserInfo = {
  email: string;
  full_name: string;
  created_at: string;
  prenom?: string;
};

const recommended = products.slice(0, 2);

export default function ComptePage() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({
          email: session.user.email ?? "",
          full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || "",
          created_at: session.user.created_at,
          prenom: session.user.user_metadata?.prenom,
        });
      }
    });
  }, []);

  const memberSince = user?.created_at
    ? new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(new Date(user.created_at))
    : "";

  const firstName = user?.prenom || user?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "vous";
  const hasFullName = !!(user?.full_name?.trim());
  const today = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(new Date());

  return (
    <div className="flex flex-col gap-5">

      {/* ─── Hero welcome banner ─── */}
      <div className="relative bg-black text-white overflow-hidden">
        {/* Diagonal stripe pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "12px 12px",
          }}
        />
        <div className="relative px-6 sm:px-10 py-10 sm:py-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 mb-3">
              {today.charAt(0).toUpperCase() + today.slice(1)}
            </p>
            <h1 className="font-black text-[32px] sm:text-[40px] uppercase tracking-tighter leading-[0.95] mb-4">
              Bonjour,<br />{firstName}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              {memberSince && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Membre depuis {memberSince}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 text-[10px] font-black uppercase tracking-widest">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                EcoClub Bronze
              </span>
            </div>
          </div>
          <Link
            href="/nouveautes"
            className="inline-flex items-center gap-2.5 bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] px-7 py-4 hover:bg-neutral-100 active:bg-neutral-200 transition-colors self-start sm:self-auto whitespace-nowrap shrink-0 group"
          >
            Nos nouveautés
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ─── Profile completion nudge ─── */}
      {!hasFullName && (
        <div className="bg-white border-l-4 border-black px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black shrink-0">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <p className="font-black text-[12px] uppercase tracking-widest">Complétez votre profil</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">Ajoutez votre nom pour personnaliser votre expérience.</p>
            </div>
          </div>
          <Link
            href="/compte/profil"
            className="shrink-0 text-[10px] font-black uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors whitespace-nowrap"
          >
            Compléter →
          </Link>
        </div>
      )}

      {/* ─── Stats row ─── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Commandes",
            value: "0",
            sub: "En cours / passées",
            href: "/compte/commandes",
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /></svg>
            ),
          },
          {
            label: "Adresses",
            value: "0",
            sub: "Sauvegardées",
            href: "/compte/adresses",
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            ),
          },
          {
            label: "Points",
            value: "0",
            sub: "EcoClub",
            href: "/ecoclub",
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ),
          },
        ].map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group bg-white border border-neutral-100 hover:border-neutral-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 p-4 sm:p-5"
          >
            <div className="text-neutral-300 group-hover:text-black transition-colors mb-3">{s.icon}</div>
            <p className="font-black text-[28px] sm:text-[32px] leading-none tracking-tight mb-1.5">{s.value}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* ─── EcoClub loyalty bar ─── */}
      <div className="bg-white border border-neutral-100 px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <p className="font-black text-[12px] uppercase tracking-widest">Fidélité EcoClub</p>
          </div>
          <Link href="/ecoclub" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
            En savoir plus →
          </Link>
        </div>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-800">Bronze</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-300">Silver · 500 pts</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-100 overflow-hidden">
              <div className="h-full bg-black w-0 transition-all duration-700" />
            </div>
          </div>
        </div>
        <p className="text-[11px] text-neutral-500">
          Accumulez des points à chaque achat et débloquez des avantages exclusifs.
        </p>
      </div>

      {/* ─── Recent orders ─── */}
      <div className="bg-white border border-neutral-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /></svg>
            <p className="font-black text-[13px] uppercase tracking-wide">Commandes récentes</p>
          </div>
          <Link href="/compte/commandes" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
            Tout voir →
          </Link>
        </div>
        <div className="px-6 py-14 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-neutral-50 border border-dashed border-neutral-200 flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-300">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-2">Aucune commande</p>
          <p className="text-[12px] text-neutral-400 leading-relaxed max-w-[200px] mb-6">
            Vos commandes apparaîtront ici après votre premier achat.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-black text-white font-black text-[10px] uppercase tracking-[0.2em] px-6 py-3 hover:bg-neutral-800 transition-colors"
          >
            Explorer la boutique
          </Link>
        </div>
      </div>

      {/* ─── Recommended products ─── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="font-black text-[13px] uppercase tracking-widest">Sélection pour vous</p>
          <Link href="/nouveautes" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {recommended.map((p) => (
            <Link
              key={p.slug}
              href={`/produit/${p.slug}`}
              className="group bg-white border border-neutral-100 hover:border-neutral-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-square bg-neutral-50 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 300px"
                />
                {p.badge && (
                  <span className="absolute top-2.5 right-2.5 bg-black text-white text-[9px] font-black uppercase tracking-widest px-2 py-1">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="px-3.5 py-3">
                <p className="font-bold text-[12px] leading-snug line-clamp-2 mb-2 group-hover:underline underline-offset-2">{p.name}</p>
                <div className="flex items-center gap-2">
                  <span className="font-black text-[15px]">{p.price} DH</span>
                  {p.oldPrice && (
                    <span className="text-[12px] text-neutral-400 line-through">{p.oldPrice} DH</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── Quick actions ─── */}
      <div>
        <p className="font-black text-[13px] uppercase tracking-widest mb-3">Accès rapide</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              href: "/compte/profil",
              label: "Mon profil",
              sub: "Informations personnelles",
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              ),
            },
            {
              href: "/compte/adresses",
              label: "Mes adresses",
              sub: "Adresses de livraison",
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              ),
            },
            {
              href: "/suivre-commande",
              label: "Suivre une commande",
              sub: "Localiser mon colis",
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              ),
            },
            {
              href: "/retours",
              label: "Retours & échanges",
              sub: "Initier un retour",
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
                </svg>
              ),
            },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group bg-white border border-neutral-100 hover:border-black hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-all duration-200 p-5 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 bg-neutral-50 group-hover:bg-black group-hover:text-white text-neutral-400 flex items-center justify-center transition-all duration-200 shrink-0">
                  {action.icon}
                </div>
                <svg
                  width="13" height="13"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="text-neutral-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
              <div>
                <p className="font-black text-[11px] uppercase tracking-widest leading-tight mb-1">{action.label}</p>
                <p className="text-[11px] text-neutral-400 leading-snug">{action.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
