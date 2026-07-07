"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartLineItem from "@/components/cart/CartLineItem";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, checkout, loading } = useCart();

  const lineItems = cart?.lineItems ?? [];
  const isEmpty = lineItems.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[#EAEAE5] shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-300 px-6 py-5">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-900">
                Your Bag
                {cart && cart.lineItemCount > 0 ? ` (${cart.lineItemCount})` : ""}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6">
              {isEmpty ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag className="h-10 w-10 text-zinc-300" strokeWidth={1} />
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                    Your bag is empty
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 text-[10px] font-bold uppercase tracking-widest text-zinc-900 underline underline-offset-4 hover:text-zinc-600"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <div>
                  {lineItems.map((item) => (
                    <CartLineItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {!isEmpty && (
              <div className="border-t border-zinc-300 px-6 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                    Subtotal
                  </span>
                  <span className="text-lg font-bold tabular-nums text-zinc-900">
                    ${Number(cart?.subtotalPrice ?? 0).toFixed(2)}
                  </span>
                </div>
                <p className="mb-4 text-[10px] tracking-wide text-zinc-400">
                  Shipping &amp; taxes calculated at checkout.
                </p>
                <button
                  onClick={checkout}
                  disabled={loading}
                  className="w-full bg-zinc-900 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
                >
                  {loading ? "Updating…" : "Checkout"}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
