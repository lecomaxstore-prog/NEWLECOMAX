import Image from "next/image";
import Link from "next/link";
import { formatMAD, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const onSale = product.oldPrice && product.oldPrice > product.price;
  const discount = onSale
    ? Math.round((1 - product.price / product.oldPrice!) * 100)
    : 0;

  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group block bg-white"
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] bg-neutral-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        />

        {/* Subtle dark vignette on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && (
            <span
              className={`text-[10px] font-black uppercase px-2.5 py-[5px] tracking-[0.12em] leading-none ${
                product.badge === "Promo"
                  ? "bg-red-600 text-white"
                  : product.badge === "Nouveau"
                  ? "bg-black text-white"
                  : product.badge === "Bestseller"
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-black shadow-sm"
              }`}
            >
              {product.badge}
            </span>
          )}
          {onSale && (
            <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-[5px] tracking-[0.12em] leading-none">
              −{discount}%
            </span>
          )}
        </div>

        {/* Quick-view hover bar */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] py-3 text-center flex items-center justify-center gap-2">
          Voir le produit
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3.5 pb-5">
        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-[5px] mb-2.5">
            {product.colors.slice(0, 5).map((c, i) => (
              <span
                key={i}
                className="w-[9px] h-[9px] rounded-full ring-1 ring-neutral-200 ring-offset-1 bg-neutral-400 shrink-0"
                title={c}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-neutral-400 ml-0.5 font-medium">+{product.colors.length - 5}</span>
            )}
          </div>
        )}

        <h3 className="font-bold text-[13.5px] leading-snug line-clamp-2 text-black group-hover:text-neutral-600 transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-neutral-400 text-[11.5px] mt-0.5 uppercase tracking-wide font-medium">{product.subCategory}</p>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-2.5">
          <span className={`font-black text-[14.5px] ${onSale ? "text-red-600" : "text-black"}`}>
            {formatMAD(product.price)}
          </span>
          {onSale && (
            <span className="text-neutral-400 line-through text-[12.5px]">
              {formatMAD(product.oldPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
