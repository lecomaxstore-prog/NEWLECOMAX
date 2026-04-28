"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilPage() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const meta = session.user.user_metadata;
        setEmail(session.user.email ?? "");
        setPrenom(meta?.prenom || (meta?.full_name || meta?.name || "").split(" ")[0] || "");
        setNom(meta?.nom || (meta?.full_name || meta?.name || "").split(" ").slice(1).join(" ") || "");
        setPhone(meta?.phone || "");
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    setError("");
    const { error } = await supabase.auth.updateUser({
      data: {
        prenom,
        nom,
        full_name: `${prenom} ${nom}`.trim(),
        phone,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-neutral-400 mb-1">Mon compte</p>
        <h1 className="font-black text-[26px] uppercase tracking-tight">Mon profil</h1>
      </div>

      {/* Form card */}
      <div className="bg-white border border-neutral-100">
        <div className="px-6 py-5 border-b border-neutral-100">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mb-0.5">Informations</p>
          <h2 className="font-black text-[14px] uppercase tracking-wide">Informations personnelles</h2>
        </div>

        <form onSubmit={handleSave} className="p-6 flex flex-col gap-5">

          {error && (
            <div className="px-4 py-3 border border-red-200 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}
          {saved && (
            <div className="px-4 py-3 border border-green-200 bg-green-50 text-green-700 text-[12px] font-bold uppercase tracking-widest flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              Modifications enregistrées
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">Prénom</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Karim"
                className="w-full border border-neutral-200 px-4 py-3 text-sm placeholder-neutral-400 outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Alaoui"
                className="w-full border border-neutral-200 px-4 py-3 text-sm placeholder-neutral-400 outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">Adresse email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full border border-neutral-100 bg-neutral-50 px-4 py-3 text-sm text-neutral-400 cursor-not-allowed"
            />
            <p className="text-[11px] text-neutral-400">L&apos;adresse email ne peut pas être modifiée ici.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">Téléphone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+212 6XX XXX XXX"
              className="w-full border border-neutral-200 px-4 py-3 text-sm placeholder-neutral-400 outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white font-black text-[11px] uppercase tracking-widest px-8 py-3.5 hover:bg-neutral-800 active:bg-neutral-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>

      {/* Change password */}
      <div className="bg-white border border-neutral-100">
        <div className="px-6 py-5 border-b border-neutral-100">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mb-0.5">Sécurité</p>
          <h2 className="font-black text-[14px] uppercase tracking-wide">Mot de passe</h2>
        </div>
        <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[12px] text-neutral-500 leading-relaxed max-w-md">
            Pour modifier votre mot de passe, nous vous enverrons un lien de réinitialisation à votre adresse email.
          </p>
          <ChangePasswordButton email={email} />
        </div>
      </div>

      {/* Danger zone */}
      <div className="border border-red-100 bg-white">
        <div className="px-6 py-5 border-b border-red-100">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-400 mb-0.5">Zone sensible</p>
          <h2 className="font-black text-[14px] uppercase tracking-wide text-red-700">Supprimer mon compte</h2>
        </div>
        <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[12px] text-neutral-500 leading-relaxed max-w-md">
            La suppression de votre compte est irréversible. Toutes vos données seront définitivement effacées.
          </p>
          <button
            type="button"
            className="text-[11px] font-black uppercase tracking-widest px-6 py-3 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            Supprimer mon compte
          </button>
        </div>
      </div>

    </div>
  );
}

function ChangePasswordButton({ email }: { email: string }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) return;
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/compte/profil`,
    });
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <p className="text-[11px] font-bold uppercase tracking-widest text-green-600 whitespace-nowrap">
        ✓ Email envoyé
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={handleReset}
      disabled={loading}
      className="text-[11px] font-black uppercase tracking-widest px-6 py-3 border border-neutral-200 text-black hover:bg-black hover:text-white hover:border-black transition-colors whitespace-nowrap self-start sm:self-auto disabled:opacity-50"
    >
      {loading ? "Envoi…" : "Modifier le mot de passe"}
    </button>
  );
}
