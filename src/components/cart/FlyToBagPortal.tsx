"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

export default function FlyToBagPortal() {
  const { flyAnimation, clearFlyAnimation, openCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [targetRect, setTargetRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (flyAnimation) {
      // Find the bag button in navbar
      const bagBtn = document.getElementById("navbar-bag-button");
      if (bagBtn) {
        const rect = bagBtn.getBoundingClientRect();
        setTargetRect({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        });
      } else {
        // Fallback to top-right corner
        setTargetRect({
          x: window.innerWidth - 60,
          y: 30,
          width: 40,
          height: 40,
        });
      }
    } else {
      setTargetRect(null);
    }
  }, [flyAnimation]);

  if (!mounted || !flyAnimation || !targetRect) return null;

  const startX = flyAnimation.startRect.left + flyAnimation.startRect.width / 2;
  const startY = flyAnimation.startRect.top + flyAnimation.startRect.height / 2;
  const endX = targetRect.x;
  const endY = targetRect.y;

  // Parabolic apex lift (arches upward above the straight vector)
  const midX = (startX + endX) / 2;
  const midY = Math.min(startY, endY) - 100;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        <motion.div
          key={flyAnimation.id}
          initial={{
            x: startX - 50,
            y: startY - 60,
            scale: 1,
            opacity: 0.95,
            rotate: 0,
          }}
          animate={{
            x: [startX - 50, midX - 35, endX - 16],
            y: [startY - 60, midY, endY - 16],
            scale: [1, 0.55, 0.16],
            opacity: [0.95, 0.85, 0.1],
            rotate: [0, 8, -12],
          }}
          transition={{
            duration: 0.58,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={() => {
            clearFlyAnimation();
            // Subtle bounce trigger on bag badge
            const badge = document.getElementById("cart-badge-counter");
            if (badge) {
              badge.classList.add("scale-125");
              setTimeout(() => {
                badge.classList.remove("scale-125");
              }, 250);
            }
            // Auto open cart drawer
            openCart();
          }}
          className="absolute top-0 left-0 w-24 h-28 pointer-events-none drop-shadow-xl"
        >
          <div className="relative w-full h-full">
            <Image
              src={flyAnimation.image}
              alt="Flying Garment"
              fill
              className="object-contain"
              sizes="96px"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>,
    document.body
  );
}
