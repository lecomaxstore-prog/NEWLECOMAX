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
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [trackingInput, setTrackingInput] = useState("");
  const [trackingSaving, setTrackingSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState("");
  const [bulkUpdating, setBulkUpdating] = useState(false);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error("Orders fetch error:", error);
      setLoadError(error.message);
    }
    setOrders((data as Order[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const detail = detailId ? orders.find((o) => o.id === detailId) : null;

  // Pre-fill tracking input when switching to a detail
  useEffect(() => {
    setTrackingInput(detail?.tracking_number ?? "");
  }, [detail?.id, detail?.tracking_number]);

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) { showToast("Erreur : " + error.message, false); return; }
    await load();
    showToast("Statut mis à jour ✓");
  }

  function exportCSV() {
    const cols = ["Commande", "Date", "Nom", "Téléphone", "Email", "Ville", "Adresse", "Produits", "Total", "Statut", "Paiement", "Suivi", "Notes"];
    const rows = orders.map((o) => [
      o.order_number,
      new Date(o.created_at).toLocaleDateString("fr-FR"),
      o.customer?.name ?? "",
      o.customer?.phone ?? "",
      o.customer?.email ?? "",
      o.customer?.city ?? "",
      o.customer?.address ?? "",
      (o.items ?? []).map((i) => `${i.name} x${i.qty}`).join(" | "),
      o.total,
      statusLabel(o.status),
      o.payment_method ?? "",
      o.tracking_number ?? "",
      o.notes ?? "",
    ]);
    const csv = [cols, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `commandes-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  }

  async function applyBulkStatus() {
    if (!bulkStatus || selected.size === 0) return;
    setBulkUpdating(true);
    const ids = [...selected];
    const { error } = await supabase.from("orders").update({ status: bulkStatus }).in("id", ids);
    if (error) showToast("Erreur : " + error.message, false);
    else { showToast(`${ids.length} commande(s) mises à jour ✓`); setSelected(new Set()); setBulkStatus(""); await load(); }
    setBulkUpdating(false);
  }

  function toggleSelect(id: string) {
    setSelected((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  }

  function toggleAll() {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((o) => o.id)));
  }

  async function saveTracking(id: string) {
    setTrackingSaving(true);
    const { error } = await supabase.from("orders").update({ tracking_number: trackingInput || null }).eq("id", id);
    await load();
    setTrackingSaving(false);
    if (error) showToast("Erreur : " + error.message, false);
    else showToast("Numéro de suivi enregistré ✓");
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
          <div className="flex-1">
            <h1 className="text-xl font-black">Commande #{detail.order_number}</h1>
            <p className="text-neutral-400 text-xs">{new Date(detail.created_at).toLocaleString("fr-FR")}</p>
          </div>
          <button
            onClick={() => window.open(`/admin/orders/vat-invoice?id=${detail.id}`, "_blank")}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            Facture TVA
          </button>
          <button
            onClick={() => window.open(`/admin/orders/print?id=${detail.id}`, "_blank")}
            className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-xl text-sm font-semibold hover:border-black transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Imprimer
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-semibold ${
            toast.ok ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-red-50 border border-red-200 text-red-700"
          }`}>
            {toast.msg}
          </div>
        )}

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

          {/* Tracking number */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-5">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Numéro de suivi</p>
            {detail.tracking_number && (
              <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-100 rounded-xl">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-sm font-bold text-purple-700 tracking-widest">{detail.tracking_number}</span>
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Ex: MA123456789FR"
                className="flex-1 border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
              />
              <button
                onClick={() => saveTracking(detail.id)}
                disabled={trackingSaving}
                className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {trackingSaving ? "…" : detail.tracking_number ? "Mettre à jour" : "Enregistrer"}
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">Ce numéro sera visible par le client dans son espace « Suivre ma commande ».</p>
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
                    <p className="text-xs text-neutral-400">
                      Qté: {item.qty}
                      {item.color ? ` · Couleur: ${item.color}` : ""}
                      {item.size ? ` · Taille: ${item.size}` : ""}
                    </p>
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

          {/* Contact client */}
          {(() => {
            const name = detail.customer?.name ?? "";
            const phone = (detail.customer?.phone ?? "").replace(/\s+/g, "");
            const email = detail.customer?.email ?? "";
            const num = detail.order_number;
            const statusLabel = STATUS_OPTIONS.find((s) => s.value === detail.status)?.label ?? detail.status;
            const tracking = detail.tracking_number ?? "";

            const waConfirm = encodeURIComponent(
              `Bonjour ${name},\n\nVotre commande *#${num}* chez L'ECOMAX a bien ete *confirmee* !\n\nNous preparons votre colis et vous tiendrons informe(e) de l'expedition.\n\nMerci pour votre confiance !\nL'equipe L'ECOMAX`
            );
            const waShipped = encodeURIComponent(
              `Bonjour ${name},\n\nVotre commande *#${num}* a ete *expediee* !${tracking ? `\n\nNumero de suivi : *${tracking}*` : ""}\n\nElle sera livree dans les prochains jours.\n\nMerci de votre confiance !\nL'equipe L'ECOMAX`
            );
            const waDelivered = encodeURIComponent(
              `Bonjour ${name},\n\nNous esperons que vous avez bien recu votre commande *#${num}*.\n\nN'hesitez pas a nous contacter si vous avez des questions.\n\nMerci et a bientot !\nL'equipe L'ECOMAX`
            );

            const mailSubjectConfirm = encodeURIComponent(`Confirmation de votre commande #${num} — L'ECOMAX`);
            const mailBodyConfirm = encodeURIComponent(
              `Bonjour ${name},\n\nVotre commande #${num} a bien été confirmée.\n\nNous préparons votre colis et vous tiendrons informé(e) de l'expédition.\n\nMerci pour votre confiance !\n\nL'équipe L'ECOMAX`
            );
            const mailSubjectShipped = encodeURIComponent(`Votre commande #${num} a été expédiée — L'ECOMAX`);
            const mailBodyShipped = encodeURIComponent(
              `Bonjour ${name},\n\nVotre commande #${num} est en route 🚚${tracking ? `\n\nNuméro de suivi : ${tracking}` : ""}\n\nElle sera livrée dans les prochains jours.\n\nMerci et à bientôt !\n\nL'équipe L'ECOMAX`
            );

            const waBase = phone ? `https://wa.me/${phone.startsWith("0") ? "212" + phone.slice(1) : phone}` : null;

            return (
              <div className="bg-white rounded-2xl border border-neutral-100 p-5">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-4">Contacter le client</p>

                {/* WhatsApp */}
                {waBase && (
                  <div className="mb-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2">WhatsApp</p>
                    <div className="flex flex-wrap gap-2">
                      <a href={`${waBase}?text=${waConfirm}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.126 1.527 5.862L.057 23.885l6.162-1.616A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.366l-.359-.213-3.72.976.993-3.628-.234-.373A9.818 9.818 0 1112 21.818z"/></svg>
                        Commande confirmée
                      </a>
                      <a href={`${waBase}?text=${waShipped}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.126 1.527 5.862L.057 23.885l6.162-1.616A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.366l-.359-.213-3.72.976.993-3.628-.234-.373A9.818 9.818 0 1112 21.818z"/></svg>
                        Commande expédiée
                      </a>
                      <a href={`${waBase}?text=${waDelivered}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.126 1.527 5.862L.057 23.885l6.162-1.616A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.366l-.359-.213-3.72.976.993-3.628-.234-.373A9.818 9.818 0 1112 21.818z"/></svg>
                        Commande livrée
                      </a>
                    </div>
                  </div>
                )}
                {!waBase && (
                  <p className="text-xs text-neutral-400 mb-4">Aucun numéro de téléphone disponible pour WhatsApp.</p>
                )}

                {/* Email */}
                {email && (
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Email</p>
                    <div className="flex flex-wrap gap-2">
                      <a href={`mailto:${email}?subject=${mailSubjectConfirm}&body=${mailBodyConfirm}`}
                        className="flex items-center gap-1.5 px-3 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-colors">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        Confirmation
                      </a>
                      <a href={`mailto:${email}?subject=${mailSubjectShipped}&body=${mailBodyShipped}`}
                        className="flex items-center gap-1.5 px-3 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-colors">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        Expédition
                      </a>
                    </div>
                  </div>
                )}
                {!email && (
                  <p className="text-xs text-neutral-400">Aucune adresse email disponible.</p>
                )}
              </div>
            );
          })()}
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
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-xl text-sm font-semibold hover:border-black transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Exporter CSV
        </button>
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

      {loadError && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
          Erreur Supabase : {loadError}
        </div>
      )}

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
                  <th className="px-5 py-3 w-10">
                    <input type="checkbox" checked={filtered.length > 0 && selected.size === filtered.length} onChange={toggleAll}
                      className="rounded border-neutral-300 cursor-pointer" />
                  </th>
                  <th className="text-left px-2 py-3">Client</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Commande</th>
                  <th className="text-right px-4 py-3">Total</th>
                  <th className="text-center px-4 py-3">Statut</th>
                  <th className="text-right px-4 py-3 hidden md:table-cell">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {filtered.map((o) => (
                  <tr key={o.id} className={`hover:bg-neutral-50 ${selected.has(o.id) ? "bg-blue-50/40" : ""}`}>
                    <td className="px-5 py-3">
                      <input type="checkbox" checked={selected.has(o.id)} onChange={() => toggleSelect(o.id)}
                        className="rounded border-neutral-300 cursor-pointer" />
                    </td>
                    <td className="px-2 py-3">
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

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 lg:left-[calc(50%+8rem)] -translate-x-1/2 z-50 flex items-center gap-2 bg-neutral-900 text-white pl-4 pr-3 py-2.5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-white/10 backdrop-blur-sm max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-18rem)]" style={{minWidth:0}}>
          {/* Badge */}
          <div className="flex items-center gap-2 pr-3 border-r border-white/15 shrink-0">
            <div className="w-5 h-5 rounded-full bg-white text-black text-[10px] font-black flex items-center justify-center flex-shrink-0">
              {selected.size}
            </div>
            <span className="text-sm font-semibold text-white/80 whitespace-nowrap">
              sélectionnée{selected.size > 1 ? "s" : ""}
            </span>
          </div>

          {/* Status buttons – scrollable on small screens */}
          <div className="flex items-center gap-1 px-1 overflow-x-auto no-scrollbar min-w-0">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s.value}
                onClick={() => setBulkStatus(bulkStatus === s.value ? "" : s.value)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap transition-all shrink-0 ${
                  bulkStatus === s.value
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-white/15 mx-1 shrink-0" />

          {/* Apply */}
          <button
            onClick={applyBulkStatus}
            disabled={!bulkStatus || bulkUpdating}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-black text-sm font-black rounded-xl hover:bg-neutral-100 transition-colors disabled:opacity-30 whitespace-nowrap shrink-0"
          >
            {bulkUpdating ? (
              <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity=".3"/><path d="M21 12a9 9 0 00-9-9"/></svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            )}
            Appliquer
          </button>

          {/* Dismiss */}
          <button
            onClick={() => { setSelected(new Set()); setBulkStatus(""); }}
            className="ml-1 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            title="Annuler la sélection"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
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
