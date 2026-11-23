"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";
import { Search, ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import SearchModal from "@/components/search/SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const { getTotalCount, openCart } = useCartStore();
  const { storeName } = useThemeStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cartCount = getTotalCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "The rail", href: "/#rail" },
    { label: "Collection", href: "/collection" },
    { label: "Lookbook", href: "/#lookbook" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 hairline-b ${
          isScrolled
            ? "bg-[var(--background)]/92 backdrop-blur-xl shadow-[0_4px_24px_rgba(20,18,15,0.04)]"
            : "bg-[var(--background)]/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-[70px] flex items-center justify-between text-[13px] sm:text-sm tracking-[0.14em] uppercase font-sans">
          {/* Brand Logo & Editorial Mark */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="group flex flex-col items-start focus:outline-none"
            >
              <span className="text-xl sm:text-2xl font-serif tracking-[0.24em] font-normal text-[var(--foreground)] group-hover:opacity-75 transition-opacity leading-none">
                {storeName}
              </span>
              <span className="text-[9px] uppercase tracking-[0.24em] text-[var(--muted)] font-mono mt-1 opacity-75 group-hover:opacity-100 transition-opacity block">
                Atelier · Autumn 26
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links with Refined Underline Indicator */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href) &&
                    link.href !== "/#rail" &&
                    link.href !== "/#lookbook";
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1.5 text-xs sm:text-[13px] uppercase tracking-[0.16em] font-medium transition-all group ${
                    isActive
                      ? "text-[var(--foreground)] font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Underline Indicator */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--foreground)] rounded-full transition-transform duration-300 origin-left ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-75 opacity-40 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Search Pill, Atelier Directory, Bag Jewel Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Attractive Search Pill Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="group flex items-center gap-2.5 py-1.5 px-3 sm:px-3.5 rounded-full border border-[var(--border)] bg-[var(--surface-light)]/60 hover:bg-[var(--surface-light)] hover:border-[var(--foreground)]/40 text-[var(--muted)] hover:text-[var(--foreground)] transition-all shadow-2xs hover:shadow-xs cursor-pointer"
              title="Search collection (⌘K)"
              aria-label="Search collection"
            >
              <Search
                className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors group-hover:scale-110"
                strokeWidth={1.8}
              />
              <span className="text-xs uppercase tracking-wider font-medium hidden lg:inline">
                Search
              </span>
              <kbd className="hidden lg:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--muted)]/80 group-hover:border-[var(--foreground)]/25">
                ⌘K
              </kbd>
            </button>

            {/* Atelier Heritage Tag */}
            <Link
              href="/about"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors py-1 font-medium"
            >
              <span>Atelier</span>
              <span className="w-1 h-1 rounded-full bg-[var(--muted)]/40" />
              <span className="font-mono text-[11px] opacity-75">Porto</span>
            </Link>

            {/* Subtle Vertical Divider */}
            <div className="hidden sm:block w-[1px] h-4 bg-[var(--border)]" />

            {/* High-Contrast Interactive Bag Jewel Button */}
            <button
              id="navbar-bag-button"
              onClick={openCart}
              className="group relative flex items-center gap-2 py-1.5 px-3.5 sm:px-4 rounded-full border border-[var(--border)] hover:border-[var(--foreground)] text-[var(--foreground)] transition-all bg-[var(--surface-light)]/70 hover:bg-[var(--surface)] shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
              aria-label={`Open shopping bag with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag
                  className="w-4 h-4 text-[var(--foreground)] group-hover:scale-110 transition-transform duration-200"
                  strokeWidth={1.75}
                />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
                Bag
              </span>
              <span
                id="cart-badge-counter"
                className={`inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[11px] font-mono font-bold rounded-full transition-all duration-300 ${
                  cartCount > 0
                    ? "bg-[var(--accent)] text-[var(--accent-contrast)] shadow-xs scale-100 ring-2 ring-[var(--background)]"
                    : "bg-[var(--surface)] text-[var(--muted)] scale-90"
                }`}
              >
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-[var(--border)] bg-[var(--surface-light)]/60 text-[var(--foreground)] hover:bg-[var(--surface)] transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" strokeWidth={1.75} />
              ) : (
                <Menu className="w-4 h-4" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4 text-xs tracking-[0.16em] uppercase">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 text-[var(--foreground)] border-b border-[var(--border)]/40 hover:text-[var(--foreground)] font-medium"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted)]" />
                </Link>
              ))}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex items-center gap-2.5 text-[var(--muted)] py-2 text-xs uppercase tracking-wider font-medium hover:text-[var(--foreground)]"
                >
                  <Search className="w-4 h-4" strokeWidth={1.75} />
                  <span>Search Catalog (⌘K)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
