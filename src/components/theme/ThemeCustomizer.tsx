"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore, BACKGROUND_TONES } from "@/store/useThemeStore";
import { Sliders, X, RotateCcw, Check, Palette } from "lucide-react";

export default function ThemeCustomizer() {
  const {
    storeName,
    backgroundTone,
    showLookbook,
    showPhilosophy,
    railPhysics,
    serifHeading,
    isCustomizerOpen,
    openCustomizer,
    closeCustomizer,
    updateTheme,
    resetTheme,
  } = useThemeStore();

  return (
    <>
      {/* Subtle Floating Bottom-Left Trigger Button */}
      <button
        onClick={openCustomizer}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 py-2 px-3.5 rounded-full border border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md shadow-lg text-[11px] uppercase tracking-wider font-medium text-[var(--foreground)] hover:bg-[var(--surface)] hover:scale-105 active:scale-95 transition-all"
        title="Open Visual Theme Customizer"
        aria-label="Customize Store Theme"
      >
        <Sliders className="w-3.5 h-3.5 text-[var(--foreground)]" />
        <span className="hidden sm:inline">Theme Studio</span>
      </button>

      {/* Slide-in Theme Editor Drawer */}
      <AnimatePresence>
        {isCustomizerOpen && (
          <div className="fixed inset-0 z-50 flex justify-start">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCustomizer}
              className="fixed inset-0 bg-black/35 backdrop-blur-xs"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative w-full max-w-sm sm:max-w-md h-full bg-[var(--background)] border-r border-[var(--border)] shadow-2xl flex flex-col z-10 overflow-y-auto"
            >
              {/* Header */}
              <div className="px-6 py-5 hairline-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[var(--foreground)]" />
                  <h3 className="text-lg font-serif font-medium text-[var(--foreground)]">
                    Atelier Theme Studio
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetTheme}
                    className="p-1.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    title="Reset to default editorial tokens"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={closeCustomizer}
                    className="p-1.5 rounded-full border border-[var(--border)] hover:border-[var(--foreground)] text-[var(--foreground)] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Form Controls */}
              <div className="p-6 space-y-6 text-xs text-[var(--foreground)]">
                {/* Store Name Live Edit */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">
                    Store / Atelier Brand Title
                  </label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => updateTheme({ storeName: e.target.value })}
                    placeholder="HALE"
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-sm bg-[var(--surface-light)] text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)] font-serif text-base"
                  />
                  <p className="text-[10px] text-[var(--muted)]">
                    Live edits navbar logo, page headers, and packaging tags.
                  </p>
                </div>

                {/* Canvas Background Tones */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">
                    Canvas Paper Tone (Background)
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {(
                      Object.keys(BACKGROUND_TONES) as Array<
                        keyof typeof BACKGROUND_TONES
                      >
                    ).map((toneKey) => {
                      const tone = BACKGROUND_TONES[toneKey];
                      const isSelected = backgroundTone === toneKey;
                      return (
                        <button
                          key={toneKey}
                          onClick={() => updateTheme({ backgroundTone: toneKey })}
                          className={`flex items-center justify-between p-2.5 rounded-sm border transition-all text-left ${
                            isSelected
                              ? "border-[var(--foreground)] ring-1 ring-[var(--foreground)]"
                              : "border-[var(--border)] hover:border-[var(--muted)]"
                          }`}
                          style={{ backgroundColor: tone.bg }}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-4 h-4 rounded-full border border-black/20"
                              style={{ backgroundColor: tone.bg }}
                            />
                            <span
                              className="text-xs font-medium"
                              style={{ color: tone.ink }}
                            >
                              {tone.label}
                            </span>
                          </div>
                          {isSelected && (
                            <Check
                              className="w-4 h-4"
                              style={{ color: tone.ink }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Spring Physics Presets */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">
                    Garment Rail Spring Physics
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["silky", "snappy", "floating"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => updateTheme({ railPhysics: mode })}
                        className={`py-2 text-[11px] uppercase tracking-wider rounded-sm border transition-all ${
                          railPhysics === mode
                            ? "bg-[var(--accent)] text-[var(--accent-contrast)] border-[var(--accent)] font-medium"
                            : "border-[var(--border)] hover:border-[var(--foreground)] text-[var(--foreground)] bg-[var(--surface-light)]"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-[var(--muted)]">
                    Silky: balanced inertia. Snappy: quick bounce. Floating: dreamlike suspension.
                  </p>
                </div>

                {/* Section Toggles */}
                <div className="space-y-3 pt-2 hairline-t">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] block">
                    Homepage Sections
                  </label>

                  {/* Lookbook toggle */}
                  <label className="flex items-center justify-between p-2.5 border border-[var(--border)] rounded-sm bg-[var(--surface-light)]/50 cursor-pointer">
                    <div>
                      <div className="text-xs font-medium">
                        Lookbook ("Wardrobe Study")
                      </div>
                      <div className="text-[10px] text-[var(--muted)]">
                        Full-body on-model outfit carousel
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={showLookbook}
                      onChange={(e) =>
                        updateTheme({ showLookbook: e.target.checked })
                      }
                      className="accent-[var(--foreground)] w-4 h-4"
                    />
                  </label>

                  {/* Philosophy section toggle */}
                  <label className="flex items-center justify-between p-2.5 border border-[var(--border)] rounded-sm bg-[var(--surface-light)]/50 cursor-pointer">
                    <div>
                      <div className="text-xs font-medium">
                        Atelier Craft Manifesto
                      </div>
                      <div className="text-[10px] text-[var(--muted)]">
                        Textile provenance and mill notes
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={showPhilosophy}
                      onChange={(e) =>
                        updateTheme({ showPhilosophy: e.target.checked })
                      }
                      className="accent-[var(--foreground)] w-4 h-4"
                    />
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto p-6 hairline-t bg-[var(--surface-light)]/40 flex items-center justify-between text-[11px] text-[var(--muted)]">
                <span>Persisted in local storage</span>
                <button
                  onClick={closeCustomizer}
                  className="py-1.5 px-4 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] uppercase tracking-wider font-medium hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
