'use client';

import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface ServicesCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ServicesCard({ title, description, icon: Icon, delay = 0, size = 'md', className = '' }: ServicesCardProps) {
  const isLarge = size === 'lg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={`relative h-full ${isLarge ? 'p-10 md:p-16' : 'p-8 md:p-10'} rounded-[2rem] md:rounded-[3rem] bg-white border border-gray-100 shadow-2xl shadow-gray-200/40 group overflow-hidden flex flex-col ${className}`}
    >
      <div className={`
        ${isLarge ? 'w-20 h-20 md:w-24 md:h-24' : 'w-14 h-14 md:w-16 md:h-16'} 
        bg-[#F9F7F2] rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-8 md:mb-10 text-[#C15B32] shadow-inner group-hover:scale-110 transition-transform duration-[1s]
      `}>
        <Icon className={isLarge ? 'h-10 w-10 md:h-12 md:w-12' : 'h-6 w-6 md:h-8 md:w-8'} strokeWidth={1} />
      </div>

      <h3 className={`${isLarge ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'} font-serif text-[#1F1F1F] mb-4 md:mb-6 tracking-tight leading-tight`}>
        {title}
      </h3>
      <p className={`${isLarge ? 'text-base md:text-lg font-medium' : 'text-xs md:text-sm font-medium'} text-gray-400 font-sans leading-relaxed mb-6 md:mb-8 flex-grow`}>
        {description}
      </p>
      
      <div className="mt-4 md:mt-8 flex items-center text-[#C15B32] font-black text-[10px] uppercase tracking-[0.4em] gap-2 group-hover:gap-4 transition-all duration-500 cursor-pointer">
        Explore <ArrowRight className="h-4 w-4" />
      </div>
    </motion.div>
  );
}
