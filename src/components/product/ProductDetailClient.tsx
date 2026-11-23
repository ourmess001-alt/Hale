"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductSize } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import {
  Check,
  Plus,
  Minus,
  RotateCcw,
  Scissors,
  Truck,
  ArrowRight,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  otherProducts: Product[];
}

export default function ProductDetailClient({
  product,
  otherProducts,
}: ProductDetailClientProps) {
  const [viewSide, setViewSide] = useState<"front" | "back">("front");
  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || "Original"
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "craft" | "care">("specs");

  const imageRef = useRef<HTMLDivElement>(null);
  const { triggerFlyToBag } = useCartStore();

  const currentImage =
    viewSide === "front" ? product.images.front : product.images.back;

  const handleAddToBag = () => {
    let sourceRect = { top: 300, left: 300, width: 220, height: 280 };
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      sourceRect = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      };
    }

    triggerFlyToBag(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        colorway: product.colorway,
        colorName: selectedColor,
        size: selectedSize,
        price: product.price,
        image: currentImage,
        quantity: quantity,
      },
      sourceRect
    );
  };

  return (
    <main className="w-full pt-20 sm:pt-24 pb-28 px-5 sm:px-8 bg-[var(--background)] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation Bar */}
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[var(--muted)] uppercase pb-4 mb-12 sm:mb-16 hairline-b">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
              Rail
            </Link>
            <span>/</span>
            <Link href="/collection" className="hover:text-[var(--foreground)] transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[var(--foreground)] font-medium">
              {product.name} {product.colorway}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[10px] text-[var(--muted)]">
            <span>0{product.index} / 08</span>
            <span>·</span>
            <span>Atelier View</span>
          </div>
        </div>

        {/* Two-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Large Hanger Viewer */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Architectural Suspended Rail Stage for Studio Garment */}
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] flex flex-col items-center">
              {/* Ceiling Suspension Cables (Mounted below the breadcrumb bar with zero overlap) */}
              <div className="absolute -top-8 sm:-top-10 left-[18%] w-[1.5px] h-[41px] sm:h-[49px] bg-gradient-to-b from-[#403E3C] via-[#2A2826] to-[#141312] pointer-events-none z-10 shadow-xs">
                <div className="absolute -top-1 -left-[3px] w-2 h-1.5 bg-[#1C1B1A] rounded-t-xs" />
                <div className="absolute bottom-0 -left-[3px] w-2 h-3 rounded-xs bg-gradient-to-b from-[#4E4B48] to-[#141312] border border-[#585552]/40" />
              </div>
              <div className="absolute -top-8 sm:-top-10 right-[18%] w-[1.5px] h-[41px] sm:h-[49px] bg-gradient-to-b from-[#403E3C] via-[#2A2826] to-[#141312] pointer-events-none z-10 shadow-xs">
                <div className="absolute -top-1 -left-[3px] w-2 h-1.5 bg-[#1C1B1A] rounded-t-xs" />
                <div className="absolute bottom-0 -left-[3px] w-2 h-3 rounded-xs bg-gradient-to-b from-[#4E4B48] to-[#141312] border border-[#585552]/40" />
              </div>

              {/* Garment Image Box - Aspect ratio matched to 760/917 photographic cutouts */}
              <div
                ref={imageRef}
                className="relative w-full aspect-[760/917] flex items-center justify-center select-none"
              >
                {/* Brushed Cylindrical Rail Rod - Passes directly through the hanger hook eye with ZERO gap */}
                <div className="absolute top-[9px] -left-20 -right-20 sm:-left-32 sm:-right-32 h-[5px] pointer-events-none z-0">
                  <div
                    className="w-full h-full rounded-full shadow-[0_4px_8px_rgba(25,20,15,0.12)]"
                    style={{
                      background:
                        "linear-gradient(180deg, #787571 0%, #42403D 25%, #1E1D1C 70%, #0C0B0A 100%)",
                      boxShadow: "inset 0 1px 0.5px rgba(255, 255, 255, 0.4)",
                    }}
                  />
                  {/* Left Turned Finial */}
                  <div className="absolute -left-2.5 -top-[3px] w-2.5 h-3.5 bg-[#242220] rounded-xs shadow-xs" />
                  {/* Right Turned Finial */}
                  <div className="absolute -right-2.5 -top-[3px] w-2.5 h-3.5 bg-[#242220] rounded-xs shadow-xs" />
                </div>

                <Image
                  src={currentImage}
                  alt={`${product.name} ${viewSide}`}
                  fill
                  priority
                  className="object-contain drop-shadow-2xl transition-all duration-300 z-10"
                  sizes="(max-width: 768px) 90vw, 480px"
                />
              </div>
            </div>

            {/* Front / Back Switcher */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="inline-flex p-1 rounded-full border border-[var(--border)] bg-[var(--surface-light)]/80 backdrop-blur-sm text-[11px] font-sans uppercase tracking-[0.14em]">
                <button
                  onClick={() => setViewSide("front")}
                  className={`px-5 py-1.5 rounded-full transition-all ${
                    viewSide === "front"
                      ? "bg-[var(--accent)] text-[var(--accent-contrast)] font-medium shadow-sm"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => setViewSide("back")}
                  className={`px-5 py-1.5 rounded-full transition-all ${
                    viewSide === "back"
                      ? "bg-[var(--accent)] text-[var(--accent-contrast)] font-medium shadow-sm"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Back
                </button>
              </div>

              <span className="text-xs uppercase font-mono tracking-widest text-[var(--muted)] opacity-75 flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> 360° Studio Cutout
              </span>
            </div>
          </div>

          {/* Right Column: Sticky Purchasing & Specs Drawer */}
          <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24">
            {/* Top Index & Stock */}
            <div className="flex items-center justify-between text-xs sm:text-[13px] uppercase tracking-widest text-[var(--muted)]">
              <span>0{product.index} / 08 · {product.category}</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                In Stock · Ready to dispatch
              </span>
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[var(--foreground)] leading-tight">
                {product.name}{" "}
                <span className="italic block sm:inline font-normal opacity-95">
                  {product.colorway}
                </span>
              </h1>
              <div className="mt-2 text-2xl sm:text-3xl font-mono text-[var(--foreground)]">
                ${product.price}.00
              </div>
            </div>

            <div className="hairline-b w-full" />

            {/* Description */}
            <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--muted)] font-sans">
              {product.description}
            </p>

            {/* Color Swatches */}
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-[var(--muted)]">
                Colorway:{" "}
                <span className="text-[var(--foreground)] font-medium">
                  {selectedColor}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`relative w-8 h-8 rounded-full border transition-all ${
                      selectedColor === c.name
                        ? "border-[var(--foreground)] ring-2 ring-[var(--foreground)]/20 scale-105"
                        : "border-[var(--border)] hover:border-[var(--muted)]"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && (
                      <Check className="w-4 h-4 mx-auto text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Pills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[var(--muted)]">
                <span>Select Size</span>
                <span className="opacity-75">Fits true to size</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2.5 text-xs sm:text-sm font-mono rounded-sm border transition-all ${
                      selectedSize === s
                        ? "bg-[var(--accent)] text-[var(--accent-contrast)] border-[var(--accent)] font-medium shadow-sm"
                        : "border-[var(--border)] hover:border-[var(--foreground)] text-[var(--foreground)] bg-[var(--surface-light)]/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag CTA */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center border border-[var(--border)] rounded-sm bg-[var(--surface-light)]/40 px-2 py-2.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-mono font-medium text-[var(--foreground)]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToBag}
                className="flex-1 py-3.5 px-6 rounded-sm bg-[var(--accent)] text-[var(--accent-contrast)] text-xs sm:text-sm uppercase tracking-[0.16em] font-medium hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Add to bag</span>
                <span>—</span>
                <span className="font-mono">${product.price * quantity}.00</span>
              </button>
            </div>

            {/* Specifications Tab Switcher */}
            <div className="pt-6 hairline-t">
              <div className="flex gap-4 border-b border-[var(--border)] pb-2 text-xs sm:text-[13px] uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-1 transition-colors ${
                    activeTab === "specs"
                      ? "text-[var(--foreground)] font-medium border-b-2 border-[var(--foreground)] -mb-[9px]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab("craft")}
                  className={`pb-1 transition-colors ${
                    activeTab === "craft"
                      ? "text-[var(--foreground)] font-medium border-b-2 border-[var(--foreground)] -mb-[9px]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Craft & Origin
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`pb-1 transition-colors ${
                    activeTab === "care"
                      ? "text-[var(--foreground)] font-medium border-b-2 border-[var(--foreground)] -mb-[9px]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Care & Dispatch
                </button>
              </div>

              {/* Tab Contents */}
              <div className="pt-4 text-sm font-sans text-[var(--muted)] space-y-2.5">
                {activeTab === "specs" && (
                  <>
                    <div className="flex justify-between py-1 hairline-b">
                      <span className="text-xs uppercase tracking-widest font-mono text-[var(--muted)]">
                        Composition
                      </span>
                      <span className="text-sm sm:text-[15px] text-[var(--foreground)] font-medium">
                        {product.specs.material}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 hairline-b">
                      <span className="text-xs uppercase tracking-widest font-mono text-[var(--muted)]">
                        Cut & Fit
                      </span>
                      <span className="text-sm sm:text-[15px] text-[var(--foreground)] font-medium">
                        {product.specs.fit}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 hairline-b">
                      <span className="text-xs uppercase tracking-widest font-mono text-[var(--muted)]">
                        Fabric Weight
                      </span>
                      <span className="text-sm sm:text-[15px] text-[var(--foreground)] font-medium">
                        {product.specs.weight}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 hairline-b">
                      <span className="text-xs uppercase tracking-widest font-mono text-[var(--muted)]">
                        Season
                      </span>
                      <span className="text-sm sm:text-[15px] text-[var(--foreground)] font-medium">
                        {product.specs.season}
                      </span>
                    </div>
                  </>
                )}

                {activeTab === "craft" && (
                  <div className="space-y-3 py-1">
                    <p className="leading-relaxed">
                      Sourced from historical European textile mills and tailored in {product.specs.origin}. Every seam is reinforced with double-needle topstitching for years of physical wear.
                    </p>
                    <div className="flex items-center gap-2 text-[var(--foreground)] text-xs sm:text-[13px] font-medium">
                      <Scissors className="w-3.5 h-3.5" /> Hand-finished in limited seasonal batch
                    </div>
                  </div>
                )}

                {activeTab === "care" && (
                  <div className="space-y-3 py-1">
                    <p className="leading-relaxed">
                      {product.specs.care}. To retain fiber density, wash inside-out on gentle cycle and hang dry naturally.
                    </p>
                    <div className="flex items-center gap-2 text-[var(--foreground)] text-xs sm:text-[13px] font-medium">
                      <Truck className="w-3.5 h-3.5" /> Complimentary express dispatch worldwide over $250
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Adjacent Rail Pieces Recommendations */}
        <div className="mt-28 hairline-t pt-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--muted)]">
                Complete The Wardrobe
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[var(--foreground)] mt-1">
                Adjacent Pieces Along The Rail
              </h3>
            </div>
            <Link
              href="/collection"
              className="text-xs uppercase tracking-wider text-[var(--muted)] hover:text-[var(--foreground)] flex items-center gap-1 font-medium"
            >
              <span>View all 8 pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {otherProducts.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group flex flex-col p-4 rounded-sm border border-[var(--border)] hover:border-[var(--foreground)] bg-[var(--surface-light)]/40 transition-all"
              >
                <div className="relative w-full h-48 mb-3 flex items-center justify-center">
                  <Image
                    src={p.images.front}
                    alt={p.name}
                    fill
                    className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                    sizes="220px"
                  />
                </div>
                <div className="mt-auto hairline-t pt-2 flex justify-between items-start">
                  <div>
                    <div className="text-sm font-serif text-[var(--foreground)] group-hover:underline">
                      {p.name}{" "}
                      <span className="italic font-normal text-[var(--muted)]">
                        {p.colorway}
                      </span>
                    </div>
                    <div className="text-[10px] text-[var(--muted)] uppercase font-mono mt-0.5">
                      0{p.index} / 08
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-[var(--foreground)]">
                    ${p.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
