'use client';

import { motion } from 'framer-motion';
import { Maximize2, ExternalLink } from 'lucide-react';

interface GalleryCardProps {
  image: string;
  title: string;
  category: string;
  delay?: number;
  span?: string;
}

export default function GalleryCard({ image, title, category, delay = 0, span = 'col-span-12 md:col-span-4' }: GalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1 }}
      className={`${span} group relative aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white cursor-pointer shadow-2xl shadow-gray-900/5 hover:-translate-y-4 transition-all duration-700`}
    >
      {/* Visual Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
      </div>

      {/* Floating Atelier Info */}
      <div className="absolute inset-x-4 bottom-4 md:inset-x-12 md:bottom-12 z-10 md:translate-y-12 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-700">
        <div className="p-6 md:p-10 bg-white/60 backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] border border-white/40 shadow-2xl">
           <div className="flex justify-between items-center mb-2 md:mb-4">
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#C15B32]">{category}</span>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1F1F1F] text-white rounded-full flex items-center justify-center scale-75 md:group-hover:scale-100 transition-transform duration-700">
                 <Maximize2 className="h-3 w-3 md:h-4 md:w-4" />
              </div>
           </div>
           <h3 className="text-xl md:text-3xl font-serif text-[#1F1F1F] leading-[1] md:leading-[0.9] tracking-tighter">{title}</h3>
        </div>
      </div>

      {/* Signature Label */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12">
         <div className="px-4 py-2 md:px-6 md:py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-40 md:opacity-0 group-hover:opacity-100 transition-all duration-700">
            Portfolio Detail
         </div>
      </div>
    </motion.div>
  );
}
