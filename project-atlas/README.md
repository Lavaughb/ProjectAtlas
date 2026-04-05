# Project Atlas

A sleek, anticipation-driven clothing brand website built as a static site deployed to GitHub Pages.

## Tech Stack

- **Next.js 16** — React framework with static export (`output: 'export'`)
- **React 19** — UI library
- **TypeScript** — Type safety
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion** — Scroll and hover animations
- **Lucide React** — Icons (Shirt, CloudSun, Watch, etc.)
- **Formspree** — Waitlist form submissions (no backend needed)
- **Sentry** — Error monitoring
- **GitHub Pages** — Hosting via GitHub Actions

## Getting Started

```bash
cd project-atlas
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

## Build & Deploy

```bash
npm run build
```

Static files are exported to `out/`. Deployment to GitHub Pages is automated via `.github/workflows/nextjs.yml` on push to `main`.

## Page Structure

```
page.tsx
├── Navbar                  — Sticky nav with ATLAS wordmark, links, cart, mobile menu
├── Hero Banner             — Full-width image with "Project Atlas" title + CTA
├── Split Section           — Image left / dark quote block right
├── Marquee Ticker          — Scrolling "Coming Soon — Drop 001" text strip
├── Gallery                 — 2x4 masonry image grid with hover effects
├── Statement               — Dark section with brand manifesto text
├── Drop 001 Preview        — Three category cards (Essentials, Outerwear, Accessories)
├── Always Prevail          — Gradient banner with tagline
├── Waitlist Signup         — Email form (Formspree) with toast notification
└── Footer                  — Brand mark, social links, copyright
```

## Project Structure

```
project-atlas/
├── src/
│   ├── app/
│   │   ├── layout.tsx      — Root layout with metadata
│   │   ├── page.tsx        — Main page with all sections
│   │   └── globals.css     — Tailwind imports + theme colors
│   └── components/
│       └── navbar.tsx      — Navigation component
├── public/                 — Images (JPEG)
├── next.config.ts          — Static export + conditional basePath for GitHub Pages
└── package.json
```
