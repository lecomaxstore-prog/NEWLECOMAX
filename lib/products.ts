export type Product = {
  slug: string;
  name: string;
  category: "homme" | "femme" | "chaussures" | "accessoires";
  subCategory: string;
  price: number;
  oldPrice?: number;
  colors: string[];
  sizes: string[];
  image: string;
  gallery: string[];
  badge?: "Nouveau" | "Exclu membre" | "Promo" | "Bestseller";
  description: string;
  descriptionImage?: string;
  colorImages?: Record<string, string>;
  colorSizes?: Record<string, string[]>;
  video?: string;
};

const img = (seed: string, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

const make = (
  slug: string,
  name: string,
  category: Product["category"],
  subCategory: string,
  price: number,
  opts: Partial<Product> = {}
): Product => ({
  slug,
  name,
  category,
  subCategory,
  price,
  colors: ["Noir", "Blanc"],
  sizes: category === "accessoires"
    ? ["Taille unique"]
    : category === "chaussures"
    ? ["38", "39", "40", "41", "42", "43", "44", "45"]
    : ["S", "M", "L", "XL", "XXL"],
  image: img(slug),
  gallery: [img(slug + "-a"), img(slug + "-b"), img(slug + "-c"), img(slug + "-d")],
  description:
    "Qualite premium, finitions soignees et confort au quotidien. Concu pour durer et s'adapter a votre style.",
  ...opts,
});

/* ─────────────────────────────── HOMME ─────────────────────────── */
const homme: Product[] = [
  make("h-bomber-urban", "Veste Bomber Urban", "homme", "Vestes", 549, { badge: "Bestseller", colors: ["Noir", "Kaki", "Bordeaux"] }),
  make("h-coupe-vent", "Veste Coupe-Vent Running", "homme", "Vestes", 699, { badge: "Nouveau", colors: ["Noir", "Bleu marine", "Gris"] }),
  make("h-doudoune-hiver", "Doudoune Legere Hiver", "homme", "Vestes", 849, { badge: "Nouveau", colors: ["Noir", "Gris anthracite"] }),
  make("h-hoodie-oversize", "Hoodie Oversize Premium", "homme", "Sweats", 449, { badge: "Bestseller", colors: ["Gris chine", "Noir", "Blanc casse"] }),
  make("h-veste-zip-tech", "Veste Zippee Tech Fleece", "homme", "Vestes", 599, { oldPrice: 749, badge: "Promo", colors: ["Noir", "Gris fonce"] }),
  make("h-bomber-satin", "Bomber Satin Edition", "homme", "Vestes", 799, { badge: "Nouveau", colors: ["Noir", "Champagne"] }),
  make("h-sweat-zip", "Sweat Capuche Quarter-Zip", "homme", "Sweats", 399, { colors: ["Gris chine", "Noir", "Navy"] }),
  make("h-softshell", "Veste Softshell Sport", "homme", "Vestes", 649, { badge: "Bestseller", colors: ["Noir", "Vert militaire"] }),
];

/* ─────────────────────────────── FEMME ─────────────────────────── */
const femme: Product[] = [
  make("f-bomber-femme", "Veste Bomber Femme", "femme", "Vestes", 499, { badge: "Bestseller", colors: ["Noir", "Rose poudre", "Beige"] }),
  make("f-coupe-vent-femme", "Veste Coupe-Vent Legere", "femme", "Vestes", 599, { badge: "Nouveau", colors: ["Noir", "Bleu ciel", "Rose"] }),
  make("f-doudoune-femme", "Doudoune Ultra-Legere Femme", "femme", "Vestes", 749, { badge: "Nouveau", colors: ["Noir", "Blanc", "Caramel"] }),
  make("f-hoodie-cropped", "Hoodie Cropped Premium", "femme", "Sweats", 399, { oldPrice: 499, badge: "Promo", colors: ["Gris chine", "Noir", "Lilas"] }),
  make("f-veste-zip-femme", "Veste Zippee Tech Femme", "femme", "Vestes", 549, { colors: ["Noir", "Blanc"] }),
  make("f-bomber-special", "Bomber Edition Speciale", "femme", "Vestes", 649, { badge: "Bestseller", colors: ["Noir", "Vert sauge", "Rose poudre"] }),
];

/* ─────────────────────────── CHAUSSURES ────────────────────────── */
const chaussures: Product[] = [
  make("c-baasploa-course-homme", "Baasploa Baskets de Course Respirantes Homme", "chaussures", "Running", 249, {
    oldPrice: 349,
    badge: "Nouveau",
    colors: ["Jaune", "Bleu", "Gris"],
    image: "/images/products/BAASPLOA%20Men's%20Lightweight%20Running%20Sneakers/Yellow.avif",
    gallery: [
      "/images/products/BAASPLOA%20Men's%20Lightweight%20Running%20Sneakers/Blue.avif",
      "/images/products/BAASPLOA%20Men's%20Lightweight%20Running%20Sneakers/grey.avif",
    ],
    descriptionImage: "/images/products/BAASPLOA%20Men's%20Lightweight%20Running%20Sneakers/discption%20yellow%20and%20blue%20%20image.avif",
    colorImages: {
      "Jaune": "/images/products/BAASPLOA%20Men's%20Lightweight%20Running%20Sneakers/Yellow.avif",
      "Bleu":  "/images/products/BAASPLOA%20Men's%20Lightweight%20Running%20Sneakers/Blue.avif",
      "Gris":  "/images/products/BAASPLOA%20Men's%20Lightweight%20Running%20Sneakers/grey.avif",
    },
    colorSizes: {
      "Jaune": ["45"],
      "Bleu":  ["44"],
      "Gris":  ["44"],
    },
    video: "https://goods-vod.kwcdn.com/goods-video/ee9eeea66a636eb7c84ad443fc2f90558be85d05.f30.mp4",
    description: "Chaussures de marche décontractées et respirantes pour hommes. Baskets tendance ultra-légères, idéales pour la course, la marche et le tennis au quotidien. Semelle souple et aérée pour un confort toute la journée.",
  }),
  make("c-running-boost-x1", "Running Boost Pro X1", "chaussures", "Running", 899, { badge: "Bestseller", oldPrice: 1099 }),
  make("c-running-leger-v2", "Running Leger V2", "chaussures", "Running", 799, { badge: "Nouveau" }),
  make("c-sneaker-urban", "Sneaker Urban Classic", "chaussures", "Lifestyle", 749, { badge: "Bestseller" }),
  make("c-trail-sport", "Trail Sport GTX", "chaussures", "Running", 1099, { badge: "Nouveau" }),
  make("c-running-confort", "Running Confort Plus", "chaussures", "Running", 649, { oldPrice: 849, badge: "Promo" }),
  make("c-sneaker-street", "Sneaker Street Edition", "chaussures", "Lifestyle", 849),
  make("c-running-daily", "Running Daily Trainer", "chaussures", "Running", 749, { badge: "Bestseller" }),
  make("c-basket-cuir", "Basket Cuir Premium", "chaussures", "Lifestyle", 999, { badge: "Nouveau" }),
  make("c-sneaker-low", "Sneaker Low Urban", "chaussures", "Lifestyle", 599, { oldPrice: 749, badge: "Promo" }),
  make("c-running-elite", "Running Performance Elite", "chaussures", "Running", 1299, { badge: "Nouveau" }),
];

/* ────────────────────────── ACCESSOIRES ────────────────────────── */
const accessoires: Product[] = [
  make("a-manette-pro", "Manette Gaming Sans Fil Pro", "accessoires", "Gaming", 799, { badge: "Bestseller", sizes: ["Taille unique"] }),
  make("a-manette-rgb", "Manette Gaming RGB Edition", "accessoires", "Gaming", 699, { badge: "Nouveau", sizes: ["Taille unique"] }),
  make("a-manette-filaire", "Manette Filaire Gaming", "accessoires", "Gaming", 399, { oldPrice: 499, badge: "Promo", sizes: ["Taille unique"] }),
  make("a-ecouteurs-tws-pro", "Ecouteurs TWS Pro", "accessoires", "Audio", 899, { badge: "Bestseller", sizes: ["Taille unique"] }),
  make("a-ecouteurs-tws-lite", "Ecouteurs TWS Lite", "accessoires", "Audio", 499, { badge: "Nouveau", sizes: ["Taille unique"] }),
  make("a-casque-bluetooth", "Casque Bluetooth Over-Ear", "accessoires", "Audio", 1299, { badge: "Nouveau", sizes: ["Taille unique"] }),
  make("a-ecouteurs-sport", "Ecouteurs Sport Etanches", "accessoires", "Audio", 649, { oldPrice: 799, badge: "Promo", sizes: ["Taille unique"] }),
  make("a-sac-urban-25l", "Sac a dos Urban 25L", "accessoires", "Sacs", 549, { badge: "Bestseller", sizes: ["Taille unique"] }),
  make("a-sac-sport-20l", "Sac a dos Sport 20L", "accessoires", "Sacs", 449, { badge: "Nouveau", sizes: ["Taille unique"] }),
  make("a-sac-laptop-30l", "Sac a dos Laptop 30L", "accessoires", "Sacs", 699, { badge: "Bestseller", sizes: ["Taille unique"] }),
  make("a-mini-sac", "Mini Sac a dos Casual", "accessoires", "Sacs", 299, { oldPrice: 399, badge: "Promo", sizes: ["Taille unique"] }),
  make("a-cable-usb-c", "Cable USB-C Tresse 2m", "accessoires", "Tech", 89, { badge: "Bestseller", sizes: ["Taille unique"] }),
  make("a-chargeur-65w", "Chargeur Rapide 65W", "accessoires", "Tech", 199, { badge: "Nouveau", sizes: ["Taille unique"] }),
  make("a-support-tel", "Support Telephone Moto/Velo", "accessoires", "Tech", 149, { sizes: ["Taille unique"] }),
];

export const products: Product[] = [
  ...homme,
  ...femme,
  ...chaussures,
  ...accessoires,
];

/* ─── Category metadata ─── */
export const categories = [
  {
    slug: "homme",
    label: "Homme",
    hero: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1920&q=80",
    description: "Vestes, bombers, sweats et hoodies pour hommes. Du casual au sport.",
  },
  {
    slug: "femme",
    label: "Femme",
    hero: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1920&q=80",
    description: "Vestes, bombers et hoodies pour femmes. Style et confort au quotidien.",
  },
  {
    slug: "chaussures",
    label: "Chaussures",
    hero: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1920&q=80",
    description: "Running, trail et lifestyle — la chaussure parfaite pour chaque usage.",
  },
  {
    slug: "accessoires",
    label: "Accessoires",
    hero: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=80",
    description: "Manettes gaming, ecouteurs, sacs a dos et accessoires tech.",
  },
] as const;

/* ─── Helpers ─── */
export type CategorySlug = (typeof categories)[number]["slug"];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productsByCategory = (cat: string) =>
  products.filter((p) => p.category === cat);

export const subCategoriesFor = (cat: string): string[] => {
  const subs = [...new Set(products.filter((p) => p.category === cat).map((p) => p.subCategory))];
  return subs;
};

export const featured = products.filter(
  (p) => p.badge === "Nouveau" || p.badge === "Bestseller"
);

export const formatMAD = (n: number) =>
  new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(n);
