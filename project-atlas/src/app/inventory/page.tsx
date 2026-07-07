import Navbar from "@/components/navbar";
import ProductCard from "@/components/products/ProductCard";
import { getAllProducts } from "@/lib/shopify/products";
import type { ShopifyProduct } from "@/lib/shopify/types";

export const metadata = {
  title: "Shop | Project Atlas",
  description: "Browse the full Project Atlas inventory.",
};

// Always fetch fresh inventory/availability from Shopify.
export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  let products: ShopifyProduct[] = [];
  let error = false;

  try {
    products = await getAllProducts();
  } catch (e) {
    console.error("Inventory fetch error:", e);
    error = true;
  }

  return (
    <main className="min-h-screen bg-[#EAEAE5]">
      <Navbar />

      <section className="px-6 md:px-12 pt-12 pb-8 md:pt-20">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-zinc-400 mb-3">
          The Inventory
        </p>
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-zinc-900">
          Shop All
        </h1>
        {!error && products.length > 0 && (
          <p className="mt-4 text-xs uppercase tracking-widest text-zinc-500">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        )}
      </section>

      <section className="px-6 md:px-12 pb-24">
        {error ? (
          <p className="py-24 text-center text-sm text-zinc-500">
            Unable to load inventory right now. Please try again later.
          </p>
        ) : products.length === 0 ? (
          <p className="py-24 text-center text-sm uppercase tracking-widest text-zinc-400">
            No products available yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
