// src/components/navbar.tsx
"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight } from 'lucide-react'

// Define how we want the text to slide and fade
const logoVariants = {
  initial: { opacity: 0, x: -10, display: 'none' },
  hover: { opacity: 1, x: 0, display: 'inline-block' },
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-atlas-cream/90 backdrop-blur-sm px-6 md:px-10 py-5 flex justify-between items-center border-b border-zinc-200">
      
      {/* 🤯 THE DYNAMIC ATLAS LOGO */}
      <Link href="/">
        <motion.div 
          className="flex items-center gap-1 group"
          initial="initial"
          whileHover="hover" // Triggers the animation on all child motions
        >
          {/* Static, sharp 'A' */}
          <span className="font-black text-3xl tracking-tighter text-atlas-black">
            A
          </span>
          {/* The expanding 'TLAS' */}
          <motion.span 
            variants={logoVariants}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-black text-3xl tracking-tighter text-atlas-black origin-left"
          >
            tlas
          </motion.span>
          <span className="text-zinc-300 font-light text-2xl">©</span>
        </motion.div>
      </Link>

      {/* MINIMAL NAV LINKS (Desktop only for performance) */}
      <div className="hidden md:flex space-x-12 text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-600">
        <Link href="/" className="hover:text-black transition-colors">Drops</Link>
        <Link href="/" className="hover:text-black transition-colors">Archive</Link>
        <Link href="/" className="hover:text-black transition-colors">Technical</Link>
      </div>

      {/* CART */}
      <button className="flex items-center gap-2 group">
        <span className="text-xs uppercase font-bold tracking-widest text-zinc-900">Cart</span>
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-zinc-900" />
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-zinc-900 text-white text-[8px] flex items-center justify-center font-bold">
            0
          </span>
        </div>
      </button>
    </nav>
  )
}