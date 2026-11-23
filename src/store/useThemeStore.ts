import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeConfig } from "@/types/product";

interface ThemeStore extends ThemeConfig {
  isCustomizerOpen: boolean;
  openCustomizer: () => void;
  closeCustomizer: () => void;
  toggleCustomizer: () => void;
  updateTheme: (partial: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

const DEFAULT_THEME: ThemeConfig = {
  storeName: "HALE",
  subTitle: "Autumn / Winter 26",
  backgroundTone: "alabaster",
  showLookbook: true,
  showPhilosophy: true,
  railPhysics: "silky",
  serifHeading: true,
};

export const BACKGROUND_TONES: Record<
  ThemeConfig["backgroundTone"],
  { label: string; bg: string; surface: string; border: string; ink: string }
> = {
  alabaster: {
    label: "Warm Alabaster (Default)",
    bg: "#F2EFE9",
    surface: "#EAE6DF",
    border: "rgba(22, 22, 22, 0.08)",
    ink: "#161616",
  },
  bone: {
    label: "Bone White",
    bg: "#F8F6F0",
    surface: "#EFECE4",
    border: "rgba(22, 22, 22, 0.07)",
    ink: "#141414",
  },
  concrete: {
    label: "Concrete Grey",
    bg: "#ECEAE5",
    surface: "#E2DFD9",
    border: "rgba(22, 22, 22, 0.09)",
    ink: "#1A1A1A",
  },
  sand: {
    label: "Sand Dune",
    bg: "#EBE5DB",
    surface: "#DFD8CD",
    border: "rgba(22, 22, 22, 0.09)",
    ink: "#1A1816",
  },
  dark: {
    label: "Editorial Noir",
    bg: "#161616",
    surface: "#212121",
    border: "rgba(242, 239, 233, 0.12)",
    ink: "#F2EFE9",
  },
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      ...DEFAULT_THEME,
      isCustomizerOpen: false,

      openCustomizer: () => set({ isCustomizerOpen: true }),
      closeCustomizer: () => set({ isCustomizerOpen: false }),
      toggleCustomizer: () =>
        set((state) => ({ isCustomizerOpen: !state.isCustomizerOpen })),

      updateTheme: (partial) => set((state) => ({ ...state, ...partial })),
      resetTheme: () => set({ ...DEFAULT_THEME }),
    }),
    {
      name: "hale_theme_storage",
    }
  )
);
