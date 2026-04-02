'use client';

import { motion } from 'framer-motion';
import { Sparkles, Star, MapPin, ExternalLink, Filter } from 'lucide-react';
import GalleryCard from '@/components/public/GalleryCard';

const projects = [
  {
    title: "Nawala Modern Minimalist",
    category: "Modular Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15595b6a981?q=80&w=2070&auto=format&fit=crop",
    span: "col-span-12 lg:col-span-8 row-span-2",
  },
  {
    title: "Nugegoda Heritage Pantry",
    category: "Pantry Solutions",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2070&auto=format&fit=crop",
    span: "col-span-12 lg:col-span-4",
  },
  {
    title: "Colombo 07 Executive",
    category: "Custom Cabinetry",
    image: "https://images.unsplash.com/photo-1596783047904-0648483017a4?q=80&w=2070&auto=format&fit=crop",
    span: "col-span-12 lg:col-span-4",
  },
  {
    title: "Borella Compact Living",
    category: "Modular Kitchen",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2070&auto=format&fit=crop",
    span: "col-span-12 lg:col-span-4",
  },
  {
    title: "Battaramulla Smart Kitchen",
    category: "Innovative Hardware",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop",
    span: "col-span-12 lg:col-span-8",
  },
  {
    title: "Rajagiriya Urban Loft",
    category: "Pantry Solutions",
    image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=2070&auto=format&fit=crop",
    span: "col-span-12 lg:col-span-4",
  }
];

export default function GalleryPage() {
  return (
    <div className="py-48 bg-[#F9F7F2] min-h-screen relative overflow-hidden font-sans text-[#1F1F1F]">
      {/* Animated Aura */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C15B32]/10 rounded-full blur-[150px] -mr-96 -mt-96 opacity-60" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center px-4 py-2 mb-12 text-[10px] font-black tracking-[0.5em] text-[#C15B32] uppercase bg-white rounded-full border border-gray-100"
            >
              <Sparkles className="h-4 w-4 mr-3" /> The MultiKitchen Atelier
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-9xl font-serif text-[#1F1F1F] mb-12 tracking-tighter leading-[0.85]"
            >
              Portfolio of <br/> <span className="italic font-light">Excellence.</span>
            </motion.h1>
            <div className="w-px h-24 bg-[#C15B32]/30 mb-12" />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl text-gray-400 font-serif italic leading-[1.4] max-w-3xl"
            >
              Explore our curation of modular designs across Sri Lanka’s finest addresses.
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-4">
             <FilterChip label="All Portfolios" active />
             <FilterChip label="Kitchens" />
             <FilterChip label="Pantry" />
          </div>
        </div>

        {/* 12-Column Bento Project Grid */}
        <div className="grid grid-cols-12 gap-12 mb-48">
          {projects.map((project, i) => (
            <GalleryCard 
              key={i}
              title={project.title}
              category={project.category}
              image={project.image}
              span={project.span}
              delay={0.1 * i}
            />
          ))}
        </div>

        {/* Google Reviews & CTA Section - Atelier Style */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[4rem] p-16 md:p-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center shadow-2xl shadow-gray-900/5 border border-gray-100"
        >
           <div>
              <div className="flex items-center gap-2 mb-10">
                 {[1,2,3,4,5].map(star => <Star key={star} className="h-6 w-6 fill-[#C15B32] text-[#C15B32]" />)}
                 <span className="ml-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Google Heritage Rating</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif mb-12 text-[#1F1F1F] leading-[0.9] tracking-tighter">Trusted by <br/> <span className="text-[#C15B32] italic font-light">Colombo's Elite.</span></h2>
              <p className="text-xl text-gray-400 font-serif italic mb-16 leading-relaxed">
                 Our reputation is built on timber, steel, and transparency. Each review is a testament to our decade-long commitment to your home.
              </p>
              <div className="flex flex-wrap gap-12">
                 <button className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1F1F1F] border-b-2 border-[#1F1F1F] pb-2 hover:text-[#C15B32] hover:border-[#C15B32] transition-all flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Showroom Route
                 </button>
                 <button className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1F1F1F] border-b-2 border-[#1F1F1F] pb-2 hover:text-[#C15B32] hover:border-[#C15B32] transition-all flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> Write A Narrative
                 </button>
              </div>
           </div>
           
           <div className="relative group">
              <div className="aspect-[4/5] bg-[#F9F7F2] rounded-[4rem] p-16 shadow-inner overflow-hidden relative flex flex-col justify-end">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl">
                    <MapPin className="h-10 w-10 text-[#C15B32] strokeWidth={1}" />
                 </div>
                 <h3 className="text-4xl font-serif text-[#1F1F1F] mb-4">Nugegoda <br/> Headquarters</h3>
                 <p className="text-gray-400 font-serif italic mb-12">176 Nawala Rd, Nugegoda</p>
                 
                 <div className="absolute top-16 right-[-20px] bg-[#C15B32] p-12 rounded-[3rem] shadow-2xl text-white rotate-[15deg] group-hover:rotate-[5deg] transition-transform duration-700">
                    <span className="text-[5rem] font-serif italic block leading-none mb-2">5.0</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-70">Design Mastery</span>
                 </div>
              </div>
           </div>
        </motion.div>

      </div>
    </div>
  );
}

function FilterChip({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <button className={`
      px-10 h-16 rounded-full font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl
      ${active ? 'bg-[#1F1F1F] text-white shadow-gray-900/20' : 'bg-white text-gray-400 border border-gray-100 hover:border-[#C15B32] hover:text-[#C15B32] shadow-gray-200/20'}
    `}>
      {label}
    </button>
  );
}
