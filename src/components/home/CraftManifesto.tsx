"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Scissors, Shield, Compass } from "lucide-react";

export default function CraftManifesto() {
  return (
    <section className="w-full py-24 sm:py-32 px-5 sm:px-8 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        {/* Header Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 hairline-b">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-[var(--muted)] block">
              Atelier Philosophy · Autumn 26
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight text-[var(--foreground)]">
              Restraint over abundance. Eight garments for every hour of the season.
            </h3>
          </div>

          <div className="text-sm sm:text-base text-[var(--muted)] max-w-xs leading-relaxed font-sans">
            Every pattern was graded by hand in Portugal and Italy. Each piece is designed to layer seamlessly over the next with zero aesthetic friction.
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 pt-14">
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] mb-4">
              <Scissors className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div className="text-xs sm:text-[13px] uppercase tracking-widest font-mono text-[var(--muted)]">
              01 / Architecture
            </div>
            <h4 className="text-2xl font-serif font-normal text-[var(--foreground)]">
              The Horizontal Rail
            </h4>
            <p className="text-sm sm:text-[15px] text-[var(--muted)] leading-relaxed font-sans">
              Rather than overwhelming catalogs and infinite grids, the garment rail organizes clothing physically by weight, temperature, and occasion.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] mb-4">
              <Shield className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div className="text-xs sm:text-[13px] uppercase tracking-widest font-mono text-[var(--muted)]">
              02 / Provenance
            </div>
            <h4 className="text-2xl font-serif font-normal text-[var(--foreground)]">
              Historic European Mills
            </h4>
            <p className="text-sm sm:text-[15px] text-[var(--muted)] leading-relaxed font-sans">
              From 8-wale Italian corduroy woven in Biella to double-faced virgin wool melton hand-finished in Florence, our materials are built for decades.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] mb-4">
              <Compass className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div className="text-xs sm:text-[13px] uppercase tracking-widest font-mono text-[var(--muted)]">
              03 / Edition
            </div>
            <h4 className="text-2xl font-serif font-normal text-[var(--foreground)]">
              Zero Deadstock
            </h4>
            <p className="text-sm sm:text-[15px] text-[var(--muted)] leading-relaxed font-sans">
              Strictly limited seasonal production runs. When a colorway sells out, it is archived until the next cycle to prevent textile waste.
            </p>
          </div>
        </div>

        {/* Editorial Real Photography Diptych */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-12 hairline-t">
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[var(--surface-light)] border border-[var(--border)] group">
            <Image
              src="/editorial/studio.png"
              alt="HALE design studio cutting table in Porto"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end text-white text-xs sm:text-[13px] font-mono">
              <span>Atelier Studio · Porto, Portugal</span>
              <span className="opacity-80">Grading & Pattern Cut</span>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[var(--surface-light)] border border-[var(--border)] group">
            <Image
              src="/editorial/street.png"
              alt="HALE Autumn/Winter 26 on-street movement testing"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end text-white text-xs sm:text-[13px] font-mono">
              <span>Autumn/Winter 26 · Field Testing</span>
              <span className="opacity-80">Natural Movement</span>
            </div>
          </div>
        </div>

        {/* Studio Specs Bar */}
        <div className="mt-12 p-8 rounded-sm bg-[var(--surface-light)]/70 border border-[var(--border)] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-normal text-[var(--foreground)]">
              08
            </div>
            <div className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mt-1.5">
              Curated Silhouettes
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-normal text-[var(--foreground)]">
              100%
            </div>
            <div className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mt-1.5">
              Natural or Recycled
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-normal text-[var(--foreground)]">
              24h
            </div>
            <div className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mt-1.5">
              Complimentary Dispatch
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-normal text-[var(--foreground)]">
              Portugal
            </div>
            <div className="text-xs uppercase font-mono tracking-wider text-[var(--muted)] mt-1.5">
              Primary Manufacture
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
