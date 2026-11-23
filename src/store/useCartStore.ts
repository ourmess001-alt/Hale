import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/product";

interface FlyAnimationData {
  id: string;
  image: string;
  startRect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  flyAnimation: FlyAnimationData | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
  triggerFlyToBag: (
    item: Omit<CartItem, "id">,
    sourceRect: { top: number; left: number; width: number; height: number }
  ) => void;
  clearFlyAnimation: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [
        // Start with Bomber in Black for instant life if desired, or empty
        {
          id: "item-init-1",
          productId: "prod-1",
          slug: "bomber-black",
          name: "Bomber",
          colorway: "in Black",
          colorName: "Black",
          size: "M",
          price: 210,
          image: "/products/bomber-black-front.png",
          quantity: 1,
        },
      ],
      isOpen: false,
      flyAnimation: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.slug === newItem.slug &&
              item.size === newItem.size &&
              item.colorName === newItem.colorName
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + newItem.quantity,
            };
            return { items: updated };
          }

          const uniqueId = `${newItem.slug}-${newItem.size}-${newItem.colorName}-${Date.now()}`;
          return { items: [...state.items, { ...newItem, id: uniqueId }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== id) };
          }
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          };
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      triggerFlyToBag: (item, sourceRect) => {
        // First set up fly animation
        set({
          flyAnimation: {
            id: `fly-${Date.now()}`,
            image: item.image,
            startRect: sourceRect,
          },
        });
        // Add to cart state immediately or upon landing
        get().addItem(item);
      },

      clearFlyAnimation: () => set({ flyAnimation: null }),
    }),
    {
      name: "hale_cart_storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
