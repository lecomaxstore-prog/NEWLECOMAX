"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Stats = {
  products: number;
  orders: number;
  revenue: number;
  pending: number;
};

type RecentOrder = {
  id: string;
  order_number: string;
  customer: { name: string };
  total: number;
  status: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ products: 0, orders: 0, revenue: 0, pending: 0 });
  const [recent, setRecent] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ count: products }, { count: orders }, { data: orderData }] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("id, order_number, customer, total, status, created_at").order("created_at", { ascending: false }).limit(5),
      ]);

      const { data: allOrders } = await supabase.from("orders").select("total, status");
      const revenue = allOrders?.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0) ?? 0;
      const pending = allOrders?.filter((o) => o.status === "pending").length ?? 0;

      setStats({ products: products ?? 0, orders: orders ?? 0, revenue, pending });
      setRecent((orderData as RecentOrder[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    {
      label: "Produits actifs",
      value: stats.products,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
        </svg>
      ),
      color: "bg-blue-50 text-blue-600",
      href: "/admin/products",
    },
    {
      label: "Commandes totales",
      value: stats.orders,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      ),
      color: "bg-emerald-50 text-emerald-600",
      href: "/admin/orders",
    },
    {
      label: "En attente",
      value: stats.pending,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      color: "bg-yellow-50 text-yellow-600",
      href: "/admin/orders",
    },
    {
      label: "Chiffre d'affaires",
      value: `${stats.revenue.toFixed(2)} MAD`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
      color: "bg-purple-50 text-purple-600",
      href: "/admin/orders",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black">Tableau de bord</h1>
        <p className="text-neutral-500 text-sm mt-1">Bienvenue dans votre espace admin L&apos;ECOMAX</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((c) => (
              <Link key={c.label} href={c.href} className="bg-white rounded-2xl border border-neutral-100 p-5 hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center mb-3`}>
                  {c.icon}
                </div>
                <p className="text-2xl font-black">{c.value}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{c.label}</p>
              </Link>
            ))}
          </div>

          {/* Recent orders */}
          <div className="bg-white rounded-2xl border border-neutral-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h2 className="font-bold text-sm">Commandes récentes</h2>
              <Link href="/admin/orders" className="text-xs text-neutral-500 hover:text-black underline">
                Voir tout
              </Link>
            </div>

            {recent.length === 0 ? (
              <div className="px-6 py-12 text-center text-neutral-400 text-sm">Aucune commande pour l&apos;instant.</div>
            ) : (
              <div className="divide-y divide-neutral-50">
                {recent.map((order) => (
                  <Link key={order.id} href={`/admin/orders?id=${order.id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{order.customer?.name || "—"}</p>
                      <p className="text-xs text-neutral-400">#{order.order_number}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{order.total} MAD</p>
                      <p className="text-xs text-neutral-400">{new Date(order.created_at).toLocaleDateString("fr-FR")}</p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${statusColors[order.status] || "bg-neutral-100 text-neutral-500"}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Ajouter un produit", href: "/admin/products?new=1", desc: "Nouveau produit" },
              { label: "Voir les commandes", href: "/admin/orders", desc: "Gérer les commandes" },
              { label: "Modifier l'annonce", href: "/admin/announcement", desc: "Barre d'annonce" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="bg-white rounded-xl border border-neutral-100 p-4 hover:border-black transition-colors">
                <p className="text-xs text-neutral-400">{l.desc}</p>
                <p className="font-semibold text-sm mt-0.5">{l.label} →</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
