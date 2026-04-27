"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase, type Product } from "@/lib/supabase";

const CATEGORIES = ["homme", "femme", "chaussures", "accessoires"];

const emptyForm = {
  slug: "", name: "", category: "homme", price: "", original_price: "",
  description: "", stock: "0", active: true,
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get("id");
  const isNew = searchParams.get("new") === "1";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...emptyForm });
  const [images, setImages] = useState<string[]>(["$"]);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const showForm = isNew || !!editId;

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts((data as Product[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (editId) {
      const p = products.find((x) => x.id === editId);
      if (p) {
        setForm({
          slug: p.slug, name: p.name, category: p.category,
          price: String(p.price), original_price: p.original_price ? String(p.original_price) : "",
          description: p.description ?? "",
          stock: String(p.stock), active: p.active,
        });
        setImages(p.images?.length ? p.images : [""]);
      }
    } else if (isNew) {
      setForm({ ...emptyForm });
      setImages([""]);
    }
  }, [editId, isNew, products]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    const payload = {
      slug: form.slug.trim().toLowerCase().replace(/\s+/g, "-"),
      name: form.name.trim(),
      category: form.category,
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      description: form.description.trim() || null,
      images: images.map((s) => s.trim()).filter(Boolean),
      stock: parseInt(form.stock) || 0,
      active: form.active,
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from("products").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }

    setSaving(false);
    if (error) {
      setMsg({ type: "err", text: error.message });
    } else {
      setMsg({ type: "ok", text: editId ? "Produit mis à jour ✓" : "Produit créé ✓" });
      load();
      setTimeout(() => router.replace("/admin/products"), 1000);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce produit ?")) return;
    await supabase.from("products").delete().eq("id", id);
    load();
  }

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase())
  );

  if (showForm) {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.replace("/admin/products")} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="text-xl font-black">{editId ? "Modifier le produit" : "Nouveau produit"}</h1>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nom *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Slug *" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="ex: veste-sport" required />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">Catégorie *</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Prix (MAD) *" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} required />
            <Field label="Ancien prix" type="number" value={form.original_price} onChange={(v) => setForm({ ...form, original_price: v })} />
            <Field label="Stock" type="number" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
              className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black resize-none" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider">Images</label>
              <span className="text-xs text-neutral-400">{images.filter(s => s.trim()).length} image(s)</span>
            </div>
            <div className="space-y-2">
              {images.map((url, i) => (
                <div key={i} className="flex gap-2 items-start">
                  {/* Thumbnail preview */}
                  <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-neutral-100 overflow-hidden border border-neutral-200">
                    {url.trim() ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={url.trim()} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-300">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                    )}
                  </div>
                  <input
                    value={url}
                    onChange={(e) => {
                      const next = [...images];
                      next[i] = e.target.value;
                      setImages(next);
                    }}
                    placeholder={`URL image ${i + 1}…`}
                    className="flex-1 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-black font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, j) => j !== i))}
                    disabled={images.length === 1}
                    className="p-2.5 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setImages([...images, ""])}
              className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-neutral-200 rounded-xl text-sm text-neutral-400 hover:border-black hover:text-black transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Ajouter une image
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div onClick={() => setForm({ ...form, active: !form.active })}
              className={`w-10 h-6 rounded-full transition-colors ${form.active ? "bg-black" : "bg-neutral-200"} relative`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.active ? "translate-x-5" : "translate-x-1"}`} />
            </div>
            <span className="text-sm font-medium">Produit actif</span>
          </label>

          {msg && (
            <div className={`text-sm px-4 py-3 rounded-xl ${msg.type === "ok" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {msg.text}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="flex-1 bg-black text-white font-bold py-3 rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {saving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Enregistrement…</> : "Enregistrer"}
            </button>
            <button type="button" onClick={() => router.replace("/admin/products")}
              className="px-6 py-3 border border-neutral-200 rounded-xl text-sm font-medium hover:border-black transition-colors">
              Annuler
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Produits</h1>
          <p className="text-neutral-500 text-sm mt-0.5">{products.length} produit{products.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => router.replace("/admin/products?new=1")}
          className="bg-black text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Ajouter
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un produit…"
          className="w-full border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-black" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center text-neutral-400 text-sm">Aucun produit trouvé.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 text-xs text-neutral-400 uppercase tracking-wide">
                  <th className="text-left px-5 py-3">Produit</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Catégorie</th>
                  <th className="text-right px-4 py-3">Prix</th>
                  <th className="text-right px-4 py-3 hidden md:table-cell">Stock</th>
                  <th className="text-center px-4 py-3 hidden md:table-cell">Statut</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {p.images?.[0] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.images[0]} alt={p.name} className="w-9 h-9 object-cover rounded-lg bg-neutral-100 flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-semibold">{p.name}</p>
                          <p className="text-neutral-400 text-xs">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell capitalize text-neutral-500">{p.category}</td>
                    <td className="px-4 py-3 text-right font-bold">{p.price} MAD</td>
                    <td className="px-4 py-3 text-right hidden md:table-cell text-neutral-500">{p.stock}</td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${p.active ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-500"}`}>
                        {p.active ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => router.replace(`/admin/products?id=${p.id}`)}
                          className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button onClick={() => handleDelete(p.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                        </button>
                      </div>
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

function Field({ label, value, onChange, type = "text", placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black" />
    </div>
  );
}
