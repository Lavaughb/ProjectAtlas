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
- `src/app/globals.css` — Tailwind v4 imports + CSS custom properties
- `tailwind.config.ts` — Brand colors: `atlas-black` (#050505), `atlas-cream` (#F5F5F0)

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

### Phase 3: Cart UI + State — NEXT
Remaining work:
- `src/context/CartContext.tsx` — Cart state via React Context + localStorage persistence
- `src/components/providers.tsx` — Client wrapper, mount in layout.tsx
- `src/components/cart/CartDrawer.tsx` — Slide-in cart panel (Framer Motion)
- `src/components/cart/CartLineItem.tsx` — Cart row with quantity stepper
- `src/components/products/ProductCard.tsx` — Product card with image, price, size selector, add to cart
- Wire navbar cart badge + drawer toggle
- Replace hardcoded Drop 001 section with Shopify product data

### Phase 4: Checkout — TODO
- Checkout redirect to Shopify hosted URL (`cart.webUrl`)
- Post-checkout cart cleanup (clear localStorage)
- Optional branded order confirmation page
- Remove console.log test from page.tsx
