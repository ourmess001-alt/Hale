"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import QuickFocusOverlay from "@/components/rail/QuickFocusOverlay";

export default function LookbookCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedFocusProduct, setSelectedFocusProduct] = useState<Product | null>(
    null
  );

  const activeProduct = PRODUCTS[activeIndex];
  const prevThumbIndex = (activeIndex - 1 + PRODUCTS.length) % PRODUCTS.length;
  const nextThumbIndex = (activeIndex + 1) % PRODUCTS.length;

  const prevProduct = PRODUCTS[prevThumbIndex];
  const nextProduct = PRODUCTS[nextThumbIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 40;
    if (info.offset.x < -threshold) {
      handleNext();
    } else if (info.offset.x > threshold) {
      handlePrev();
    }
  };

  return (
    <section
      id="lookbook"
      className="relative w-full py-20 sm:py-28 bg-[var(--background)] hairline-t hairline-b overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[var(--foreground)] tracking-tight">
            One man,{" "}
            <span className="italic font-normal opacity-95">eight pieces.</span>
          </h2>
        </div>

        {/* The Interactive Lookbook Outfit Stage */}
        <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center min-h-[580px] sm:min-h-[660px]">
          {/* Left Faded Previous Garment */}
          <div
            onClick={handlePrev}
            className="hidden md:flex flex-col items-center absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 opacity-35 hover:opacity-75 transition-all cursor-pointer z-10 scale-90"
            title={`Previous: ${prevProduct.name} ${prevProduct.colorway}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={prevProduct.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-36 h-48">
                  <Image
                    src={prevProduct.images.front}
                    alt={prevProduct.name}
                    fill
                    className="object-contain"
                    sizes="144px"
                  />
                </div>
                <span className="text-xs font-mono tracking-widest text-[var(--muted)] mt-2">
                  0{prevProduct.index} / 08
                </span>
                <span className="text-sm font-serif text-[var(--foreground)]">
                  {prevProduct.name}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Centerpiece Full-Body Model Outfit with Smooth In-Place Cloth Morph */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="relative w-full max-w-[340px] sm:max-w-[420px] h-[520px] sm:h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing z-20"
          >
            {/* Ambient Floor Shadow under sneakers */}
            <div
              className="pointer-events-none absolute bottom-3 sm:bottom-4 left-[24%] right-[24%] h-4 rounded-[50%] blur-[6px] opacity-25 z-10"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(20, 16, 12, 0.45), transparent)",
              }}
            />

            {/* Stacked Model Looks - Stationary Pose with Seamless Top-Layer Morph */}
            <div className="relative w-full h-full flex items-center justify-center">
              {PRODUCTS.map((prod, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <motion.div
                    key={prod.id}
                    initial={false}
                    animate={{
                      opacity: isCurrent ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                      zIndex: isCurrent ? 20 : 10,
                      willChange: "opacity",
                    }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
                  >
                    <Image
                      src={prod.images.model}
                      alt={`Model wearing ${prod.name} ${prod.colorway}`}
                      fill
                      priority={true}
                      className="object-contain"
                      sizes="(max-width: 640px) 340px, 420px"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Previous / Next Arrow Floaters */}
            <button
              onClick={handlePrev}
              className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 p-2 rounded-full border border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm text-[var(--foreground)] hover:bg-[var(--surface)] transition-all shadow-sm z-30"
              aria-label="Previous outfit"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 p-2 rounded-full border border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm text-[var(--foreground)] hover:bg-[var(--surface)] transition-all shadow-sm z-30"
              aria-label="Next outfit"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right Faded Next Garment */}
          <div
            onClick={handleNext}
            className="hidden md:flex flex-col items-center absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 opacity-35 hover:opacity-75 transition-all cursor-pointer z-10 scale-90"
            title={`Next: ${nextProduct.name} ${nextProduct.colorway}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={nextProduct.id}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-36 h-48">
                  <Image
                    src={nextProduct.images.front}
                    alt={nextProduct.name}
                    fill
                    className="object-contain"
                    sizes="144px"
                  />
                </div>
                <span className="text-xs uppercase font-mono tracking-widest text-[var(--muted)] mt-2">
                  0{nextProduct.index} / 08
                </span>
                <span className="text-sm font-serif text-[var(--foreground)]">
                  {nextProduct.name}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Floating Outfit Info Pill / Card */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-3.5 px-7 rounded-full border border-[var(--border)] bg-[var(--surface-light)]/85 backdrop-blur-md shadow-md text-center sm:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 sm:gap-4"
              >
                <span className="text-xs sm:text-sm font-mono tracking-widest text-[var(--muted)]">
                  0{activeProduct.index} / 08
                </span>
                <span className="text-base sm:text-lg font-serif font-medium text-[var(--foreground)]">
                  {activeProduct.name}{" "}
                  <span className="italic font-normal text-[var(--muted)]">
                    {activeProduct.colorway}
                  </span>
                </span>
                <span className="text-sm sm:text-base font-mono font-semibold text-[var(--foreground)]">
                  ${activeProduct.price}.00
                </span>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedFocusProduct(activeProduct)}
                className="py-2 px-5 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] text-xs sm:text-[13px] uppercase tracking-widest font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
              >
                <span>Shop piece</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <Link
                href={`/product/${activeProduct.slug}`}
                className="text-xs sm:text-[13px] uppercase tracking-wider text-[var(--muted)] hover:text-[var(--foreground)] transition-colors underline sm:no-underline hover:underline"
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Focus Modal from Lookbook */}
      <QuickFocusOverlay
        product={selectedFocusProduct}
        isOpen={Boolean(selectedFocusProduct)}
        onClose={() => setSelectedFocusProduct(null)}
        onNavigateNext={handleNext}
        onNavigatePrev={handlePrev}
      />
    </section>
  );
}
