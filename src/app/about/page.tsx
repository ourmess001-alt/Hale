import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Scissors, Shield, Compass } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="w-full pt-24 sm:pt-28 pb-28 px-5 sm:px-8 bg-[var(--background)] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono tracking-widest text-[var(--muted)] uppercase">
          <Link href="/" className="hover:text-[var(--foreground)]">
            Storefront
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Atelier Manifesto</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-[var(--muted)] block">
            Autumn / Winter 2026 Collection
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-normal text-[var(--foreground)] leading-[1.08] tracking-tight">
            One man,{" "}
            <span className="italic block sm:inline font-normal opacity-95">
              eight pieces.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--muted)] font-serif italic max-w-2xl leading-relaxed pt-2">
            &ldquo;A wardrobe should not be an endless feed. It should be a quiet, physical rail where every piece knows its place.&rdquo;
          </p>
        </div>

        {/* Hero Studio Photo */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface-light)]">
          <Image
            src="/editorial/studio.png"
            alt="HALE design studio"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
          <div className="absolute bottom-4 left-5 text-xs font-mono text-white/90 bg-black/50 px-3 py-1.5 rounded backdrop-blur-sm">
            Atelier Pattern Studio · Porto, Portugal
          </div>
        </div>

        <div className="hairline-b w-full" />

        {/* Narrative Essay */}
        <div className="space-y-10 text-base sm:text-[17px] leading-relaxed text-[var(--foreground)] font-sans">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[var(--foreground)]">
              The Physics of the Rail
            </h2>
            <p className="text-[var(--muted)]">
              Modern digital commerce replaced the physical tactile intimacy of clothing with infinite scroll grids and dopamine bait. We designed HALE around a single, overhead horizontal rail. When you step up to it, you drag or scroll through garments in spatial perspective—the same way you slide hangers across a bar in a quiet European atelier.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[var(--foreground)]">
              The Eight Core Silhouettes
            </h2>
            <p className="text-[var(--muted)]">
              Each season, we build precisely eight menswear pieces: from our recycled nylon bomber and heavy Italian corduroy shirt jacket, to Scottish Merino cable knits and double-faced virgin wool overcoats. By capping the catalog at eight garments, our patternmakers can dedicate hundreds of hours to seam tolerance, lining drape, and hand-finished button shanks.
            </p>
          </div>

          {/* Sourcing Table */}
          <div className="pt-4">
            <h3 className="text-xs sm:text-[13px] font-mono uppercase tracking-widest text-[var(--muted)] mb-3 font-semibold">
              Provenance & Mill Directory
            </h3>
            <div className="border border-[var(--border)] rounded-sm divide-y divide-[var(--border)] bg-[var(--surface-light)]/40 text-sm">
              <div className="p-3.5 flex justify-between">
                <span className="font-medium text-[var(--foreground)]">Corduroy & Moleskin</span>
                <span className="text-[var(--muted)] font-mono">Biella, Italy</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span className="font-medium text-[var(--foreground)]">Virgin Wool Melton</span>
                <span className="text-[var(--muted)] font-mono">Florence, Italy</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span className="font-medium text-[var(--foreground)]">Ultrafine Merino Knitwear</span>
                <span className="text-[var(--muted)] font-mono">Hawick, Scotland</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span className="font-medium text-[var(--foreground)]">Stone-Washed Linen</span>
                <span className="text-[var(--muted)] font-mono">Normandy, France</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span className="font-medium text-[var(--foreground)]">Heavyweight French Terry</span>
                <span className="text-[var(--muted)] font-mono">Vancouver, Canada</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span className="font-medium text-[var(--foreground)]">Assembly & Tailoring</span>
                <span className="text-[var(--muted)] font-mono">Porto & Guimarães, Portugal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Street Editorial Photo */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface-light)]">
          <Image
            src="/editorial/street.png"
            alt="HALE garments in natural movement"
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
          <div className="absolute bottom-4 left-5 text-xs font-mono text-white/90 bg-black/50 px-3 py-1.5 rounded backdrop-blur-sm">
            Garment In Motion · Autumn / Winter 26
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-sm bg-[var(--surface-light)] border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-2xl font-serif text-[var(--foreground)]">
              Ready to explore the rail?
            </div>
            <div className="text-sm text-[var(--muted)]">
              Experience the 2.5D spring physics in real time.
            </div>
          </div>

          <Link
            href="/#rail"
            className="py-3 px-6 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] text-xs sm:text-sm uppercase tracking-widest font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span>Take me to the rail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
