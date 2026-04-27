"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase, type Order } from "@/lib/supabase";

const STATUS_OPTIONS = [
  { value: "pending", label: "En attente", color: "bg-yellow-100 text-yellow-700" },
  { value: "confirmed", label: "Confirmée", color: "bg-blue-100 text-blue-700" },
  { value: "shipped", label: "Expédiée", color: "bg-purple-100 text-purple-700" },
  { value: "delivered", label: "Livrée", color: "bg-emerald-100 text-emerald-700" },
  { value: "cancelled", label: "Annulée", color: "bg-red-100 text-red-700" },
];
const statusColor = (s: string) => STATUS_OPTIONS.find((x) => x.value === s)?.color ?? "bg-neutral-100 text-neutral-500";
const statusLabel = (s: string) => STATUS_OPTIONS.find((x) => x.value === s)?.label ?? s;

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const detailId = searchParams.get("id");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders((data as Order[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const detail = detailId ? orders.find((o) => o.id === detailId) : null;

  async function updateStatus(id: string, status: string) {
    await supabase.from("orders").update({ status }).eq("id", id);
    load();
  }

  const filtered = orders.filter((o) => {
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    const matchSearch = !search || o.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.order_number?.includes(search) || o.customer?.phone?.includes(search);
    return matchStatus && matchSearch;
  });

  // ── Detail view ──
  if (detail) {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.replace("/admin/orders")} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div>
            <h1 className="text-xl font-black">Commande #{detail.order_number}</h1>
            <p className="text-neutral-400 text-xs">{new Date(detail.created_at).toLocaleString("fr-FR")}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Status */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-5">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Statut</p>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button key={s.value} onClick={() => updateStatus(detail.id, s.value)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all
                    ${detail.status === s.value ? `${s.color} border-current` : "border-neutral-200 text-neutral-400 hover:border-black hover:text-black"}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Customer */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-5">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Client</p>
            <div className="space-y-2 text-sm">
              <Row label="Nom" value={detail.customer?.name} />
              <Row label="Téléphone" value={detail.customer?.phone} />
              <Row label="Email" value={detail.customer?.email || "—"} />
              <Row label="Ville" value={detail.customer?.city} />
              <Row label="Adresse" value={detail.customer?.address} />
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-5">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Articles</p>
            <div className="space-y-3">
              {detail.items?.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg bg-neutral-100" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{item.name}</p>
                    <p className="text-xs text-neutral-400">Qté: {item.qty}{item.size ? ` · Taille: ${item.size}` : ""}</p>
                  </div>
                  <p className="text-sm font-bold">{(item.price * item.qty).toFixed(2)} MAD</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between text-sm">
              <span className="text-neutral-500">Total</span>
              <span className="font-black text-base">{detail.total} MAD</span>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-5">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Paiement</p>
            <p className="text-sm font-medium">{detail.payment_method}</p>
          </div>

          {detail.notes && (
            <div className="bg-white rounded-2xl border border-neutral-100 p-5">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">Notes</p>
              <p className="text-sm text-neutral-600">{detail.notes}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── List view ──
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Commandes</h1>
          <p className="text-neutral-500 text-sm mt-0.5">{orders.length} commande{orders.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nom, téléphone, numéro…"
            className="w-full border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-black" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[{ value: "all", label: "Toutes" }, ...STATUS_OPTIONS].map((s) => (
            <button key={s.value} onClick={() => setFilterStatus(s.value)}
              className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-all
                ${filterStatus === s.value ? "bg-black text-white border-black" : "border-neutral-200 text-neutral-500 hover:border-black hover:text-black"}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center text-neutral-400 text-sm">Aucune commande trouvée.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 text-xs text-neutral-400 uppercase tracking-wide">
                  <th className="text-left px-5 py-3">Client</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Commande</th>
                  <th className="text-right px-4 py-3">Total</th>
                  <th className="text-center px-4 py-3">Statut</th>
                  <th className="text-right px-4 py-3 hidden md:table-cell">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-neutral-50">
                    <td className="px-5 py-3">
                      <p className="font-semibold">{o.customer?.name}</p>
                      <p className="text-neutral-400 text-xs">{o.customer?.phone}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-neutral-400 text-xs">#{o.order_number}</td>
                    <td className="px-4 py-3 text-right font-bold">{o.total} MAD</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${statusColor(o.status)}`}>
                        {statusLabel(o.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-neutral-400 text-xs hidden md:table-cell">
                      {new Date(o.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => router.replace(`/admin/orders?id=${o.id}`)}
                        className="text-xs text-neutral-400 hover:text-black underline">
                        Voir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-neutral-400 w-24 flex-shrink-0">{label}</span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  );
}
