'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/components';
import Link from 'next/link';
import { ChefHat, ArrowRight, Star, Signature, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-48 overflow-hidden bg-[#F9F7F2]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-20 w-full max-w-4xl"
          >
            <div className="inline-flex items-center px-4 py-2 mb-8 md:mb-12 text-[10px] font-black tracking-[0.4em] text-[#C15B32] uppercase bg-white/50 backdrop-blur-sm rounded-full border border-[#C15B32]/10">
               <Sparkles className="h-3 w-3 mr-2" /> The MultiKitchen Atelier — Since 2024
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif text-[#1F1F1F] tracking-tighter leading-[0.9] mb-8 md:mb-12">
               Precision <br/>
               <span className="italic font-light">Cabinetry.</span>
            </h1>
            <div className="w-px h-16 md:h-24 bg-[#C15B32]/30 mx-auto mb-8 md:mb-12" />
            <p className="max-w-2xl mx-auto text-base md:text-xl text-gray-500 font-serif italic leading-relaxed mb-12 md:mb-16 px-4">
               "Designing the heart of the home with the precision of Japanese engineering and the soul of Sri Lankan craftsmanship."
            </p>
          </motion.div>

          {/* Editorial Image Trio */}
          <div className="grid grid-cols-12 gap-6 md:gap-8 w-full max-w-7xl mb-12 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1.2 }}
              className="col-span-12 lg:col-span-7 aspect-[4/3] sm:aspect-[16/10] bg-gray-100 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative group shadow-2xl shadow-gray-900/5"
            >
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[3s]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556911220-e15595b6a981?q=80&w=2070&auto=format&fit=crop)' }} />
              <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8 p-6 md:p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 text-left">
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#C15B32]">Collection 2026</span>
                 <h3 className="text-xl md:text-2xl font-serif text-[#1F1F1F]">The Minimalist Pantry</h3>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1.2 }}
              className="col-span-12 lg:col-span-5 aspect-square sm:aspect-[4/3] lg:aspect-square bg-gray-200 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative group lg:translate-y-24"
            >
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[3s]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2070&auto=format&fit=crop)' }} />
              <div className="absolute top-4 right-4 md:top-8 md:right-8 p-4 md:p-6 bg-[#C15B32] text-white rounded-2xl shadow-xl">
                 <span className="text-[10px] font-black uppercase tracking-widest block mb-1">Heritage Focus</span>
                 <p className="font-serif italic text-sm md:text-base">Nugegoda Showroom</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center gap-8 md:gap-12 mt-12 lg:mt-40"
          >
             <Link href="/booking" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-12 md:px-20 h-16 md:h-20 rounded-full bg-[#1F1F1F] text-[#F9F7F2] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] hover:bg-[#C15B32] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gray-900/40">
                   Start Your Consultation
                </button>
             </Link>
             <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 opacity-40">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1F1F1F]">
                  10 Year Structural Warranty
                </p>
                <div className="hidden md:block w-1 h-1 rounded-full bg-[#C15B32]" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1F1F1F]">
                  Zero-Seam Japanese Finish
                </p>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
