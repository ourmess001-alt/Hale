---
name: editorial-rail-ecommerce
description: Build high-craft, minimalist editorial e-commerce websites featuring an interactive 2.5D hanging garment rail, tap-to-focus quick views, Front/Back toggles, parabolic fly-to-bag cart animations, interactive on-model lookbooks, and cohesive multi-page checkout flows using Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, and Zustand.
---

# Editorial Garment-Rail E-Commerce Architect

## Objective
Design and implement tactile, luxury fashion storefronts centered around an interactive horizontal/perspective garment rail rather than a static hero banner. Every interaction must feel physical, restrained, and 60fps across desktop and mobile viewports (`h-dvh`).

## Tech Stack & Package Rules
- **Framework:** Next.js (App Router) + React + TypeScript (strict mode, zero `any`).
- **Package Manager:** Always use `pnpm`.
- **Styling:** Tailwind CSS with CSS custom properties for effortless theme editing.
- **Motion:** `framer-motion` (spring physics, `AnimatePresence`, `layoutId` shared transitions, drag/wheel gestures).
- **State:** `zustand` (persisted cart state, active rail index, drawer visibility, optional theme customizer overrides).
- **Icons:** `lucide-react` (thin stroke `strokeWidth={1.25}` for luxury editorial feel).
- **Commerce Integration Ready:** Structure data types cleanly (`Product`, `Variant`, `CartItem`) so mock catalog data can be swapped directly with Shopify Storefront API (GraphQL) or a headless CMS.

---

## Visual Design System (Default Editorial Tokens)
- **Canvas Background:** Warm Alabaster `#F2EFE9` (soft stone paper, never harsh pure `#FFFFFF`).
- **Card / Surface:** `#E9E5DD` / `#F7F5F0` with hairline dividers (`border-neutral-900/10`).
- **Primary Ink:** `#161616` | **Muted Ink:** `#6B6863`.
- **Primary CTA:** Solid `#141414` background, `#F2EFE9` text, sharp or micro-rounded corners (`rounded-sm` / `rounded-full` for pills).
- **Typography Pairing:**
  - **Display Serif:** `Instrument Serif` or `Cormorant Garamond` via `next/font/google` — pair upright product names with italicized colorways (e.g., `Bomber` *`in Black`*).
  - **UI Sans:** `Inter` or `Plus Jakarta Sans` — small uppercase tracked metadata (`text-[11px] tracking-[0.14em] uppercase`).

---

## Core Architectural Modules

### 1. Interactive 2.5D Garment Rail (`components/rail/GarmentRail.tsx`)
- Render an angled overhead metallic bar spanning behind the hanging garments.
- Maintain `activeIndex` (0 to `products.length - 1`) driven by:
  - Horizontal drag/swipe (`framer-motion` pan/drag threshold `> 45px`).
  - Keyboard `ArrowLeft` / `ArrowRight`.
  - Pagination controls (`← 01 / 08 →`) and clickable background garments on the rail.
- **Perspective Depth Calculation:**
  - Items before `activeIndex`: animate off-screen left (`x: -360`, `opacity: 0`, `rotate: -5deg`, `scale: 1.05`).
  - Active item (`offset === 0`): foreground center-left (`x: 0`, `y: 0`, `scale: 1`, `zIndex: 30`, crisp drop shadow).
  - Upcoming items (`offset > 0`): recede along the angled rail vector (`x: offset * 68`, `y: offset * -14`, `scale: Math.max(0.62, 1 - offset * 0.08)`, `zIndex: 30 - offset`, `opacity: offset > 5 ? 0 : 1 - offset * 0.1`).
- **Spring Physics:** Use `{ type: "spring", stiffness: 210, damping: 26, mass: 0.9 }` with subtle hanger sway (`transformOrigin: "top center"`) on enter/exit.

### 2. Tap-to-Focus Quick View (`components/rail/QuickFocusOverlay.tsx`)
- Clicking the active hanging piece transitions the rail out and isolates the selected garment using `layoutId` or smooth scale/opacity choreography.
- Include:
  - Top-left pill button: `← Back to the rail`.
  - Centered `Front` / `Back` image switcher pill directly beneath the garment.
  - Right/bottom purchase drawer: Color swatch circles, Size pills (`XS`, `S`, `M`, `L`, `XL`), stock state, and `Add to bag` CTA.

### 3. Parabolic Fly-to-Bag Animation (`components/cart/FlyToBagPortal.tsx`)
- On `Add to bag` click:
  1. Read source garment image `DOMRect` and header `Bag` button `DOMRect` via refs.
  2. Spawn a fixed-position ghost image inside a React portal.
  3. Animate `x`, `y` along a smooth curved arc (using mid-point keyframes for height lift), shrinking `scale: 1 -> 0.14` and `opacity: 0.95 -> 0.2` over `550ms`.
  4. On animation completion: increment cart badge with a subtle scale bounce, unmount ghost, and automatically open `CartDrawer`.

### 4. Matching Multi-Page Storefront
- **Header (`Navbar.tsx`):** Fixed minimal bar (`BRAND` left; `The rail`, `Collection`, `Lookbook`, `About` center; `Search`, `Bag (n)` right). Mobile uses clean `BRAND` + `Bag (n)` + `Menu` drawer.
- **Collection Page (`/collection`):** Category filter tabs (`All`, `Outerwear`, `Shirts`, `Knitwear`) + 4-column desktop / 2-column mobile grid of uniform studio hanger tiles with subtle hover swing.
- **Product Detail Page (`/product/[slug]`):** Breadcrumb, large hanger viewer with `Front` / `Back` toggle, sticky right editorial panel, size selector, quantity stepper + `Add to bag — $Price`, and structured spec table (`Fabric`, `Fit`, `Season`).
- **Interactive On-Model Lookbook (`LookbookCarousel.tsx`):** Section titled e.g. *"One man, eight pieces."* Centered full-body model image flanked by low-opacity adjacent pieces; horizontal swipe/arrows swap the outfit seamlessly with a floating `Shop piece →` pill.
- **Slide-Over Cart (`CartDrawer.tsx`) & Checkout (`/checkout`):** Clean contact, shipping, and live order summary styled strictly with the exact same editorial tokens.

### 5. Live Theme Customizer Panel (Optional Demo Utility)
- Include a subtle toggleable drawer (or `/studio` mode) allowing real-time edits to brand name, accent/background color tokens, rail item order, and section visibility—mirroring a visual theme editor.

---

## Performance & Quality Guardrails
1. **GPU-Only Animations:** Animate strictly `transform` (`x`, `y`, `scale`, `rotate`) and `opacity`. Never animate `width`, `height`, or `top/left` during rail scrubs.
2. **Mobile Viewport Safety:** Always use `min-h-dvh` / `h-dvh` on the hero rail stage so mobile Safari/Chrome address bars never clip bottom controls or pagination.
3. **Zero Dead Controls:** Every nav link, size button, color swatch, filter tab, quantity stepper, and checkout form field must be fully functional.
4. **Asset Fallback Strategy:** Generate clean, crisp transparent-background garment SVG/PNG placeholders or studio hanger product silhouettes if real transparent PNG cutouts are not yet provided, and document exact drop-in paths in `public/products/`.