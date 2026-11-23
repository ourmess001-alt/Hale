import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="hairline-t bg-[var(--background)] py-16 px-6 sm:px-10 text-xs sm:text-[13px] font-sans tracking-[0.12em] uppercase text-[var(--muted)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8">
        {/* Brand & Editorial Manifesto */}
        <div className="md:col-span-1 space-y-4">
          <span className="text-lg tracking-[0.24em] font-medium text-[var(--foreground)] block">
            HALE
          </span>
          <p className="text-xs sm:text-[13px] leading-relaxed tracking-normal normal-case text-[var(--muted)]">
            A restrained wardrobe built around an overhead garment rail. One man, eight pieces. Autumn / Winter 2026.
          </p>
          <div className="text-xs font-mono tracking-widest text-[var(--muted)] opacity-75">
            PORTUGAL · SCOTLAND · ITALY · JAPAN
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <div className="text-xs sm:text-[13px] text-[var(--foreground)] font-semibold">
            Directory
          </div>
          <ul className="space-y-2 text-xs sm:text-[13px]">
            <li>
              <Link href="/#rail" className="hover:text-[var(--foreground)] transition-colors">
                The Autumn Rail
              </Link>
            </li>
            <li>
              <Link href="/collection" className="hover:text-[var(--foreground)] transition-colors">
                Complete Collection
              </Link>
            </li>
            <li>
              <Link href="/#lookbook" className="hover:text-[var(--foreground)] transition-colors">
                Lookbook ("Wardrobe Study")
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-[var(--foreground)] transition-colors">
                Cart & Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* Studio & Craftsmanship */}
        <div className="space-y-3">
          <div className="text-xs sm:text-[13px] text-[var(--foreground)] font-semibold">
            Atelier Notes
          </div>
          <ul className="space-y-2 text-xs sm:text-[13px] normal-case tracking-normal">
            <li className="text-[var(--muted)]">
              Recycled Italian nylon, Portuguese duck canvas, Scottish ultrafine Merino wool.
            </li>
            <li className="text-[var(--muted)]">
              Double-faced virgin wool melton hand-finished in Florence.
            </li>
          </ul>
        </div>

        {/* Newsletter / Contact */}
        <div className="space-y-3">
          <div className="text-xs sm:text-[13px] text-[var(--foreground)] font-semibold">
            Dispatch
          </div>
          <p className="text-xs sm:text-[13px] normal-case tracking-normal text-[var(--muted)]">
            Occasional dispatches on fabric sourcing and garment additions. Zero promotions.
          </p>
          <div className="flex items-center border border-[var(--border)] rounded-sm overflow-hidden bg-[var(--surface-light)]/50 focus-within:border-[var(--foreground)]">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-3 py-2 text-xs bg-transparent text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]/60 normal-case"
            />
            <button
              className="px-3.5 py-2 bg-[var(--accent)] text-[var(--accent-contrast)] text-xs uppercase tracking-widest font-medium hover:opacity-90 transition-opacity"
              aria-label="Subscribe"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-14 pt-8 hairline-t flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--muted)] gap-4">
        <div>
          © 2026 HALE ATELIER. ALL RIGHTS RESERVED. CRAFTED FOR MINIMALIST STOREFRONTS.
        </div>
        <div className="flex gap-6">
          <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">
            Terms of Sale
          </Link>
          <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">
            Shipping & Returns
          </Link>
          <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
