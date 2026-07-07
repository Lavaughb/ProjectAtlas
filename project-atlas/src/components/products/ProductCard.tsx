"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { ShopifyProduct } from "@/lib/shopify/types";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: ShopifyProduct;
  index?: number;
}) {
  const { addItem, loading } = useCart();

  // Default to the first available variant, else the first one.
  const firstAvailable =
    product.variants.find((v) => v.available) ?? product.variants[0];
  const [selectedId, setSelectedId] = useState(firstAvailable?.id ?? "");
  const [justAdded, setJustAdded] = useState(false);

  const selected =
    product.variants.find((v) => v.id === selectedId) ?? firstAvailable;

  const soldOut = product.variants.every((v) => !v.available);
  const image = product.images[0];

  async function handleAdd() {
    if (!selected || !selected.available || loading) return;
    await addItem(selected.id, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-zinc-100">
        {image ? (
          <Image
            src={image.src}
            alt={image.altText ?? product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-widest text-zinc-400">
            No image
          </div>
        )}
        {soldOut && (
          <span className="absolute left-3 top-3 bg-zinc-900 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white">
            Sold Out
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900 leading-snug">
          {product.title}
        </h3>
        <p className="mt-1 text-sm font-medium tabular-nums text-zinc-600">
          ${Number(selected?.price ?? 0).toFixed(2)}
        </p>

        {/* Variant selector */}
        {product.variants.length > 1 && (
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="mt-3 w-full border border-zinc-300 bg-white px-3 py-2 text-xs uppercase tracking-wide text-zinc-800 focus:border-zinc-900 focus:outline-none rounded-sm"
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id} disabled={!v.available}>
                {v.title}
                {v.available ? "" : " — Sold out"}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={handleAdd}
          disabled={loading || soldOut || !selected?.available}
          className="mt-3 flex items-center justify-center gap-2 bg-zinc-900 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 rounded-sm"
        >
          {justAdded ? (
            <>
              <Check className="h-3.5 w-3.5" /> Added
            </>
          ) : soldOut ? (
            "Sold Out"
          ) : (
            "Add to Bag"
          )}
        </button>
      </div>
    </motion.div>
  );
}
