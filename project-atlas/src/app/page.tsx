"use client";

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, CloudSun, Watch } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/navbar';

const basePath = process.env.NODE_ENV === 'production' ? '/ProjectAtlas' : '';

// Replace with your Formspree form ID from https://formspree.io
const FORMSPREE_ID = 'xojppkzz';

function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }

  return (
    <>
      <section className="py-20 md:py-32 px-6 md:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-zinc-400 mb-4">
            Be the first to know
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-zinc-800">
            Join the waitlist
          </h2>
          <p className="text-sm md:text-base text-zinc-500 font-light mb-10 leading-relaxed">
            Sign up to get early access to Drop 001. Limited pieces. No restocks.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-5 py-4 bg-white border border-zinc-300 text-sm tracking-wide text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-800 transition-colors rounded-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-zinc-900 text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors rounded-sm disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Notify Me'}
            </button>
          </form>
        </motion.div>
      </section>

      {/* Toast Notification */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white px-8 py-4 rounded-lg shadow-2xl flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-sm font-medium tracking-wide">You&apos;re on the list. Stay tuned.</span>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-red-900 text-white px-8 py-4 rounded-lg shadow-2xl flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-sm font-medium tracking-wide">Something went wrong. Try again.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#EAEAE5]">
      <Navbar />

      <section className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
        <Image
          src={`${basePath}/IMG_2135.jpeg`}
          alt="Project Atlas Group"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top md:object-[center_27%] brightness-[0.95] md:scale-95 scale-125 rounded-2xl md:rounded-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-white mb-4 md:mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              Project <br /> Atlas
            </h1>
            <button className="bg-white text-black px-6 md:px-10 py-3 md:py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all">
              Wait for the drop
            </button>
          </motion.div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row min-h-[80vh] md:h-screen border-y border-zinc-200">
        <div className="flex-1 relative h-[50vh] md:h-full group overflow-hidden">
          <Image
            src={`${basePath}/DY0A3524.jpeg`}
            alt="Always Prevail Street"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
          />
        </div>

        <div className="flex-[1] bg-zinc-900 flex flex-col justify-center px-6 py-10 md:px-20 text-white">
          <p className="text-xs md:text-base font-light uppercase tracking-widest text-zinc-400 mb-3 md:mb-4">
            Lock in and make a choice
          </p>
          <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 italic">
            "You have freedom"
          </h2>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="overflow-hidden border-y border-zinc-300 bg-[#E2E2DC] py-4">
        <motion.div
          className="flex whitespace-nowrap gap-12"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-xs md:text-sm uppercase tracking-[0.5em] font-light text-zinc-500">
              Coming Soon &mdash; Drop 001 &mdash; Project Atlas &mdash; Always Prevail &mdash;
            </span>
          ))}
        </motion.div>
      </div>

      {/* Gallery Section */}
      <section className="px-3 md:px-8 py-12 md:py-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-zinc-400 mb-8 md:mb-12 text-center"
        >
          The Collection
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[500px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 row-span-2 relative group overflow-hidden rounded-lg"
          >
            <Image src={`${basePath}/9-SOY00376edited.jpeg`} alt="Collection piece" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-1 row-span-1 relative group overflow-hidden rounded-lg"
          >
            <Image src={`${basePath}/IMG_4581.jpeg`} alt="Detail shot" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1 row-span-1 relative group overflow-hidden rounded-lg"
          >
            <Image src={`${basePath}/IMG_3535.jpeg`} alt="Lookbook" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-2 row-span-1 relative group overflow-hidden rounded-lg"
          >
            <Image src={`${basePath}/DY0A3573.jpeg`} alt="Shadow" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1 row-span-1 relative group overflow-hidden rounded-lg"
          >
            <Image src={`${basePath}/IMG_3554.jpeg`} alt="Model" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-1 row-span-1 relative group overflow-hidden rounded-lg"
          >
            <Image src={`${basePath}/IMG_4574.jpeg`} alt="Lifestyle" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </motion.div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-24 md:py-40 px-6 md:px-20 bg-zinc-900 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-zinc-500 mb-6"
          >
            The Vision
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8"
          >
            Built for those <br className="hidden md:block" />
            who move with <br className="hidden md:block" />
            <span className="text-zinc-500">intention.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-lg font-light text-zinc-400 max-w-xl leading-relaxed"
          >
            Project Atlas is more than a label. It&apos;s a movement rooted in discipline,
            creativity, and the relentless pursuit of something greater. Every piece
            is designed with purpose.
          </motion.p>
        </div>
      </section>

      {/* Anticipation / Coming Soon Grid */}
      <section className="py-16 md:py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-zinc-400 mb-10 md:mb-16 text-center"
          >
            Drop 001 &mdash; Coming Soon
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: 'Essentials', icon: Shirt, desc: 'Core pieces built to last' },
              { name: 'Outerwear', icon: CloudSun, desc: 'Layered for every season' },
              { name: 'Accessories', icon: Watch, desc: 'Details that define you' },
            ].map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative aspect-[3/4] bg-[#E0E0DA] rounded-lg overflow-hidden flex flex-col cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex-1 flex items-center justify-center relative z-10">
                  <category.icon className="w-12 h-12 md:w-16 md:h-16 text-zinc-400 group-hover:text-white group-hover:scale-110 transition-all duration-500 stroke-[1.2]" />
                </div>
                <div className="relative z-10 p-6 md:p-8 w-full">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 group-hover:text-zinc-300 transition-colors mb-1">
                    00{i + 1}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-zinc-700 group-hover:text-white transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors mt-2 font-light tracking-wide">
                    {category.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Width Gradient Break */}
      <section className="relative h-[40vh] md:h-[60vh] overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-stone-700">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,162,150,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,195,185,0.1),transparent_50%)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-zinc-400 font-light"
          >
            The Mantra
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-9xl font-black uppercase tracking-tighter text-white/95"
          >
            Always Prevail
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-zinc-500"
          />
        </div>
      </section>

      {/* Email Signup / Anticipation */}
      <WaitlistSection />

      {/* Footer */}
      <footer className="border-t border-zinc-300 py-10 md:py-14 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-black text-xl tracking-tighter text-zinc-800">Atlas&copy;</p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.4em] font-medium text-zinc-500">
            <a href="#" className="hover:text-zinc-800 transition-colors">Instagram</a>
            <a href="#" className="hover:text-zinc-800 transition-colors">Twitter</a>
            <a href="#" className="hover:text-zinc-800 transition-colors">Contact</a>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-400">
            &copy; 2026 Project Atlas. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
