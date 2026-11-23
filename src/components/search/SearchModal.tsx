"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectProduct,
}: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Toggle search modal
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or internal state
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = useMemo(() => {
    if (!query.trim()) return PRODUCTS;
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.colorway.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.specs.material.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[var(--background)] rounded-sm border border-[var(--border)] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 hairline-b gap-3 bg-[var(--surface-light)]/40">
          <Search className="w-4 h-4 text-[var(--muted)]" strokeWidth={1.5} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the rail by piece, color, or material..."
            autoFocus
            className="w-full bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)]/60 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[11px] uppercase tracking-wider text-[var(--muted)] border border-[var(--border)] px-1.5 py-0.5 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted)] px-2 py-1">
            {filtered.length} {filtered.length === 1 ? "Piece" : "Pieces"} in Catalog
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-[var(--muted)]">
              No garments matching "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                onClick={onClose}
                className="group flex items-center justify-between p-2.5 rounded-sm hover:bg-[var(--surface)] transition-colors border border-transparent hover:border-[var(--border)]"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-14 bg-[var(--surface-light)] rounded-sm overflow-hidden flex items-center justify-center p-1">
                    <Image
                      src={item.images.front}
                      alt={item.name}
                      width={48}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--foreground)] font-serif group-hover:underline">
                      {item.name}{" "}
                      <span className="italic font-normal text-[var(--muted)]">
                        {item.colorway}
                      </span>
                    </div>
                    <div className="text-[11px] text-[var(--muted)] uppercase tracking-wider">
                      {item.category} · {item.specs.material.split(",")[0]}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-medium text-[var(--foreground)]">
                    ${item.price}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:translate-x-1 group-hover:text-[var(--foreground)] transition-all" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
