import { notFound } from "next/navigation";
import Link from "next/link";
import { formatMAD, getProduct, products } from "@/lib/products";
import ProductActions from "@/components/ProductActions";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import { ProductColorProvider } from "@/components/ProductColorContext";
import ProductCarousel from "@/components/ProductCarousel";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/* ── Color name → CSS hex ── */
const colorMap: Record<string, string> = {
  "Noir": "#0a0a0a",
  "Blanc": "#f5f5f5",
  "Blanc casse": "#fafaf5",
  "Gris": "#9ca3af",
  "Gris chine": "#d1d5db",
  "Gris fonce": "#4b5563",
  "Gris anthracite": "#374151",
  "Bleu": "#3b82f6",
  "Bleu marine": "#1e3a5f",
  "Bleu nuit": "#1e2a4a",
  "Bleu ciel": "#7dd3fc",
  "Navy": "#1e3a5f",
  "Rouge": "#dc2626",
  "Bordeaux": "#7c1035",
  "Rose": "#f9a8d4",
  "Rose poudre": "#fcd5ce",
  "Corail": "#fb7185",
  "Vert": "#22c55e",
  "Vert militaire": "#4a5c3a",
  "Vert sauge": "#7c9a6f",
  "Kaki": "#8b7355",
  "Caramel": "#d4a574",
  "Beige": "#f5f0e8",
  "Champagne": "#f7e7ce",
  "Lilas": "#c4b5fd",
  "Mauve": "#a78bfa",
  "Violet": "#8b5cf6",
  "Marine": "#1e3a5f",
};
const getColorHex = (name: string) =>
  colorMap[name.split("/")[0].trim()] ?? "#e5e7eb";

/* ── Dynamic features by product type ── */
function getFeatures(subCategory: string): string[] {
  const sub = subCategory.toLowerCase();
  if (sub === "audio" || sub.includes("couteur") || sub.includes("casque")) {
    return [
      "Connexion Bluetooth 5.3",
      "Autonomie jusqu'à 30h",
      "Réduction de bruit active (ANC)",
      "Charge rapide USB-C",
      "Compatible iOS & Android",
    ];
  }
  if (sub === "gaming" || sub.includes("manette")) {
    return [
      "Connexion sans fil 2.4GHz + Bluetooth",
      "Compatible PC, PS4/PS5, Mobile",
      "Vibrations HD double moteur",
      "Autonomie jusqu'à 20h",
      "Charge USB-C",
    ];
  }
  if (sub === "sacs" || sub.includes("sac")) {
    return [
      "Dos rembourré ergonomique",
      "Port USB intégré",
      "Compartiment laptop 15,6\"",
      "Matière polyester imperméable",
      "Sangles réglables",
    ];
  }
  if (sub === "tech") {
    return ["Compatibilité universelle", "Matériaux certifiés", "Garantie 1 an"];
  }
  if (sub === "running") {
    return [
      "Semelle amorti responsive",
      "Tige en mesh respirant",
      "Système de laçage sécurisé",
      "Grip multisurface",
      "Drop 8mm",
    ];
  }
  if (sub === "lifestyle" || sub.includes("sneaker")) {
    return [
      "Tige en cuir synthétique premium",
      "Semelle en caoutchouc vulcanisé",
      "Doublure textile",
      "Semelle intérieure amovible",
    ];
  }
  if (sub === "vestes" || sub.includes("bomber") || sub.includes("coupe")) {
    return [
      "Coupe regular fit",
      "Fermeture zippée premium",
      "Poches zippées latérales",
      "Matière polyester recyclé",
      "Bandes élastiques aux poignets",
    ];
  }
  if (sub === "sweats" || sub.includes("hoodie")) {
    return [
      "Tissu molleton brosse intérieure",
      "Coupe oversize",
      "Poche kangourou",
      "Cordon de serrage réglable",
      "100% coton bio",
    ];
  }
  return [
    "Qualité premium",
    "Finitions soignées",
    "Matières sélectionnées",
    "Confort durable",
  ];
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const onSale = !!(product.oldPrice && product.oldPrice > product.price);
  const discount = onSale
    ? Math.round((1 - product.price / product.oldPrice!) * 100)
    : undefined;
  const features = getFeatures(product.subCategory);
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);
  const allImages = [product.image, ...product.gallery];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[12px] text-neutral-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
        <span>/</span>
        <Link href={`/${product.category}`} className="hover:text-black transition-colors capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-neutral-600">{product.subCategory}</span>
        <span>/</span>
        <span className="text-black font-medium truncate max-w-[180px]">{product.name}</span>
      </nav>

      <ProductColorProvider defaultColor={product.colors[0] ?? ""}>
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">

        {/* ── Gallery ── */}
        <ProductGallery
          images={allImages}
          name={product.name}
          badge={product.badge}
          discount={discount}
          colors={product.colors}
          colorImages={product.colorImages}
          video={product.video}
        />

        {/* ── Info panel ── */}
        <div className="lg:sticky lg:top-24 self-start">

          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 mb-2">
            {product.subCategory}
          </p>

          <h1 className="h-display text-3xl md:text-[2.2rem] leading-[1.05]">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= 4 ? "#0a0a0a" : "none"} stroke="#0a0a0a" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <span className="text-[12px] text-neutral-500">4.0 · 38 avis</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-5">
            <span className={`text-2xl font-black ${onSale ? "text-red-600" : ""}`}>
              {formatMAD(product.price)}
            </span>
            {onSale && (
              <>
                <span className="text-neutral-400 line-through text-[15px]">
                  {formatMAD(product.oldPrice!)}
                </span>
                <span className="bg-red-600 text-white text-[11px] font-black px-2 py-0.5">
                  -{discount}%
                </span>
              </>
            )}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Taxes incluses · Livraison calculée à la caisse
          </p>

          <div className="w-full h-px bg-neutral-100 my-6" />

          {/* Color selector — hidden when gallery handles it via colorImages */}
          {product.colors.length > 0 && product.colors[0] !== "Taille unique" && !product.colorImages && (
            <div className="mb-6">
              <p className="text-[12px] font-black uppercase tracking-wide mb-3">
                Couleur — <span className="font-normal text-neutral-500">{product.colors[0]}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    title={c}
                    className="w-8 h-8 border-2 border-transparent hover:border-black transition-colors ring-1 ring-neutral-200 first:border-black"
                    style={{ backgroundColor: getColorHex(c) }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size + Add to cart */}
          <ProductActions product={product} />

          <div className="w-full h-px bg-neutral-100 my-6" />

          {/* Delivery badges */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="flex items-start gap-3 border border-neutral-100 p-3.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <div>
                <p className="font-black text-[12px] uppercase">Livraison gratuite</p>
                <p className="text-neutral-400 text-[11px] mt-0.5">Dès 500 MAD</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border border-neutral-100 p-3.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
              </svg>
              <div>
                <p className="font-black text-[12px] uppercase">Retours 30 jours</p>
                <p className="text-neutral-400 text-[11px] mt-0.5">Retours gratuits</p>
              </div>
            </div>
          </div>

          {/* Description + Features */}
          <p className="text-[14px] text-neutral-600 leading-relaxed mb-5">
            {product.description}
          </p>
          <ul className="space-y-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-[13px] text-neutral-700">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {/* Description image */}
          {product.descriptionImage && (
            <div className="mt-6 rounded-lg overflow-hidden border border-neutral-100">
              <img
                src={product.descriptionImage}
                alt={`${product.name} — détail`}
                className="w-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
      </ProductColorProvider>
      <section className="mt-16 border-t border-neutral-100 pt-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="h-display text-2xl md:text-3xl">Avis clients</h2>
            <div className="w-8 h-[3px] bg-black mt-2" />
          </div>
          <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-100 px-4 py-3">
            <div>
              <p className="text-3xl font-black leading-none">4.0</p>
              <div className="flex gap-0.5 mt-1">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= 4 ? "#facc15" : "none"} stroke={s <= 4 ? "#facc15" : "#d4d4d4"} strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">38 avis</p>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { author: "Youssef M.", city: "Casablanca", rating: 5, date: "12 avr. 2026", title: "Excellent produit !", text: "Très bonne qualité, livraison rapide. Je recommande sans hésiter, exactement comme sur les photos. Taille parfaite pour du 44.", color: "Bleu", verified: true },
            { author: "Sara K.", city: "Rabat", rating: 4, date: "8 avr. 2026", title: "Satisfaite de ma commande", text: "Produit conforme à la description. Emballage soigné et livraison en 3 jours. Je repasserai commande sur L'ecomax sans hésiter.", color: "Gris", verified: true },
            { author: "Amine B.", city: "Marrakech", rating: 4, date: "3 avr. 2026", title: "Bon rapport qualité-prix", text: "Bon rapport qualité-prix. La couleur est fidèle aux photos. Livré en 4 jours à Marrakech. Semelle confortable pour la marche.", color: "Jaune", verified: true },
          ].map((r) => (
            <div key={r.author} className="flex flex-col gap-3 p-5 border border-neutral-100 bg-white">
              {/* Top: avatar + name + date */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[13px] font-black flex-shrink-0">
                    {r.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-[13px] leading-tight">{r.author}</p>
                    <p className="text-[11px] text-neutral-400">{r.city}</p>
                  </div>
                </div>
                <span className="text-[11px] text-neutral-400 whitespace-nowrap mt-0.5">{r.date}</span>
              </div>

              {/* Stars + title */}
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= r.rating ? "#facc15" : "none"} stroke={s <= r.rating ? "#facc15" : "#d4d4d4"} strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="font-black text-[13px]">{r.title}</p>
              </div>

              {/* Review text */}
              <p className="text-[13px] text-neutral-600 leading-relaxed flex-1">{r.text}</p>

              {/* Footer: color + verified */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                <span className="text-[11px] text-neutral-400">Couleur : <span className="text-neutral-600 font-medium">{r.color}</span></span>
                {r.verified && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Achat vérifié
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-neutral-100 pt-12">
          <h2 className="h-display text-2xl md:text-3xl mb-2">Vous aimerez aussi</h2>
          <div className="w-8 h-[3px] bg-black mb-8" />
          <ProductCarousel products={related} />
        </section>
      )}
    </div>
  );
}
