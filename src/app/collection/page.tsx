"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { Product, ProductCategory } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import { ArrowUpRight, Plus, Check } from "lucide-react";
import QuickFocusOverlay from "@/components/rail/QuickFocusOverlay";

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">(
    "featured"
  );
  const [selectedFocusProduct, setSelectedFocusProduct] = useState<Product | null>(
    null
  );

  const { triggerFlyToBag } = useCartStore();

  const filteredProducts = useMemo(() => {
    let list =
      activeCategory === "all"
        ? [...PRODUCTS]
        : PRODUCTS.filter((p) => p.category === activeCategory);

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [activeCategory, sortBy]);

  const handleQuickAdd = (
    e: React.MouseEvent,
    product: Product,
    targetEl: HTMLElement
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = targetEl.getBoundingClientRect();
    triggerFlyToBag(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        colorway: product.colorway,
        colorName: product.colors[0]?.name || "Original",
        size: "M",
        price: product.price,
        image: product.images.front,
        quantity: 1,
      },
      {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }
    );
  };

  return (
    <main className="w-full pt-24 sm:pt-28 pb-24 px-5 sm:px-8 bg-[var(--background)] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb & Header */}
        <div className="space-y-4 mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono tracking-widest text-[var(--muted)] uppercase">
            <Link href="/" className="hover:text-[var(--foreground)]">
              Atelier
            </Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">Collection 08</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 hairline-b">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[var(--foreground)] tracking-tight">
                The Complete Rail
              </h1>
              <p className="text-sm sm:text-base text-[var(--muted)] mt-2 font-sans max-w-lg">
                Eight foundational menswear silhouettes, each engineered for physical longevity and effortless modularity.
              </p>
            </div>

            {/* Filter Pills & Sort Selector */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Pills */}
              <div className="inline-flex p-1 rounded-full border border-[var(--border)] bg-[var(--surface-light)]/70 text-xs sm:text-[13px] uppercase tracking-wider">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as ProductCategory)}
                    className={`px-3.5 py-1.5 rounded-full transition-all ${
                      activeCategory === cat.id
                        ? "bg-[var(--accent)] text-[var(--accent-contrast)] font-medium shadow-sm"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "featured" | "price-asc" | "price-desc"
                  )
                }
                className="py-1.5 px-3 rounded-full border border-[var(--border)] bg-[var(--surface-light)]/70 text-xs sm:text-[13px] uppercase tracking-wider text-[var(--foreground)] focus:outline-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4-col Desktop / 2-col Mobile Uniform Hanger Card Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-[var(--surface-light)]/40 rounded-sm border border-[var(--border)] hover:border-[var(--foreground)] transition-all overflow-hidden p-4 sm:p-5"
            >
              {/* Product Card Top: Category */}
              <div className="flex items-center justify-end text-xs font-mono tracking-widest text-[var(--muted)] uppercase mb-2">
                <span>{product.category}</span>
              </div>

              {/* Hanger Stage with Pendulum Hover Swing */}
              <div
                onClick={() => setSelectedFocusProduct(product)}
                className="relative w-full h-64 sm:h-80 my-2 flex items-center justify-center cursor-pointer select-none"
              >
                <motion.div
                  whileHover={{ rotate: [-2, 2, -1, 0] }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformOrigin: "top center" }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={product.images.front}
                    alt={`${product.name} ${product.colorway}`}
                    fill
                    className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </motion.div>

                {/* Quick Add Overlay on Hover */}
                <button
                  onClick={(e) => handleQuickAdd(e, product, e.currentTarget)}
                  className="absolute bottom-2 right-2 p-2 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] opacity-0 group-hover:opacity-100 transition-all shadow-md hover:scale-110 active:scale-95"
                  title="Quick Add to Bag (Size M)"
                  aria-label="Quick add to bag"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card Bottom Editorial Metadata */}
              <div className="mt-auto pt-3 hairline-t space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/product/${product.slug}`}
                    className="text-lg sm:text-xl font-serif text-[var(--foreground)] hover:underline leading-snug"
                  >
                    {product.name}{" "}
                    <span className="italic font-normal text-[var(--muted)]">
                      {product.colorway}
                    </span>
                  </Link>

                  <span className="text-sm sm:text-base font-mono font-medium text-[var(--foreground)] whitespace-nowrap">
                    ${product.price}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[var(--muted)] pt-1">
                  <span className="truncate">{product.specs.material.split(",")[0]}</span>
                  <button
                    onClick={() => setSelectedFocusProduct(product)}
                    className="text-[var(--foreground)] hover:underline flex items-center gap-0.5 text-xs font-medium uppercase tracking-wider"
                  >
                    <span>Focus</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Modal Support on Collection Page */}
      <QuickFocusOverlay
        product={selectedFocusProduct}
        isOpen={Boolean(selectedFocusProduct)}
        onClose={() => setSelectedFocusProduct(null)}
        onNavigateNext={() => {
          if (!selectedFocusProduct) return;
          const nextIdx = (selectedFocusProduct.index % PRODUCTS.length) + 1;
          setSelectedFocusProduct(
            PRODUCTS.find((p) => p.index === nextIdx) || null
          );
        }}
        onNavigatePrev={() => {
          if (!selectedFocusProduct) return;
          const prevIdx =
            selectedFocusProduct.index === 1
              ? PRODUCTS.length
              : selectedFocusProduct.index - 1;
          setSelectedFocusProduct(
            PRODUCTS.find((p) => p.index === prevIdx) || null
          );
        }}
      />
    </main>
  );
}
