import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    index: 1,
    slug: "bomber-black",
    name: "Bomber",
    colorway: "in Black",
    category: "outerwear",
    price: 210,
    description:
      "A quiet bomber in a matte recycled nylon, lightly padded for transitional warmth. Engineered with a smooth two-way metal zip, concealed interior zip pocket, and dense ribbed wool cuffs.",
    shortFabricNote:
      "A quiet bomber in a matte recycled nylon, lightly padded. Two-way zip and a hidden inside pocket.",
    specs: {
      material: "Recycled nylon, lightly padded",
      fit: "Classic, ribbed cuffs & hem",
      sizes: "XS / S / M / L / XL",
      origin: "Porto, Portugal",
      care: "Dry clean only or delicate cold cycle",
      season: "Autumn / Winter 26",
      weight: "480 gsm shell + 80 gsm insulation",
    },
    colors: [
      { name: "Black", hex: "#18181A", inStock: true },
      { name: "Charcoal", hex: "#2B2C30", inStock: true },
      { name: "Olive", hex: "#454D3B", inStock: false },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      front: "/products/bomber-black-front.png",
      back: "/products/bomber-black-back.png",
      model: "/lookbook/model-look-1.png",
    },
    inStock: true,
    featured: true,
  },
  {
    id: "prod-2",
    index: 2,
    slug: "shirt-jacket-rust",
    name: "Shirt Jacket",
    colorway: "in Rust",
    category: "outerwear",
    price: 160,
    description:
      "Cut from an 8-wale Italian corduroy with a velvety tactile hand. Designed with a boxy structured drape, dual gusseted chest flap pockets, and genuine matte horn buttons.",
    shortFabricNote:
      "Heavy 8-wale Italian corduroy with a structured drape. Dual flap chest pockets and horn buttons.",
    specs: {
      material: "100% Organic cotton corduroy (8-wale)",
      fit: "Boxy overshirt silhouette",
      sizes: "XS / S / M / L / XL",
      origin: "Biella, Italy",
      care: "Machine wash cold inside out, hang dry",
      season: "Autumn / Winter 26",
      weight: "360 gsm heavy corduroy",
    },
    colors: [
      { name: "Rust", hex: "#B4532A", inStock: true },
      { name: "Sand", hex: "#B8A892", inStock: true },
      { name: "Charcoal", hex: "#2B2C30", inStock: true },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      front: "/products/shirt-jacket-rust-front.png",
      back: "/products/shirt-jacket-rust-back.png",
      model: "/lookbook/model-look-2.png",
    },
    inStock: true,
    featured: true,
  },
  {
    id: "prod-3",
    index: 3,
    slug: "cable-knit-navy",
    name: "Cable Knit",
    colorway: "in Navy",
    category: "knitwear",
    price: 175,
    description:
      "Spun from 100% ultrafine extra-soft Merino wool. Features a heritage Aran cable braid architecture with substantial 5-gauge stitch relief, snug tubular neck rib, and zero itch.",
    shortFabricNote:
      "100% Merino wool with heritage Aran cable relief. Substantial 5-gauge knit with zero itch.",
    specs: {
      material: "100% Ultrafine Merino wool",
      fit: "Relaxed drop-shoulder crew",
      sizes: "XS / S / M / L / XL",
      origin: "Hawick, Scotland",
      care: "Hand wash cold, dry flat in shade",
      season: "Autumn / Winter 26",
      weight: "620 gsm 5-gauge yarn",
    },
    colors: [
      { name: "Navy", hex: "#1E2B3D", inStock: true },
      { name: "Ecru", hex: "#DDD7C9", inStock: true },
      { name: "Charcoal", hex: "#2B2C30", inStock: true },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      front: "/products/cable-knit-navy-front.png",
      back: "/products/cable-knit-navy-back.png",
      model: "/lookbook/model-look-3.png",
    },
    inStock: true,
    featured: true,
  },
  {
    id: "prod-4",
    index: 4,
    slug: "overcoat-charcoal",
    name: "Overcoat",
    colorway: "in Charcoal",
    category: "outerwear",
    price: 340,
    description:
      "An unlined double-faced virgin wool melton tailored for effortless fluidity. Features sharp peaked lapels, double-breasted 6-button stance, deep welt pockets, and a clean center back vent.",
    shortFabricNote:
      "Double-faced virgin wool melton with unlined fluidity. Peaked lapels and deep hand welts.",
    specs: {
      material: "90% Virgin wool, 10% Cashmere",
      fit: "Tailored longline, knee length",
      sizes: "XS / S / M / L / XL",
      origin: "Florence, Italy",
      care: "Specialist dry clean only",
      season: "Autumn / Winter 26",
      weight: "720 gsm double-faced melton",
    },
    colors: [
      { name: "Charcoal", hex: "#2B2C30", inStock: true },
      { name: "Black", hex: "#18181A", inStock: true },
      { name: "Camel", hex: "#B8A892", inStock: true },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      front: "/products/overcoat-charcoal-front.png",
      back: "/products/overcoat-charcoal-back.png",
      model: "/lookbook/model-look-4.png",
    },
    inStock: true,
    featured: true,
  },
  {
    id: "prod-5",
    index: 5,
    slug: "chore-jacket-olive",
    name: "Chore Jacket",
    colorway: "in Olive",
    category: "outerwear",
    price: 185,
    description:
      "Constructed from 12oz garment-dyed duck canvas with broken-in softness from day one. Triple-needle stitched seams, three utilitarian patch pockets, and solid brass shank hardware.",
    shortFabricNote:
      "12oz garment-dyed duck canvas. Triple-needle chain stitching with 3 patch pockets.",
    specs: {
      material: "12oz 100% Cotton washed duck canvas",
      fit: "Straight utilitarian work fit",
      sizes: "XS / S / M / L / XL",
      origin: "Guimarães, Portugal",
      care: "Machine wash cold with like colors, air dry",
      season: "Four-season wardrobe",
      weight: "410 gsm heavy canvas",
    },
    colors: [
      { name: "Olive", hex: "#454D3B", inStock: true },
      { name: "Sand", hex: "#B8A892", inStock: true },
      { name: "Navy", hex: "#1E2B3D", inStock: true },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      front: "/products/chore-jacket-olive-front.png",
      back: "/products/chore-jacket-olive-back.png",
      model: "/lookbook/model-look-5.png",
    },
    inStock: true,
    featured: false,
  },
  {
    id: "prod-6",
    index: 6,
    slug: "camp-shirt-stone",
    name: "Camp Shirt",
    colorway: "in Stone",
    category: "shirts",
    price: 110,
    description:
      "Stone-washed European flax linen featuring an airy Cuban camp collar. Styled with a straight vented hem, single chest welt, and real iridescent mother-of-pearl buttons.",
    shortFabricNote:
      "Stone-washed linen with a flat camp collar. Wear it to the top or open over a tee.",
    specs: {
      material: "100% French flax linen, stone-washed",
      fit: "Relaxed cuban drape, straight hem",
      sizes: "XS / S / M / L / XL",
      origin: "Normandy, France",
      care: "Gentle cold cycle, tumble dry low or hang dry",
      season: "Spring / Summer / Early Autumn",
      weight: "185 gsm breathable slub linen",
    },
    colors: [
      { name: "Stone", hex: "#8D8B84", inStock: true },
      { name: "Ecru", hex: "#DDD7C9", inStock: true },
      { name: "Black", hex: "#18181A", inStock: true },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      front: "/products/camp-shirt-stone-front.png",
      back: "/products/camp-shirt-stone-back.png",
      model: "/lookbook/model-look-6.png",
    },
    inStock: true,
    featured: false,
  },
  {
    id: "prod-7",
    index: 7,
    slug: "overshirt-sand",
    name: "Overshirt",
    colorway: "in Sand",
    category: "shirts",
    price: 135,
    description:
      "Brushed cotton moleskin twill providing a suede-like exterior texture with comfortable interior slide. Finished with dual inverted box pleat pockets and tonal horn buttons.",
    shortFabricNote:
      "Brushed cotton moleskin twill. Dual chest pockets with curved shirt-tail hem.",
    specs: {
      material: "100% Brushed cotton twill moleskin",
      fit: "Structured overshirt, curved hem",
      sizes: "XS / S / M / L / XL",
      origin: "Osaka, Japan",
      care: "Machine wash gentle 30°C, cool iron",
      season: "Autumn / Winter 26",
      weight: "290 gsm brushed moleskin",
    },
    colors: [
      { name: "Sand", hex: "#B8A892", inStock: true },
      { name: "Rust", hex: "#B4532A", inStock: true },
      { name: "Navy", hex: "#1E2B3D", inStock: true },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      front: "/products/overshirt-sand-front.png",
      back: "/products/overshirt-sand-back.png",
      model: "/lookbook/model-look-7.png",
    },
    inStock: true,
    featured: false,
  },
  {
    id: "prod-8",
    index: 8,
    slug: "heavy-hoodie-ecru",
    name: "Heavy Hoodie",
    colorway: "in Ecru",
    category: "knitwear",
    price: 145,
    description:
      "Crafted from 500gsm unbleached organic loopback French terry. Designed without drawstrings for pure architectural minimalism, boasting a double-lined ergonomic hood and flatlock seams.",
    shortFabricNote:
      "500gsm unbleached organic French terry. Double-layer hood and kangaroo pocket.",
    specs: {
      material: "100% Organic combed cotton French terry",
      fit: "Oversized boxy streetwear drape",
      sizes: "XS / S / M / L / XL",
      origin: "Vancouver, Canada",
      care: "Machine wash cold, lay flat to dry to preserve structure",
      season: "Autumn / Winter 26",
      weight: "500 gsm heavy loopback terry",
    },
    colors: [
      { name: "Ecru", hex: "#DDD7C9", inStock: true },
      { name: "Charcoal", hex: "#2B2C30", inStock: true },
      { name: "Black", hex: "#18181A", inStock: true },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      front: "/products/heavy-hoodie-ecru-front.png",
      back: "/products/heavy-hoodie-ecru-back.png",
      model: "/lookbook/model-look-8.png",
    },
    inStock: true,
    featured: false,
  },
];

export const CATEGORIES = [
  { id: "all", label: "All Pieces", count: 8 },
  { id: "outerwear", label: "Outerwear", count: 4 },
  { id: "shirts", label: "Shirts", count: 2 },
  { id: "knitwear", label: "Knitwear", count: 2 },
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductByIndex(index: number): Product | undefined {
  return PRODUCTS.find((p) => p.index === index);
}
