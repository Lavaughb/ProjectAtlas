"use client"; // This MUST be the very first line

import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <Navbar />
      
      {/* ⚡ HERO BANNER - IMG_2135 */}
      <section className="relative w-full h-[90vh] overflow-hidden bg-white">
        <Image 
          src="/IMG_2135.jpeg" 
          alt="Project Atlas Group"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top brightness-[0.95]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 md:p-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-white mb-6">
              Project <br /> Atlas
            </h1>
            <button className="bg-white text-black px-10 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all">
              Wait for the drop
            </button>
          </motion.div>
        </div>
      </section>

      {/* 🏙️ CINEMATIC BREAKOUT - DY0A3524 */}
      <section className="flex flex-col md:flex-row h-screen border-y border-zinc-200">
        <div className="flex-1 relative h-1/2 md:h-full group overflow-hidden">
          <Image 
            src="/DY0A3524.jpeg" 
            alt="Always Prevail Street"
            fill
            sizes="50vw"
            className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
          />
          <div className="absolute top-6 left-6 text-white mix-blend-difference">
            <p className="text-[10px] tracking-[0.4em] uppercase font-bold">Urban Recon</p>
          </div>
        </div>
        
        <div className="flex-[1] bg-zinc-900 flex flex-col justify-center px-8 md:px-20 text-white">
          <p className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-6">The Philosophy</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">
            "You have freedom"
          </h2>
        </div>
      </section>

      {/* 📂 THE DYNAMIC BENTO GRID */}
      <section className="p-4 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-[500px]">
        
        {/* Full Height Feature */}
        <div className="col-span-2 row-span-2 relative group overflow-hidden">
          <Image 
            src="/9-SOY00376edited.jpeg" 
            alt="Collection" 
            fill 
            sizes="50vw" 
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md p-4 border border-white/20">
             <p className="text-white text-[9px] uppercase font-bold tracking-widest text-center">New Arrivals</p>
          </div>
        </div>

        {/* Detail Shots */}
        <div className="col-span-1 row-span-1 relative group overflow-hidden bg-zinc-200">
          <Image src="/IMG_4581.jpeg" alt="Detail" fill sizes="25vw" className="object-cover group-hover:scale-105 transition-transform duration-700"/>
        </div>

        <div className="col-span-1 row-span-1 relative group overflow-hidden bg-zinc-200">
          <Image src="/IMG_3535.jpeg" alt="Lookbook" fill sizes="25vw" className="object-cover group-hover:scale-105 transition-transform duration-700"/>
        </div>

        <div className="col-span-2 row-span-1 relative group overflow-hidden bg-zinc-200">
          <Image src="/DY0A3573.jpeg" alt="Shadow" fill sizes="50vw" className="object-cover group-hover:scale-105 transition-transform duration-700"/>
        </div>

        <div className="col-span-1 row-span-1 relative group overflow-hidden bg-zinc-200">
          <Image src="/IMG_3554.jpeg" alt="Model" fill sizes="25vw" className="object-cover group-hover:scale-105 transition-transform duration-700"/>
        </div>

        <div className="col-span-1 row-span-1 relative group overflow-hidden bg-zinc-200">
          <Image src="/IMG_4574.jpeg" alt="Lifestyle" fill sizes="25vw" className="object-cover group-hover:scale-105 transition-transform duration-700"/>
        </div>

      </section>

      <footer className="py-20 bg-zinc-900 text-white flex flex-col items-center text-center px-6">
        <h3 className="text-[10px] tracking-[1em] uppercase mb-8 opacity-50 text-white">Atlas Lab © 2026</h3>
        <div className="flex gap-12 text-[10px] uppercase font-bold tracking-widest">
            <a href="#" className="hover:text-zinc-400">Instagram</a>
            <a href="#" className="hover:text-zinc-400">Archive</a>
            <a href="#" className="hover:text-zinc-400">Legal</a>
        </div>
      </footer>
    </main>
  );
}
