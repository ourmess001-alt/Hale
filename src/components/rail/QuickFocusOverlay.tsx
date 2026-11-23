"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product, ProductSize } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Minus,
  ArrowUpRight,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

interface QuickFocusOverlayProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

export default function QuickFocusOverlay({
  product,
  isOpen,
  onClose,
  onNavigateNext,
  onNavigatePrev,
}: QuickFocusOverlayProps) {
  const [viewSide, setViewSide] = useState<"front" | "back">("front");
  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const garmentImgRef = useRef<HTMLDivElement>(null);

  const { triggerFlyToBag } = useCartStore();

  if (!isOpen || !product) return null;

  const activeColor = selectedColor || product.colors[0]?.name || "Black";
  const activeImage =
    viewSide === "front" ? product.images.front : product.images.back;

  const handleAddToBag = () => {
    let sourceRect = { top: 300, left: 300, width: 200, height: 260 };
    if (garmentImgRef.current) {
      const rect = garmentImgRef.current.getBoundingClientRect();
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
        colorName: activeColor,
        size: selectedSize,
        price: product.price,
        image: activeImage,
        quantity: quantity,
      },
      sourceRect
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-0 z-50 overflow-y-auto bg-[var(--background)] flex flex-col"
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 w-full px-5 sm:px-8 py-4 flex items-center justify-between hairline-b bg-[var(--background)]/90 backdrop-blur-md">
          {/* Back to rail button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 py-1.5 px-3.5 rounded-full border border-[var(--border)] hover:border-[var(--foreground)] text-[var(--foreground)] text-xs uppercase tracking-[0.14em] font-medium transition-colors bg-[var(--surface-light)]/40 hover:bg-[var(--surface)]"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span>Back to the rail</span>
          </button>

          {/* Breadcrumb / Title */}
          <div className="hidden sm:flex items-center gap-2 text-xs sm:text-[13px] text-[var(--muted)] tracking-widest uppercase">
            <span>HALE</span>
            <span>/</span>
            <span className="text-[var(--foreground)]">
              {product.name} {product.colorway}
            </span>
          </div>

          {/* Adjacent piece navigation in focus mode */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-[var(--muted)] mr-2">
              0{product.index} / 08
            </span>
            <button
              onClick={() => {
                setViewSide("front");
                onNavigatePrev();
              }}
              className="p-1.5 rounded-full border border-[var(--border)] hover:border-[var(--foreground)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
              title="Previous piece"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => {
                setViewSide("front");
                onNavigateNext();
              }}
              className="p-1.5 rounded-full border border-[var(--border)] hover:border-[var(--foreground)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
              title="Next piece"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Focus Stage Container */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: Isolated Garment Viewer */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[460px] sm:min-h-[580px]">
            {/* Ceiling Suspension Cables for Focus Mode - Land directly on top of the rail rod */}
            <div className="absolute -top-10 left-[22%] w-[1.5px] h-[48px] bg-gradient-to-b from-[#403E3C] via-[#2A2826] to-[#141312] pointer-events-none z-10 shadow-xs">
              <div className="absolute -top-1 -left-[3px] w-2 h-1.5 bg-[#1C1B1A] rounded-t-xs" />
              <div className="absolute bottom-0 -left-[3px] w-2 h-3 rounded-xs bg-gradient-to-b from-[#4E4B48] to-[#141312] border border-[#585552]/40" />
            </div>
            <div className="absolute -top-10 right-[22%] w-[1.5px] h-[48px] bg-gradient-to-b from-[#403E3C] via-[#2A2826] to-[#141312] pointer-events-none z-10 shadow-xs">
              <div className="absolute -top-1 -left-[3px] w-2 h-1.5 bg-[#1C1B1A] rounded-t-xs" />
              <div className="absolute bottom-0 -left-[3px] w-2 h-3 rounded-xs bg-gradient-to-b from-[#4E4B48] to-[#141312] border border-[#585552]/40" />
            </div>

            {/* Garment Image on Hanger with 3D Flip */}
            <motion.div
              ref={garmentImgRef}
              key={`${product.slug}-${viewSide}`}
              initial={{ opacity: 0, scale: 0.94, rotateY: viewSide === "front" ? -15 : 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[760/917] flex items-center justify-center select-none"
            >
              {/* The Realistic Horizontal Rail Bar in Focus Mode (Passes Directly Through Hanger Hook with ZERO Gap) */}
              <div className="absolute top-[8px] -left-20 -right-20 sm:-left-32 sm:-right-32 h-[5px] pointer-events-none z-0">
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
                src={activeImage}
                alt={`${product.name} ${viewSide} view`}
                fill
                priority
                className="object-contain drop-shadow-2xl z-10"
                sizes="(max-width: 768px) 90vw, 420px"
              />
            </motion.div>

            {/* Front / Back View Switcher Pill */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="inline-flex p-1 rounded-full border border-[var(--border)] bg-[var(--surface-light)]/80 backdrop-blur-sm text-xs font-sans uppercase tracking-[0.14em]">
                <button
                  onClick={() => setViewSide("front")}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    viewSide === "front"
                      ? "bg-[var(--accent)] text-[var(--accent-contrast)] font-medium shadow-sm"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => setViewSide("back")}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    viewSide === "back"
                      ? "bg-[var(--accent)] text-[var(--accent-contrast)] font-medium shadow-sm"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Back
                </button>
              </div>
              <span className="text-xs uppercase font-mono tracking-widest text-[var(--muted)] opacity-75 flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Toggle 360° View
              </span>
            </div>
          </div>

          {/* Right: Editorial Purchase Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-6">
            {/* Category Eyebrow */}
            <div className="flex items-center justify-between text-xs sm:text-[13px] tracking-[0.16em] uppercase text-[var(--muted)]">
              <span>0{product.index} / 08 · {product.category}</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                In Stock · Ready to dispatch
              </span>
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[var(--foreground)] leading-tight">
                {product.name}{" "}
                <span className="italic font-normal block sm:inline text-[var(--foreground)] opacity-95">
                  {product.colorway}
                </span>
              </h1>
              <div className="mt-2 text-2xl font-mono text-[var(--foreground)]">
                ${product.price}.00
              </div>
            </div>

            {/* Hairline Divider */}
            <div className="hairline-b w-full" />

            {/* Short Note */}
            <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--muted)] font-sans">
              {product.description}
            </p>

            {/* Colorway Swatches */}
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-[var(--muted)]">
                Colorway: <span className="text-[var(--foreground)] font-medium">{activeColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`relative w-7 h-7 rounded-full border transition-all ${
                      activeColor === c.name
                        ? "border-[var(--foreground)] ring-2 ring-[var(--foreground)]/20 scale-105"
                        : "border-[var(--border)] hover:border-[var(--muted)]"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {activeColor === c.name && (
                      <Check className="w-3.5 h-3.5 mx-auto text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
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
              <div className="flex items-center border border-[var(--border)] rounded-sm bg-[var(--surface-light)]/40 px-2 py-2">
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
                className="flex-1 py-3 px-6 rounded-sm bg-[var(--accent)] text-[var(--accent-contrast)] text-xs sm:text-sm uppercase tracking-[0.16em] font-medium hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Add to bag</span>
                <span>—</span>
                <span className="font-mono">${product.price * quantity}.00</span>
              </button>
            </div>

            {/* Spec Rows */}
            <div className="pt-4 hairline-t space-y-2.5 text-sm text-[var(--muted)]">
              <div className="flex justify-between py-1 hairline-b">
                <span className="uppercase tracking-widest text-xs font-mono">Material</span>
                <span className="text-[var(--foreground)] font-medium">{product.specs.material}</span>
              </div>
              <div className="flex justify-between py-1 hairline-b">
                <span className="uppercase tracking-widest text-xs font-mono">Fit & Silhouette</span>
                <span className="text-[var(--foreground)] font-medium">{product.specs.fit}</span>
              </div>
              <div className="flex justify-between py-1 hairline-b">
                <span className="uppercase tracking-widest text-xs font-mono">Crafted In</span>
                <span className="text-[var(--foreground)] font-medium">{product.specs.origin}</span>
              </div>
            </div>

            {/* Link to Full Product Detail Page */}
            <div className="pt-2">
              <Link
                href={`/product/${product.slug}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] uppercase tracking-[0.14em] text-[var(--foreground)] hover:underline font-medium"
              >
                <span>View full atelier specifications</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
