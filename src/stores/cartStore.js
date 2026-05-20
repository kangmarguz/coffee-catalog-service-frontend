import { create } from "zustand";
import { persist } from "zustand/middleware";

const normalizeCoffee = (coffee) => ({
  id: coffee.id,
  name: coffee.name,
  category: coffee.category,
  imageUrl: coffee.imageUrl,
  price: Number(coffee.price),
  isAvailable: coffee.isAvailable,
});

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (coffee) => {
        const item = normalizeCoffee(coffee);

        set((state) => {
          const existingItem = state.items.find((current) => current.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((current) =>
                current.id === item.id
                  ? { ...current, quantity: current.quantity + 1 }
                  : current
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },
      clearCart: () => set({ items: [] }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? { ...item, quantity: Math.max(1, Number(quantity) || 1) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
      getTotal: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      getItemCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: "coffee-catalog-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
