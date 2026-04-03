"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <Navbar />
      
      <section className="relative w-full h-[90vh] overflow-hidden bg-white">
        <Image 
          src="/ProjectAtlas/IMG_2135.jpeg" 
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

      <section className="flex flex-col md:flex-row h-screen border-y border-zinc-200">
        <div className="flex-1 relative h-1/2 md:h-full group overflow-hidden">
          <Image 
            src="/ProjectAtlas/DY0A3524.jpeg" 
            alt="Always Prevail Street"
            fill
            sizes="50vw"
            className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
          />
        </div>
        
        <div className="flex-[1] bg-zinc-900 flex flex-col justify-center px-8 md:px-20 text-white">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">
            "You have freedom"
          </h2>
        </div>
      </section>

      <section className="p-4 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-[500px]">
        <div className="col-span-2 row-span-2 relative group overflow-hidden">
          <Image src="/ProjectAtlas/9-SOY00376edited.jpeg" alt="Col" fill sizes="50vw" className="object-cover"/>
        </div>
        <div className="col-span-1 row-span-1 relative group overflow-hidden bg-zinc-200">
          <Image src="/ProjectAtlas/IMG_4581.jpeg" alt="Det" fill sizes="25vw" className="object-cover"/>
        </div>
        <div className="col-span-1 row-span-1 relative group overflow-hidden bg-zinc-200">
          <Image src="/ProjectAtlas/IMG_3535.jpeg" alt="Look" fill sizes="25vw" className="object-cover"/>
        </div>
        <div className="col-span-2 row-span-1 relative group overflow-hidden bg-zinc-200">
          <Image src="/ProjectAtlas/DY0A3573.jpeg" alt="Sha" fill sizes="50vw" className="object-cover"/>
        </div>
        <div className="col-span-1 row-span-1 relative group overflow-hidden bg-zinc-200">
          <Image src="/ProjectAtlas/IMG_3554.jpeg" alt="Mod" fill sizes="25vw" className="object-cover"/>
        </div>
        <div className="col-span-1 row-span-1 relative group overflow-hidden bg-zinc-200">
          <Image src="/ProjectAtlas/IMG_4574.jpeg" alt="Life" fill sizes="25vw" className="object-cover"/>
        </div>
      </section>
    </main>
  );
}
