"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getTotalCount,
    getSubtotal,
  } = useCartStore();

  const totalCount = getTotalCount();
  const subtotal = getSubtotal();
  const freeShippingThreshold = 250;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md sm:max-w-lg h-full bg-[var(--background)] border-l border-[var(--border)] shadow-2xl flex flex-col z-10"
          >
            {/* Drawer Header */}
            <div className="px-6 py-5 hairline-b flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[var(--foreground)]">
                  Your bag
                </h2>
                <sup className="text-sm font-mono font-medium text-[var(--muted)]">
                  {totalCount}
                </sup>
              </div>

              <button
                onClick={closeCart}
                className="p-1.5 rounded-full border border-[var(--border)] hover:border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors"
                aria-label="Close bag"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Tier Bar */}
            <div className="px-6 py-3 bg-[var(--surface-light)]/60 hairline-b text-xs font-sans">
              <div className="flex justify-between items-center text-[var(--muted)] mb-1.5">
                <span>
                  {amountToFreeShipping > 0
                    ? `Add $${amountToFreeShipping}.00 for complimentary express dispatch`
                    : "You have qualified for complimentary express dispatch"}
                </span>
                <span className="font-mono text-[var(--foreground)] font-medium">
                  {Math.round(freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--foreground)] rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[var(--border)]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)]">
                    <ShoppingBag className="w-5 h-5" strokeWidth={1.25} />
                  </div>
                  <div>
                    <p className="text-base font-serif font-medium text-[var(--foreground)]">
                      Your bag is empty
                    </p>
                    <p className="text-sm text-[var(--muted)] mt-1">
                      Explore the rail to select timeless autumn menswear pieces.
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 py-2 px-5 rounded-full border border-[var(--foreground)] text-xs uppercase tracking-widest text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                  >
                    Explore the rail
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 items-center">
                    {/* Item Thumbnail */}
                    <div className="relative w-20 h-24 bg-[var(--surface-light)] rounded-sm p-1 flex-shrink-0 flex items-center justify-center border border-[var(--border)]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={72}
                        height={88}
                        className="object-contain"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-base font-serif font-medium text-[var(--foreground)] hover:underline truncate"
                        >
                          {item.name}{" "}
                          <span className="italic font-normal text-[var(--muted)]">
                            {item.colorway}
                          </span>
                        </Link>
                        <span className="text-sm font-mono font-medium text-[var(--foreground)] ml-2">
                          ${item.price * item.quantity}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                        {item.size} / {item.colorName}
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="pt-2 flex items-center justify-between">
                        <div className="flex items-center border border-[var(--border)] rounded-sm bg-[var(--surface-light)]/40 px-1.5 py-0.5">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-mono font-medium text-[var(--foreground)]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[var(--muted)] hover:text-red-700 transition-colors p-1"
                          aria-label="Remove item"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 hairline-t bg-[var(--background)] space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--muted)]">
                    Subtotal
                  </span>
                  <span className="text-2xl font-mono font-medium text-[var(--foreground)]">
                    ${subtotal}.00
                  </span>
                </div>

                <div className="text-xs text-[var(--muted)] leading-tight text-center">
                  View bag · Taxes and shipping worked out at checkout
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3.5 px-6 rounded-sm bg-[var(--accent)] text-[var(--accent-contrast)] text-xs sm:text-sm uppercase tracking-[0.16em] font-medium hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
