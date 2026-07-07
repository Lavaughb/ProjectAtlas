# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `project-atlas/` subdirectory:

```bash
npm run dev      # Start dev server
npm run build    # Build for Vercel (SSR)
npm run lint     # Run ESLint
```

## Architecture

**Headless Shopify storefront** for a streetwear brand built with Next.js 16 + Shopify Storefront API.

**Rendering model:** Page-level components use `"use client"` with Framer Motion animations. Images use Next.js `<Image>` with Vercel's built-in optimization.

**Deployment:** Vercel only (SSR required for API routes). Environment variables managed in Vercel dashboard (Production only). For local dev, use `.env.local` with `SHOPIFY_DOMAIN` and `SHOPIFY_STOREFRONT_TOKEN`.

**Shopify integration:**
- `shopify-buy` SDK wraps all GraphQL — no raw GraphQL in this codebase
- Storefront API token lives server-side (`SHOPIFY_STOREFRONT_TOKEN`, no `NEXT_PUBLIC_` prefix)
- API routes in `src/app/api/shopify/` proxy requests to Shopify so the token never reaches the browser
- Products/collections managed in Shopify Admin (store: projectatlasclothing.myshopify.com)
- Headless sales channel installed for Storefront API access
- Checkout will redirect to Shopify hosted checkout URL

**Data flow:**
```
Browser → /api/shopify/* (Next.js Route Handlers) → shopify-buy SDK → Shopify Storefront API
```
The browser never talks to Shopify directly. All requests proxy through server-side API routes.

**Key files:**
- `src/app/page.tsx` — Main landing page with all sections (currently has product console.log for testing)
- `src/components/navbar.tsx` — Sticky nav with cart badge
- `src/lib/shopify/client.ts` — Shopify Buy SDK singleton (server-only, apiVersion: 2024-01)
- `src/lib/shopify/types.ts` — Domain types: ShopifyProduct, ShopifyVariant, ShopifyCart, ShopifyLineItem, ShopifyImage
- `src/lib/shopify/products.ts` — getAllProducts, getProductByHandle, getProductsByCollection
- `src/lib/shopify/cart.ts` — createCart, getCart, addToCart, updateCartItem, removeFromCart
- `src/app/api/shopify/products/route.ts` — GET products (supports ?collection= and ?handle= params)
- `src/app/api/shopify/cart/route.ts` — POST cart operations (action: create/add/update/remove), GET with ?cartId=
- `src/context/CartContext.tsx` — Cart state via React Context; persists cartId in localStorage; lazy cart creation on first add; add/update/remove/checkout + drawer open state (`useCart` hook)
- `src/components/providers.tsx` — Client wrapper mounting CartProvider + CartDrawer; mounted in layout.tsx
- `src/components/cart/CartDrawer.tsx` — Slide-in cart panel (Framer Motion), subtotal, empty state, Checkout button → `cart.webUrl`
- `src/components/cart/CartLineItem.tsx` — Cart row with quantity stepper (decrement to 0 removes) + remove
- `src/components/products/ProductCard.tsx` — Product card: image, price, variant `<select>`, add-to-bag with "Added" confirmation + sold-out handling
- `src/app/inventory/page.tsx` — Inventory page (server component, `force-dynamic`); fetches all products directly and renders a ProductCard grid
- `src/app/globals.css` — Tailwind v4 imports + CSS custom properties
- `tailwind.config.ts` — Brand colors: `atlas-black` (#050505), `atlas-cream` (#F5F5F0)
- `next.config.ts` — allows `cdn.shopify.com` images for next/image

## Implementation Progress

### Phase 1: Project Setup — COMPLETE
- Removed static export config (`output: 'export'`, `unoptimized`, `trailingSlash`, `basePath`)
- Installed `shopify-buy` + `@types/shopify-buy`
- Configured Shopify Headless sales channel
- Environment variables set in Vercel (Production) and `.env.local` (local dev)

### Phase 2: Data Layer — COMPLETE
- Shopify SDK client singleton with server-only token access
- Domain types decoupled from SDK internals
- Product and cart fetch/mutation functions
- API route handlers proxying all Shopify calls
- Verified: products return from store, cart creation works

### Phase 3: Cart UI + State — COMPLETE
- CartContext with React Context + localStorage cartId persistence; lazy cart creation on first add (guarded against duplicate carts)
- Providers wrapper mounts CartProvider + CartDrawer in layout.tsx
- CartDrawer (Framer Motion slide-in) + CartLineItem with quantity stepper / remove
- ProductCard with image, price, variant selector, add-to-bag (+ "Added" state, sold-out handling)
- Navbar cart badge shows live item count and opens the drawer; added "Shop" nav link → /inventory
- Added dedicated `/inventory` page (server component) listing all Shopify products
- Removed the console.log product test from page.tsx
- Allowed cdn.shopify.com in next.config.ts for next/image

### Phase 4: Checkout — MOSTLY COMPLETE (live in production)
- DONE: Checkout redirects to Shopify hosted URL (`cart.webUrl`)
- DONE: Removed console.log test from page.tsx
- **VERIFIED: two successful end-to-end test orders placed via Shopify Payments test mode (card 4242 4242 4242 4242); orders received in Shopify Admin → Orders. Test mode has since been turned OFF — store now accepts real payments.**
- Deployed to production (Vercel, main branch). Users can browse `/inventory` and purchase.
- STILL TODO (UX polish, non-blocking): clear stale cartId from localStorage after a completed checkout; optional branded order-confirmation / `?checkout=success` return page.

### Notes / gotchas
- Storefront API exposes only availability (in-stock / sold-out), not exact inventory counts. When a shopper adds more than is in stock, Shopify caps the quantity and returns a `warnings` entry (`MERCHANDISE_NOT_ENOUGH_STOCK`) that `mapCart` currently drops — surfacing it as a toast is a possible enhancement.
- shopify-buy 3.0.7's `checkout.*` methods proxy to the newer Storefront **Cart API** (ids come back as `gid://shopify/Cart/…` and `gid://shopify/CartLine/…`).
