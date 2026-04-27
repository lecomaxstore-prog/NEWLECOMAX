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
      <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`text-[10px] font-black uppercase px-2.5 py-1 tracking-wider ${
                product.badge === "Promo"
                  ? "bg-red-600 text-white"
                  : product.badge === "Nouveau"
                  ? "bg-black text-white"
                  : product.badge === "Bestseller"
                  ? "bg-neutral-800 text-white"
                  : "bg-white text-black"
              }`}
            >
              {product.badge}
            </span>
          )}
          {onSale && (
            <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 tracking-wider">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick-view hover overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-black/90 text-white text-[11px] font-bold uppercase tracking-widest py-3 text-center">
          Voir le produit →
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 pb-5">
        {/* Color dots */}
        <div className="flex items-center gap-1 mb-2">
          {product.colors.slice(0, 4).map((c, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full border border-neutral-200 bg-neutral-400"
              title={c}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-neutral-400 ml-1">+{product.colors.length - 4}</span>
          )}
        </div>

        <h3 className="font-bold text-[14px] leading-tight line-clamp-2 group-hover:underline underline-offset-2 transition-all">
          {product.name}
        </h3>
        <p className="text-neutral-500 text-[12px] mt-0.5">{product.subCategory}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className={`font-black text-[15px] ${onSale ? "text-red-600" : "text-black"}`}>
            {formatMAD(product.price)}
          </span>
          {onSale && (
            <span className="text-neutral-400 line-through text-[13px]">
              {formatMAD(product.oldPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
