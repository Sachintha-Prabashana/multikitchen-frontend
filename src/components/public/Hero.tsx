'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/components';
import Link from 'next/link';
import { ChefHat, ArrowRight, Star, Signature } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-48 overflow-hidden bg-[#F9F7F2]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C15B32] mb-6 block">
               The MultiKitchen Atelier — Since 2024
            </span>
            <h1 className="text-7xl md:text-9xl font-serif text-[#1F1F1F] tracking-tighter leading-[0.85] mb-12">
               Precision <br/>
               <span className="italic font-light">Cabinetry.</span>
            </h1>
            <div className="w-px h-24 bg-[#C15B32]/20 mx-auto mb-12" />
            <p className="max-w-2xl text-lg text-gray-500 font-serif italic leading-relaxed mb-16">
               "Designing the heart of the home with the precision of Japanese engineering and the soul of Sri Lankan craftsmanship."
            </p>
          </motion.div>

          {/* Editorial Image Trio (Mockup with boxes) */}
          <div className="grid grid-cols-12 gap-8 w-full max-w-6xl mb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="col-span-12 lg:col-span-7 aspect-[16/10] bg-gray-100 rounded-[2rem] overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[2s]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556911220-e15595b6a981?q=80&w=2070&auto=format&fit=crop)' }} />
              <div className="absolute inset-x-8 bottom-8 p-8 bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 text-left">
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#C15B32]">Collection 2026</span>
                 <h3 className="text-2xl font-serif text-[#1F1F1F]">The Minimalist Pantry</h3>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="col-span-12 lg:col-span-5 aspect-[1/1] bg-gray-200 rounded-[2rem] overflow-hidden relative group translate-y-20 lg:translate-y-40"
            >
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[2s]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2070&auto=format&fit=crop)' }} />
              <div className="absolute top-8 right-8 p-6 bg-[#C15B32] text-white rounded-2xl shadow-xl">
                 <span className="text-[10px] font-black uppercase tracking-widest block mb-2">Heritage Focus</span>
                 <p className="font-serif italic">Nugegoda Showroom</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center gap-12 mt-40"
          >
             <Link href="/booking">
                <button className="px-16 h-20 rounded-full bg-[#1F1F1F] text-[#F9F7F2] font-black text-xs uppercase tracking-[0.4em] hover:bg-[#C15B32] transition-colors shadow-2xl shadow-gray-900/40">
                   Start Your Consultation
                </button>
             </Link>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                10 Year Structural Warranty — Zero-Seam Finish
             </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
