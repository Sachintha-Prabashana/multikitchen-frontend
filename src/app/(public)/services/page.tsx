'use client';

import { 
  LayoutGrid, Package, Columns2, Hammer, Palette, 
  Shield, Settings, Home, Star, Sparkles, TrendingUp 
} from 'lucide-react';
import ServicesCard from '@/components/public/ServicesCard';
import { motion } from 'framer-motion';

const allServices = [
  {
    title: "Signature Modular",
    desc: "Seamless, precision-engineered kitchen modules that redefine the heart of your home.",
    icon: LayoutGrid,
    size: 'lg' as const,
    span: 'col-span-12 lg:col-span-8',
    status: 'Flagship'
  },
  {
    title: "The Pantry Collection",
    desc: "Tailored storage modules that optimize every inch of your space.",
    icon: Package,
    size: 'md' as const,
    span: 'col-span-12 lg:col-span-4'
  },
  {
    title: "Designer Cabinetry",
    desc: "Finest selection of matte walnut, acrylic, and premium hardwoods.",
    icon: Columns2,
    size: 'md' as const,
    span: 'col-span-12 lg:col-span-4'
  },
  {
    title: "Expert Installations",
    desc: "On-site precision assembly by certified MultiKitchen craftsmen.",
    icon: Hammer,
    size: 'md' as const,
    span: 'col-span-12 lg:col-span-4'
  },
  {
    title: "3D Visual Studio",
    desc: "Experience your future kitchen through lifelike 4K photorealistic renderings.",
    icon: Palette,
    size: 'lg' as const,
    span: 'col-span-12 lg:col-span-8'
  }
];

export default function ServicesPage() {
  return (
    <div className="py-24 md:py-32 lg:py-48 bg-[#F9F7F2] min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="max-w-4xl mb-24 md:mb-48 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center px-4 py-2 mb-8 md:mb-12 text-[10px] font-black tracking-[0.5em] text-[#C15B32] uppercase bg-white rounded-full border border-gray-100 shadow-sm"
          >
            <Sparkles className="h-4 w-4 mr-3" /> The MultiKitchen Atelier
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl md:text-9xl font-serif text-[#1F1F1F] mb-8 md:mb-12 tracking-tighter leading-[0.9] md:leading-[0.85]"
          >
            Curated <br/> <span className="italic font-light">Solutions.</span>
          </motion.h1>
          <div className="w-px h-20 md:h-32 bg-[#C15B32]/30 mb-8 md:mb-12" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-3xl text-gray-400 font-serif italic leading-[1.4] max-w-3xl"
          >
            We blend Japanese precision with artisanal Sri Lankan craftsmanship to build kitchens that are as durable as they are beautiful.
          </motion.p>
        </div>

        {/* Spacious 12-Column Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 lg:gap-12">
          {allServices.map((service, i) => (
            <div key={i} className={service.span}>
              <div className="relative h-full group">
                {service.status && (
                  <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20">
                     <span className="px-4 py-1.5 md:px-6 md:py-2 bg-[#C15B32] text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl skew-x-[-12deg]">
                        {service.status}
                     </span>
                  </div>
                )}
                <ServicesCard 
                  title={service.title}
                  description={service.desc}
                  icon={service.icon}
                  delay={i * 0.1}
                  size={service.size}
                  className="hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-700 active:scale-95"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Editorial 'Bottom' CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-48 flex flex-col items-center bg-white rounded-[2.5rem] md:rounded-[4rem] p-12 md:p-32 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#F9F7F2] opacity-50 rounded-full blur-[80px] md:blur-[120px] -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-[3s]" />
          
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif mb-12 md:mb-16 text-center leading-[1] md:leading-[0.9] max-w-4xl relative z-10 text-[#1F1F1F]">
             Your Masterpiece <br/> <span className="italic font-light text-[#C15B32]">Starts with a Visit.</span>
          </h2>
          <button className="w-full sm:w-auto px-12 md:px-16 h-16 md:h-20 rounded-full bg-[#1F1F1F] text-[#F9F7F2] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] hover:bg-[#C15B32] transition-all relative z-10 active:scale-95 shadow-xl shadow-gray-900/20">
             Consult Our Designers
          </button>
        </motion.div>
      </div>
    </div>
  );
}
