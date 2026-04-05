"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#EAEAE5]/90 backdrop-blur-md px-6 md:px-10 py-4 flex justify-between items-center border-b border-zinc-300/50">
        <Link href="/" className="group">
          <span className="font-black text-2xl md:text-3xl tracking-tighter text-zinc-900">
            ATLAS
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {['Drops', 'Archive', 'Lookbook'].map((item) => (
            <Link
              key={item}
              href="/"
              className="relative text-[10px] uppercase tracking-[0.4em] font-medium text-zinc-500 hover:text-zinc-900 transition-colors py-1 group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-zinc-900 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative group">
            <ShoppingBag className="w-5 h-5 text-zinc-700 group-hover:text-zinc-900 transition-colors" />
            <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-zinc-900 text-white text-[7px] flex items-center justify-center font-bold">
              0
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5 text-zinc-900" /> : <Menu className="w-5 h-5 text-zinc-900" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-0 top-[57px] z-40 bg-[#EAEAE5]/95 backdrop-blur-md border-b border-zinc-300/50 px-6 py-8 flex flex-col gap-6 md:hidden"
        >
          {['Drops', 'Archive', 'Lookbook'].map((item) => (
            <Link
              key={item}
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-sm uppercase tracking-[0.3em] font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              {item}
            </Link>
          ))}
        </motion.div>
      )}
    </>
  )
}
