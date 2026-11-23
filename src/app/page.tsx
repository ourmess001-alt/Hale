"use client";

import React from "react";
import GarmentRail from "@/components/rail/GarmentRail";
import LookbookCarousel from "@/components/lookbook/LookbookCarousel";
import CraftManifesto from "@/components/home/CraftManifesto";
import { useThemeStore } from "@/store/useThemeStore";

export default function Home() {
  const { showPhilosophy } = useThemeStore();

  return (
    <main className="w-full">
      {/* 1. The Interactive 2.5D Garment Rail Stage */}
      <GarmentRail />

      {/* 2. Interactive Lookbook Carousel ("One man, eight pieces.") */}
      <LookbookCarousel />

      {/* 3. Atelier Craft Manifesto & Philosophy */}
      {showPhilosophy && <CraftManifesto />}
    </main>
  );
}
