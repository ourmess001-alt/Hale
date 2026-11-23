"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
  CreditCard,
} from "lucide-react";

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();

  // Form states
  const [email, setEmail] = useState("editorial.client@atelier.com");
  const [firstName, setFirstName] = useState("Julian");
  const [lastName, setLastName] = useState("Vance");
  const [address, setAddress] = useState("44 Boulevard Saint-Germain");
  const [city, setCity] = useState("Paris");
  const [postalCode, setPostalCode] = useState("75005");
  const [country, setCountry] = useState("France");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("10/28");
  const [cardCvc, setCardCvc] = useState("882");
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const shippingCost = shippingMethod === "express" ? 18 : 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "AUTUMN10") {
      setDiscountPercent(10);
      setPromoMessage("10% Atelier Autumn discount applied");
    } else if (promoCode.trim().toUpperCase() === "HALE") {
      setDiscountPercent(15);
      setPromoMessage("15% HALE Collector discount applied");
    } else {
      setPromoMessage("Invalid promo code. Try AUTUMN10 or HALE");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrder = `HALE-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      clearCart();
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <main className="w-full pt-28 pb-28 px-5 sm:px-8 bg-[var(--background)] min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-[var(--surface-light)]/80 border border-[var(--border)] rounded-sm p-8 text-center space-y-6 shadow-xl animate-in fade-in zoom-in-95 duration-300">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--muted)]">
              Order Confirmed · {orderNumber}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[var(--foreground)]">
              Thank You, {firstName}.
            </h1>
            <p className="text-sm text-[var(--muted)] leading-relaxed font-sans">
              A dispatch notification and tracking dossier have been sent to{" "}
              <strong className="text-[var(--foreground)]">{email}</strong>.
            </p>
          </div>

          <div className="hairline-t hairline-b py-4 space-y-2 text-sm font-mono text-left">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Destination:</span>
              <span className="text-[var(--foreground)] truncate max-w-[200px]">
                {address}, {city}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Courier:</span>
              <span className="text-[var(--foreground)]">
                {shippingMethod === "express" ? "Express Priority (48h)" : "Complimentary Atelier Standard"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Amount Settled:</span>
              <span className="text-[var(--foreground)] font-bold">
                ${finalTotal}.00
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="w-full py-3 px-6 rounded-sm bg-[var(--accent)] text-[var(--accent-contrast)] text-xs sm:text-sm uppercase tracking-widest font-medium hover:opacity-90 block transition-opacity shadow-sm"
            >
              Return to the rail
            </Link>
            <Link
              href="/collection"
              className="text-xs sm:text-[13px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors uppercase tracking-wider block"
            >
              Browse complete catalog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full pt-20 sm:pt-24 pb-28 px-5 sm:px-8 bg-[var(--background)] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="mb-10 hairline-b pb-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs sm:text-[13px] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to storefront</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs sm:text-[13px] text-[var(--muted)] uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5" />
            <span>Encrypted 256-bit Checkout</span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <h2 className="text-3xl font-serif text-[var(--foreground)]">
              Your bag is currently empty
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Select garments from the interactive rail before checking out.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 py-2.5 px-6 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] text-xs uppercase tracking-widest"
            >
              Explore the rail
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Columns: Checkout Form */}
            <form
              onSubmit={handlePlaceOrder}
              className="lg:col-span-7 space-y-10"
            >
              {/* 1. Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif font-medium text-[var(--foreground)]">
                    1. Client Contact
                  </h2>
                  <span className="text-xs text-[var(--muted)]">
                    Direct notification
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <label className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[var(--border)] bg-[var(--surface-light)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--foreground)]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Delivery Address */}
              <div className="space-y-4">
                <h2 className="text-xl font-serif font-medium text-[var(--foreground)]">
                  2. Delivery Destination
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <label className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] block mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[var(--border)] bg-[var(--surface-light)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--foreground)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] block mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[var(--border)] bg-[var(--surface-light)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--foreground)]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] block mb-1.5">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[var(--border)] bg-[var(--surface-light)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--foreground)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] block mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[var(--border)] bg-[var(--surface-light)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--foreground)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] block mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[var(--border)] bg-[var(--surface-light)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--foreground)] font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] block mb-1.5">
                      Country / Region
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[var(--border)] bg-[var(--surface-light)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--foreground)]"
                    >
                      <option value="France">France</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Germany">Germany</option>
                      <option value="Italy">Italy</option>
                      <option value="Japan">Japan</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Shipping Method */}
              <div className="space-y-4">
                <h2 className="text-xl font-serif font-medium text-[var(--foreground)]">
                  3. Dispatch Method
                </h2>
                <div className="space-y-2 text-sm">
                  <label
                    onClick={() => setShippingMethod("standard")}
                    className={`flex items-center justify-between p-3.5 rounded-sm border cursor-pointer transition-all ${
                      shippingMethod === "standard"
                        ? "border-[var(--foreground)] bg-[var(--surface-light)]"
                        : "border-[var(--border)]"
                    }`}
                  >
                    <div>
                      <div className="font-medium text-sm text-[var(--foreground)]">
                        Complimentary Standard Courier
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Tracked DHL Express · 3-5 business days
                      </div>
                    </div>
                    <span className="font-mono text-sm font-semibold">Free</span>
                  </label>

                  <label
                    onClick={() => setShippingMethod("express")}
                    className={`flex items-center justify-between p-3.5 rounded-sm border cursor-pointer transition-all ${
                      shippingMethod === "express"
                        ? "border-[var(--foreground)] bg-[var(--surface-light)]"
                        : "border-[var(--border)]"
                    }`}
                  >
                    <div>
                      <div className="font-medium text-sm text-[var(--foreground)]">
                        Priority Editorial Courier
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Direct flight dispatch with garment bag · 24-48h
                      </div>
                    </div>
                    <span className="font-mono text-sm font-semibold">$18.00</span>
                  </label>
                </div>
              </div>

              {/* 4. Payment */}
              <div className="space-y-4">
                <h2 className="text-xl font-serif font-medium text-[var(--foreground)]">
                  4. Payment Dossier
                </h2>
                <div className="p-4 rounded-sm border border-[var(--border)] bg-[var(--surface-light)]/50 space-y-3 text-sm">
                  <div>
                    <label className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] block mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-sm border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-mono text-sm"
                      />
                      <CreditCard className="w-4 h-4 text-[var(--muted)] absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] block mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-sm border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] block mb-1.5">
                        Security CVC
                      </label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-sm border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-sm bg-[var(--accent)] text-[var(--accent-contrast)] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Place Order</span>
                    <span>—</span>
                    <span className="font-mono">${finalTotal}.00</span>
                  </>
                )}
              </button>
            </form>

            {/* Right 5 Columns: Live Order Summary */}
            <div className="lg:col-span-5 bg-[var(--surface-light)]/50 rounded-sm border border-[var(--border)] p-6 space-y-6 lg:sticky lg:top-24">
              <h2 className="text-2xl font-serif font-normal text-[var(--foreground)]">
                Order Summary ({items.length} {items.length === 1 ? "Piece" : "Pieces"})
              </h2>

              {/* Items List */}
              <div className="divide-y divide-[var(--border)] max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 items-center">
                    <div className="relative w-14 h-18 bg-[var(--surface)] rounded-sm p-1 flex-shrink-0 flex items-center justify-center border border-[var(--border)]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-serif font-medium text-[var(--foreground)] truncate">
                        {item.name}{" "}
                        <span className="italic text-[var(--muted)]">
                          {item.colorway}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-[var(--muted)]">
                        Size {item.size} · Qty {item.quantity}
                      </div>
                    </div>
                    <span className="text-sm font-mono font-medium text-[var(--foreground)]">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={applyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Voucher (e.g. AUTUMN10)"
                    className="flex-1 px-3 py-2 text-sm rounded-sm border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] uppercase font-mono placeholder:normal-case focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs uppercase tracking-wider font-medium rounded-sm border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-xs font-sans ${
                      discountPercent > 0 ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </form>

              {/* Totals Breakdown */}
              <div className="hairline-t pt-4 space-y-2 text-sm font-sans text-[var(--muted)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-sm text-[var(--foreground)] font-medium">
                    ${subtotal}.00
                  </span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono text-sm">-${discountAmount.toFixed(0)}.00</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Dispatch & Insurance</span>
                  <span className="font-mono text-sm text-[var(--foreground)] font-medium">
                    {shippingCost === 0 ? "Complimentary" : `$${shippingCost}.00`}
                  </span>
                </div>
                <div className="hairline-t pt-3 flex justify-between items-baseline text-base font-medium text-[var(--foreground)]">
                  <span className="uppercase tracking-wider">Total</span>
                  <span className="text-2xl font-mono">${finalTotal}.00</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
