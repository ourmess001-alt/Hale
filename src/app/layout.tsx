import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import FlyToBagPortal from "@/components/cart/FlyToBagPortal";
import ThemeCustomizer from "@/components/theme/ThemeCustomizer";
import ThemeWrapper from "@/components/theme/ThemeWrapper";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HALE — Interactive Garment-Rail Storefront | Autumn 2026",
  description:
    "A restrained menswear wardrobe centered around an interactive 2.5D horizontal garment rail. One man, eight pieces. Autumn / Winter 2026.",
  keywords: [
    "HALE",
    "Garment rail",
    "minimalist fashion",
    "editorial ecommerce",
    "menswear",
    "luxury outerwear",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F2EFE9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-[#161616] selection:text-[#F2EFE9]">
        <ThemeWrapper>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />

          {/* Global Interactive Overlays & Portals */}
          <CartDrawer />
          <FlyToBagPortal />
          <ThemeCustomizer />
        </ThemeWrapper>
      </body>
    </html>
  );
}
