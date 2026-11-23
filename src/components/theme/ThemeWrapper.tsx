"use client";

import React, { useEffect } from "react";
import { useThemeStore, BACKGROUND_TONES } from "@/store/useThemeStore";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { backgroundTone } = useThemeStore();
  const currentTone = BACKGROUND_TONES[backgroundTone] || BACKGROUND_TONES.alabaster;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--background", currentTone.bg);
    root.style.setProperty("--foreground", currentTone.ink);
    root.style.setProperty("--surface", currentTone.surface);
    root.style.setProperty("--border", currentTone.border);
    root.style.setProperty(
      "--surface-light",
      backgroundTone === "dark" ? "#282828" : "#F7F5F0"
    );
    root.style.setProperty(
      "--muted",
      backgroundTone === "dark" ? "#9E9B95" : "#6B6863"
    );
    root.style.setProperty(
      "--accent",
      backgroundTone === "dark" ? "#F2EFE9" : "#161616"
    );
    root.style.setProperty(
      "--accent-contrast",
      backgroundTone === "dark" ? "#161616" : "#F2EFE9"
    );
  }, [backgroundTone, currentTone]);

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500 ease-out"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      {children}
    </div>
  );
}
