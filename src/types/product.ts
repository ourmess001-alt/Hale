export type ProductCategory = "all" | "outerwear" | "shirts" | "knitwear";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL";

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface ProductSpecs {
  material: string;
  fit: string;
  sizes: string;
  origin?: string;
  care?: string;
  season?: string;
  weight?: string;
}

export interface Product {
  id: string;
  index: number; // 1 to 8
  slug: string;
  name: string;
  colorway: string; // e.g. "in Black"
  category: "outerwear" | "shirts" | "knitwear";
  price: number;
  description: string;
  shortFabricNote: string;
  specs: ProductSpecs;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: {
    front: string;
    back: string;
    model: string;
  };
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  colorway: string;
  colorName: string;
  size: ProductSize;
  price: number;
  image: string;
  quantity: number;
}

export interface ThemeConfig {
  storeName: string;
  subTitle: string;
  backgroundTone: "alabaster" | "bone" | "concrete" | "sand" | "dark";
  showLookbook: boolean;
  showPhilosophy: boolean;
  railPhysics: "silky" | "snappy" | "floating";
  serifHeading: boolean;
}
