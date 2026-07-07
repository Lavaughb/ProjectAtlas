"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import type { ShopifyCart } from "@/lib/shopify/types";

const CART_ID_KEY = "atlas_cart_id";

interface CartContextValue {
  cart: ShopifyCart | null;
  isOpen: boolean;
  loading: boolean;
  itemCount: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineItemId: string, quantity: number) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  checkout: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

async function cartRequest(body: Record<string, unknown>): Promise<ShopifyCart> {
  const res = await fetch("/api/shopify/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Cart request failed: ${res.status}`);
  }
  return res.json();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // Guards against creating multiple carts before the id is persisted.
  const ensuringRef = useRef<Promise<string> | null>(null);

  // Load an existing cart (or create one) on first mount.
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const storedId =
        typeof window !== "undefined"
          ? window.localStorage.getItem(CART_ID_KEY)
          : null;

      if (storedId) {
        try {
          const res = await fetch(
            `/api/shopify/cart?cartId=${encodeURIComponent(storedId)}`
          );
          if (res.ok) {
            const existing: ShopifyCart = await res.json();
            if (!cancelled) setCart(existing);
            return;
          }
        } catch {
          // fall through to creating a fresh cart
        }
      }

      // No usable cart — leave it null. A cart is lazily created on first add.
      if (!cancelled) setCart(null);
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  // Returns a valid cart id, creating a cart on demand and persisting it.
  const ensureCartId = useCallback(async (): Promise<string> => {
    if (cart?.id) return cart.id;

    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem(CART_ID_KEY)
        : null;
    if (stored) return stored;

    if (ensuringRef.current) return ensuringRef.current;

    const promise = (async () => {
      const created = await cartRequest({ action: "create" });
      window.localStorage.setItem(CART_ID_KEY, created.id);
      setCart(created);
      return created.id;
    })();

    ensuringRef.current = promise;
    try {
      return await promise;
    } finally {
      ensuringRef.current = null;
    }
  }, [cart?.id]);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      setLoading(true);
      try {
        const cartId = await ensureCartId();
        const updated = await cartRequest({
          action: "add",
          cartId,
          variantId,
          quantity,
        });
        setCart(updated);
        setIsOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [ensureCartId]
  );

  const updateItem = useCallback(
    async (lineItemId: string, quantity: number) => {
      if (!cart?.id) return;
      setLoading(true);
      try {
        const updated = await cartRequest({
          action: "update",
          cartId: cart.id,
          lineItemId,
          quantity,
        });
        setCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const removeItem = useCallback(
    async (lineItemId: string) => {
      if (!cart?.id) return;
      setLoading(true);
      try {
        const updated = await cartRequest({
          action: "remove",
          cartId: cart.id,
          lineItemId,
        });
        setCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const checkout = useCallback(() => {
    if (cart?.webUrl) {
      window.location.href = cart.webUrl;
    }
  }, [cart?.webUrl]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const itemCount = cart?.lineItemCount ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        loading,
        itemCount,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
