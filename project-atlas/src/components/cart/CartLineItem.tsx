"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { ShopifyLineItem } from "@/lib/shopify/types";

export default function CartLineItem({ item }: { item: ShopifyLineItem }) {
  const { updateItem, removeItem, loading } = useCart();

  const lineTotal = (Number(item.variant.price) * item.quantity).toFixed(2);

  function decrement() {
    if (item.quantity <= 1) {
      removeItem(item.id);
    } else {
      updateItem(item.id, item.quantity - 1);
    }
  }

  function increment() {
    updateItem(item.id, item.quantity + 1);
  }

  return (
    <div className="flex gap-4 py-5 border-b border-zinc-200">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-zinc-100">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.altText ?? item.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-900 leading-snug">
              {item.title}
            </h3>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-zinc-400">
              {item.variant.title}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            disabled={loading}
            aria-label="Remove item"
            className="text-zinc-400 hover:text-zinc-900 transition-colors disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center border border-zinc-300 rounded-sm">
            <button
              onClick={decrement}
              disabled={loading}
              aria-label="Decrease quantity"
              className="p-1.5 text-zinc-600 hover:text-zinc-900 disabled:opacity-40"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-xs font-medium tabular-nums text-zinc-900">
              {item.quantity}
            </span>
            <button
              onClick={increment}
              disabled={loading}
              aria-label="Increase quantity"
              className="p-1.5 text-zinc-600 hover:text-zinc-900 disabled:opacity-40"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <span className="text-sm font-semibold tabular-nums text-zinc-900">
            ${lineTotal}
          </span>
        </div>
      </div>
    </div>
  );
}
