"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import QuickFocusOverlay from "./QuickFocusOverlay";
import { useThemeStore } from "@/store/useThemeStore";

export default function GarmentRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocusOpen, setIsFocusOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { railPhysics } = useThemeStore();
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isManualNavRef = useRef(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when QuickFocusOverlay is open
  useEffect(() => {
    if (isFocusOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFocusOpen]);

  // Smooth scroll sync handler for manual interactions
  const scrollToGarment = useCallback((targetIndex: number) => {
    if (!trackRef.current) {
      setActiveIndex(targetIndex);
      return;
    }

    isManualNavRef.current = true;
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);

    setActiveIndex(targetIndex);

    const maxScroll = trackRef.current.offsetHeight - window.innerHeight;
    if (maxScroll > 0) {
      const targetFraction = (targetIndex + 0.5) / PRODUCTS.length;
      const targetScrollY = targetFraction * maxScroll;

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }

    manualTimeoutRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 750);
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    const nextIdx = activeIndex < PRODUCTS.length - 1 ? activeIndex + 1 : 0;
    scrollToGarment(nextIdx);
  }, [activeIndex, scrollToGarment]);

  const handlePrev = useCallback(() => {
    const prevIdx = activeIndex > 0 ? activeIndex - 1 : PRODUCTS.length - 1;
    scrollToGarment(prevIdx);
  }, [activeIndex, scrollToGarment]);

  // Continuous window scroll scrub sync
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (isManualNavRef.current || !trackRef.current || isFocusOpen) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!trackRef.current) {
            ticking = false;
            return;
          }

          const trackRect = trackRef.current.getBoundingClientRect();
          const maxScroll = trackRef.current.offsetHeight - window.innerHeight;

          if (maxScroll <= 0) {
            ticking = false;
            return;
          }

          // Progress within the sticky rail range [0, 1]
          const progress = -trackRect.top / maxScroll;

          if (progress >= 0 && progress <= 1) {
            const segment = 1 / PRODUCTS.length;
            const targetIndex = Math.min(
              PRODUCTS.length - 1,
              Math.max(0, Math.floor(progress / segment))
            );
            setActiveIndex((prev) => (prev !== targetIndex ? targetIndex : prev));
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    };
  }, [isFocusOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFocusOpen) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isFocusOpen]);

  // Horizontal wheel / trackpad swipe
  const handleWheel = (e: React.WheelEvent) => {
    if (isFocusOpen) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 25) {
      if (e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Touch / Drag Gesture
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 45;
    if (info.offset.x < -threshold) {
      handleNext();
    } else if (info.offset.x > threshold) {
      handlePrev();
    }
  };

  // Spring physics based on theme store setting
  const springConfig =
    railPhysics === "snappy"
      ? { type: "spring" as const, stiffness: 320, damping: 28, mass: 0.7 }
      : railPhysics === "floating"
      ? { type: "spring" as const, stiffness: 140, damping: 22, mass: 1.2 }
      : { type: "spring" as const, stiffness: 210, damping: 26, mass: 0.9 }; // silky default

  const activeProduct = PRODUCTS[activeIndex];

  return (
    <section
      id="rail"
      ref={trackRef}
      className="relative w-full"
      style={{
        height: isMobile ? "320vh" : "380vh",
      }}
    >
      {/* Sticky Full-Viewport Rail Stage Container */}
      <div
        ref={stageRef}
        onWheel={handleWheel}
        className="sticky top-0 w-full h-dvh min-h-[640px] max-h-[1080px] overflow-hidden select-none bg-[var(--background)] flex flex-col justify-between"
      >
        {/* Background Subtle Ambience */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-transparent to-[var(--surface)]/20" />

        {/* Far-Left Vertical Progress Indicator */}
        <div className="hidden sm:flex absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3 text-xs font-mono tracking-widest text-[var(--muted)]">
          <span>01</span>
          <div className="relative w-[1.5px] h-32 bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[var(--foreground)] rounded-full"
              style={{
                height: `${(1 / PRODUCTS.length) * 100}%`,
              }}
              animate={{
                top: `${(activeIndex / (PRODUCTS.length - 1)) * 87.5}%`,
              }}
              transition={springConfig}
            />
          </div>
          <span>08</span>
        </div>

        {/* THE 2.5D GARMENT RAIL STAGE */}
        <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-20 pb-16 flex items-center">
          {/* Stage Stage Coordinates Container (Shared Reference Frame for Rail + Garments) */}
          <div className="relative w-full h-[480px] sm:h-[580px] flex items-center justify-start">
            {/* Realistic Overhead Architectural Rail Assembly with Ceiling Tension Cables */}
            <div className="absolute inset-x-0 top-0 pointer-events-none z-10 select-none overflow-visible">
              {/* Left Ceiling Suspension Cable / Rope - Drops from ceiling and anchors directly to rod */}
              <div
                className="absolute -top-[140px] w-[1.5px] bg-gradient-to-b from-[#3D3A37] via-[#242220] to-[#121110] shadow-[0_0_1px_rgba(0,0,0,0.6)]"
                style={{
                  left: isMobile ? "14%" : "14%",
                  height: isMobile ? "208px" : "210px",
                }}
              >
                {/* Ceiling Mounting Bracket */}
                <div className="absolute -top-1 -left-[3px] w-2 h-2 bg-[#1C1B1A] rounded-t-xs shadow-xs" />
                {/* Rod Clamp Collet */}
                <div className="absolute bottom-0 -left-[3.5px] w-2.5 h-3.5 rounded-xs bg-gradient-to-b from-[#4E4B48] via-[#2A2827] to-[#141312] border border-[#585552]/40 shadow-sm" />
              </div>

              {/* Right Ceiling Suspension Cable / Rope - Drops from ceiling and anchors directly to rod */}
              <div
                className="absolute -top-[140px] w-[1.5px] bg-gradient-to-b from-[#3D3A37] via-[#242220] to-[#121110] shadow-[0_0_1px_rgba(0,0,0,0.6)]"
                style={{
                  right: isMobile ? "16%" : "16%",
                  height: isMobile ? "190px" : "155px",
                }}
              >
                {/* Ceiling Mounting Bracket */}
                <div className="absolute -top-1 -left-[3px] w-2 h-2 bg-[#1C1B1A] rounded-t-xs shadow-xs" />
                {/* Rod Clamp Collet */}
                <div className="absolute bottom-0 -left-[3.5px] w-2.5 h-3.5 rounded-xs bg-gradient-to-b from-[#4E4B48] via-[#2A2827] to-[#141312] border border-[#585552]/40 shadow-sm" />
              </div>

              {/* Full-Span Cylindrical Rail Rod (Passes Directly Through Hanger Hooks with ZERO Gap) */}
              <div
                className="absolute inset-x-2 sm:inset-x-6 h-[6px]"
                style={{
                  top: isMobile ? "56px" : "55px",
                  transform: "rotate(-3.8deg)",
                  transformOrigin: isMobile
                    ? "50% 3px"
                    : "calc(14% + 188.75px) 3px",
                }}
              >
                {/* Cylindrical Rod Body with Brushed Steel Specular Highlight */}
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, #7A7773 0%, #44423F 22%, #1E1D1C 68%, #0C0B0A 100%)",
                    boxShadow:
                      "inset 0 1px 0.5px rgba(255, 255, 255, 0.45), 0 5px 12px rgba(25, 20, 15, 0.12), 0 1px 2px rgba(0, 0, 0, 0.25)",
                  }}
                />

                {/* Left Turned Wall Mounting Flange & End Finial */}
                <div className="absolute -left-3 -top-[5px] flex items-center">
                  <div className="w-2.5 h-4 bg-gradient-to-r from-[#1E1D1C] to-[#383633] rounded-sm shadow-md border-r border-[#55524E]/40" />
                  <div className="w-2 h-2.5 bg-[#141312] rounded-full shadow-inner" />
                </div>

                {/* Right Turned Wall Mounting Flange & End Finial */}
                <div className="absolute -right-3 -top-[5px] flex items-center">
                  <div className="w-2 h-2.5 bg-[#141312] rounded-full shadow-inner" />
                  <div className="w-2.5 h-4 bg-gradient-to-l from-[#1E1D1C] to-[#383633] rounded-sm shadow-md border-l border-[#55524E]/40" />
                </div>
              </div>
            </div>

            {/* Garments Stage Container (Draggable) */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="relative w-full h-full flex items-center cursor-grab active:cursor-grabbing"
            >
              {/* Rail Items Group */}
              <div className="relative w-full h-full flex items-center justify-start">
                {PRODUCTS.map((product, index) => {
                  const offset = index - activeIndex;
                  const isActive = offset === 0;
                  const isPast = offset < 0;
                  const isVisible = offset >= -1 && offset <= 6;

                  if (!isVisible) return null;

                  // Perspective 2.5D math - Perfectly locked to the -3.8deg rail vector
                  let xVal = 0;
                  let yVal = 0;
                  let scaleVal = 1;
                  let zIndexVal = 30;
                  let opacityVal = 1;
                  let rotateVal = 0;

                  if (isPast) {
                    // Gliding smoothly out to the left with pendulum tilt
                    xVal = -360 * Math.abs(offset);
                    yVal = 10;
                    scaleVal = 1.04;
                    zIndexVal = 10 + offset;
                    opacityVal = 0;
                    rotateVal = -6; // Pendulum swing
                  } else if (isActive) {
                    xVal = 0;
                    yVal = 0;
                    scaleVal = 1;
                    zIndexVal = 30;
                    opacityVal = 1;
                    rotateVal = 0;
                  } else {
                    // Upcoming items receding along exact -3.8deg rail vector
                    const stepX = 52;
                    const stepY = stepX * Math.tan((-3.8 * Math.PI) / 180); // Exact -3.454px
                    xVal = offset * stepX;
                    yVal = offset * stepY;
                    scaleVal = Math.max(0.68, 1 - offset * 0.055);
                    zIndexVal = 25 - offset;
                    opacityVal = offset > 4 ? 0.35 : 1 - offset * 0.11;
                    rotateVal = offset * 0.3;
                  }

                  return (
                    <motion.div
                      key={product.id}
                      onClick={() => {
                        if (isActive) {
                          setIsFocusOpen(true);
                        } else if (offset > 0) {
                          scrollToGarment(index);
                        }
                      }}
                      animate={{
                        x: xVal,
                        y: yVal,
                        scale: scaleVal,
                        zIndex: zIndexVal,
                        opacity: opacityVal,
                        rotate: rotateVal,
                      }}
                      transition={{
                        ...springConfig,
                        opacity: { duration: 0.3 },
                      }}
                      style={{
                        position: "absolute",
                        top: isMobile ? "49.5px" : "48px",
                        originX: 0.4967,
                        originY: 0.0207,
                        transformOrigin: "49.67% 2.07%",
                        cursor: isActive
                          ? "pointer"
                          : offset > 0
                          ? "pointer"
                          : "default",
                      }}
                      className="rail-item-pos group select-none"
                      title={
                        isActive
                          ? `Tap to inspect ${product.name} ${product.colorway}`
                          : `View ${product.name}`
                      }
                    >
                      {/* Garment Image Box - Exact aspect-[760/917] matching the real photos */}
                      <div className="relative w-[280px] sm:w-[340px] lg:w-[380px] aspect-[760/917]">
                        <Image
                          src={product.images.front}
                          alt={`${product.name} ${product.colorway}`}
                          fill
                          priority={index < 3}
                          sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 380px"
                          className={`object-contain transition-transform duration-300 ${
                            isActive
                              ? "drop-shadow-2xl group-hover:scale-[1.015]"
                              : "drop-shadow-md group-hover:opacity-100"
                          }`}
                        />

                        {/* Subtle Tap-to-Inspect Hint Badge on Active Garment */}
                        {isActive && (
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <span className="py-1 px-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] text-[10px] uppercase tracking-widest font-sans font-medium shadow-md whitespace-nowrap">
                              Tap to focus
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Synchronized Right Editorial Info Panel (Desktop) */}
          <div className="hidden lg:flex absolute right-6 xl:right-14 top-1/2 -translate-y-1/2 z-20 w-[380px] xl:w-[420px] flex-col space-y-6 text-[var(--foreground)]">
            {/* Upright Serif Title + Italic Colorway (Index counter deleted as requested) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="space-y-4"
              >
                <h2 className="text-5xl xl:text-6xl font-serif font-normal leading-[1.04] tracking-tight text-[var(--foreground)]">
                  {activeProduct.name}
                  <span className="block italic font-normal text-[var(--foreground)] opacity-95 text-4xl xl:text-5xl mt-1">
                    {activeProduct.colorway}
                  </span>
                </h2>

                {/* Hairline Divider */}
                <div className="w-12 h-[1px] bg-[var(--foreground)]/40 my-1" />

                {/* 2-line Fabric Note - Larger & Legible */}
                <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--muted)] font-sans">
                  {activeProduct.shortFabricNote}
                </p>

                {/* Structured Specs Table - Enhanced Font Sizes */}
                <div className="pt-3 hairline-t space-y-2.5 font-sans">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
                      Material
                    </span>
                    <span className="text-sm text-[var(--foreground)] text-right font-medium">
                      {activeProduct.specs.material.split(",")[0]}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
                      Fit
                    </span>
                    <span className="text-sm text-[var(--foreground)] text-right">
                      {activeProduct.specs.fit}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
                      Size
                    </span>
                    <span className="text-sm text-[var(--foreground)] text-right font-mono font-medium">
                      {activeProduct.specs.sizes}
                    </span>
                  </div>
                </div>

                {/* Price & Action Link - Larger Typography */}
                <div className="pt-4 flex items-center justify-between">
                  <div className="text-2xl sm:text-3xl font-mono font-medium text-[var(--foreground)]">
                    ${activeProduct.price}.00
                  </div>

                  <button
                    onClick={() => setIsFocusOpen(true)}
                    className="group flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.14em] font-medium text-[var(--foreground)] hover:opacity-75 transition-opacity"
                  >
                    <span>View details</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE BOTTOM EDITORIAL DRAWER */}
        <div className="lg:hidden w-full px-5 pb-16 z-20">
          <div className="hairline-t pt-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-mono tracking-wider text-[var(--muted)] flex items-center gap-1.5">
                <span>0{activeProduct.index} / 08 · {activeProduct.category}</span>
                <span className="opacity-40">·</span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--foreground)] opacity-85 font-sans">Scroll ↓</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal leading-tight text-[var(--foreground)] truncate mt-0.5">
                {activeProduct.name}{" "}
                <span className="italic">{activeProduct.colorway}</span>
              </h2>
              <div className="text-sm sm:text-base font-mono font-medium mt-1 text-[var(--foreground)]">
                ${activeProduct.price}.00
              </div>
            </div>

            <button
              onClick={() => setIsFocusOpen(true)}
              className="py-2 px-4 rounded-full border border-[var(--border)] bg-[var(--surface-light)] text-xs uppercase tracking-widest font-medium text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs flex-shrink-0"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* STAGE FOOTER BAR: Metadata Left + Controls Right */}
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 pb-5 z-20 flex items-center justify-between text-xs sm:text-[13px] tracking-[0.14em] uppercase font-sans text-[var(--muted)]">
          {/* Bottom-Left Editorial Metadata (offset to comfortably clear the floating Theme button) */}
          <div className="hidden sm:flex items-center gap-3 pl-28 lg:pl-32">
            <span className="font-medium text-[var(--foreground)]">Autumn 26</span>
            <span>·</span>
            <span>The Autumn Rail</span>
            <span>·</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-light)]/80 text-xs text-[var(--foreground)] font-medium tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Scroll to browse pieces
            </span>
          </div>

          {/* Bottom-Right Pagination Controls (← 01 / 08 →) */}
          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            <div className="flex items-center border border-[var(--border)] rounded-full bg-[var(--surface-light)]/70 backdrop-blur-sm p-1">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-full hover:bg-[var(--surface)] text-[var(--foreground)] transition-colors"
                aria-label="Previous garment"
                title="Previous piece (← key)"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              </button>

              <span className="px-3.5 text-sm font-mono tracking-widest text-[var(--foreground)] select-none font-medium">
                0{activeProduct.index} / 08
              </span>

              <button
                onClick={handleNext}
                className="p-1.5 rounded-full hover:bg-[var(--surface)] text-[var(--foreground)] transition-colors"
                aria-label="Next garment"
                title="Next piece (→ key)"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Tap-To-Focus Quick View Overlay */}
        <QuickFocusOverlay
          product={activeProduct}
          isOpen={isFocusOpen}
          onClose={() => setIsFocusOpen(false)}
          onNavigateNext={handleNext}
          onNavigatePrev={handlePrev}
        />
      </div>
    </section>
  );
}
