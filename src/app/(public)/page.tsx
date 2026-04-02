'use client';

import { ChefHat, LayoutGrid, Palette, ShieldCheck, Heart, MapPin, Phone, ArrowRight, Sparkles, Box, Droplets, Flame, Hammer, Star, Award, Shield } from 'lucide-react';
import Hero from '@/components/public/Hero';
import ServicesCard from '@/components/public/ServicesCard';
import Testimonials from '@/components/public/Testimonials';
import Link from 'next/link';
import { motion } from 'framer-motion';

const featurePreviews = [
  {
    title: "Signature Bespoke",
    desc: "Every module is hand-calibrated for your space, ensuring a zero-seam finish that only an atelier can provide.",
    icon: Palette,
    size: 'lg' as const,
    span: 'col-span-12 lg:col-span-8'
  },
  {
    title: "Eco-Conscious Bone",
    desc: "100% sustainable materials that respect your health and the environment.",
    icon: Heart,
    size: 'md' as const,
    span: 'col-span-12 lg:col-span-4'
  },
  {
    title: "Maritime Marine",
    desc: "Plywood cores engineered to withstand the unique humidity of Sri Lanka.",
    icon: Droplets,
    size: 'md' as const,
    span: 'col-span-12 lg:col-span-4'
  },
  {
    title: "Atelier Precision",
    desc: "Japanese cabinetry machinery meets traditional artisanal joinery.",
    icon: Hammer,
    size: 'lg' as const,
    span: 'col-span-12 lg:col-span-8'
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F7F2] font-sans text-[#1F1F1F]">
      <Hero />
      
      {/* The MultiKitchen Promise Section - Editorial style */}
      <section className="py-20 md:py-32 lg:py-48 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-12 gap-10 lg:gap-16 items-center">
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="col-span-12 lg:col-span-6"
             >
                <span className="text-[10px] font-black tracking-[0.4em] text-[#C15B32] uppercase mb-8 md:mb-12 block">The MultiKitchen Promise</span>
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif mb-8 md:mb-12 leading-[0.95] md:leading-[0.9] tracking-tighter">10 Years of <br/> <span className="italic font-light">Structural Integrity.</span></h2>
                <div className="w-16 h-1 bg-[#C15B32] mb-8 md:mb-12" />
                <p className="text-lg md:text-xl text-gray-500 font-serif italic leading-relaxed mb-12 md:mb-16">
                   "We don’t just build kitchens; we build a legacy. Every joint, every hinge, and every surface is engineered to withstand the test of time, backed by our comprehensive decade-long warranty."
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                   <div className="space-y-4">
                      <ShieldCheck className="h-8 w-8 md:h-10 md:w-10 text-[#C15B32] strokeWidth={1}" />
                      <h4 className="font-serif text-xl md:text-2xl">Peace of Mind</h4>
                      <p className="text-sm text-gray-400 font-medium">Full structural coverage for a decade of daily usage.</p>
                   </div>
                   <div className="space-y-4">
                      <Star className="h-8 w-8 md:h-10 md:w-10 text-[#C15B32] strokeWidth={1}" />
                      <h4 className="font-serif text-xl md:text-2xl">Artisanal Finish</h4>
                      <p className="text-sm text-gray-400 font-medium">Bespoke handle profiles and unique textured boards.</p>
                   </div>
                </div>
             </motion.div>

             <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end mt-12 lg:mt-0">
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1.2 }}
                   className="w-full aspect-[4/5] sm:aspect-video lg:aspect-square max-h-[600px] bg-gray-50 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-2xl group"
                >
                   <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[3s]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596783047904-0648483017a4?q=80&w=2070&auto=format&fit=crop)' }} />
                   <div className="absolute top-6 left-6 md:top-12 md:left-12 p-6 md:p-8 bg-white/40 backdrop-blur-md rounded-2xl border border-white/40">
                      <p className="text-[10px] md:text-sm font-black uppercase tracking-widest mb-1 md:mb-2">Heritage Case Study</p>
                      <h3 className="text-xl md:text-2xl font-serif">Colombo 07 Residence</h3>
                   </div>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* Atelier Feature Section */}
      <section className="py-20 md:py-32 lg:py-48 bg-[#F9F7F2] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-32">
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif text-[#1F1F1F] mb-8 md:mb-12 tracking-tighter">Why We Are <br className="sm:hidden" /> <span className="italic font-light">Different.</span></h2>
            <div className="w-px h-16 md:h-24 bg-[#C15B32]/30 mx-auto" />
          </div>
          
          <div className="grid grid-cols-12 gap-6 lg:gap-10">
            {featurePreviews.map((f, i) => (
              <div key={i} className={f.span}>
                 <ServicesCard 
                   title={f.title}
                   description={f.desc}
                   icon={f.icon}
                   delay={i * 0.1}
                   size={f.size}
                   className="hover:scale-[1.02] transition-transform duration-700"
                 />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Modern 'Brochure' CTA Section */}
      <section className="py-20 md:py-32 lg:py-48 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C15B32] mb-8 md:mb-12">Experience MultiKitchen</span>
            <h2 className="text-5xl sm:text-7xl md:text-9xl font-serif text-[#1F1F1F] mb-12 md:mb-20 tracking-tighter leading-[0.95] md:leading-[0.85] max-w-5xl">Your Masterpiece <br/> <span className="italic font-light">Starts Here.</span></h2>
            
            <div className="flex flex-col sm:flex-row gap-8 md:gap-12 w-full sm:w-auto">
              <Link href="/booking" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#1F1F1F] text-[#F9F7F2] px-12 md:px-16 h-16 md:h-20 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.4em] hover:bg-[#C15B32] transition-colors shadow-2xl shadow-gray-900/40">
                  Book A Design Visit
                </button>
              </Link>
              <Link href="/gallery" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto border-b-2 border-[#1F1F1F] text-[#1F1F1F] h-16 md:h-20 font-black text-[10px] uppercase tracking-[0.5em] hover:text-[#C15B32] hover:border-[#C15B32] transition-all">
                  View Portfolios
                </button>
              </Link>
            </div>
            
            <div className="mt-20 md:mt-40 pt-12 md:pt-20 border-t border-gray-100 w-full flex flex-col md:flex-row justify-between items-center gap-8">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 leading-relaxed text-center md:text-left">
                  176 Nawala Rd, Nugegoda <br className="hidden md:block" /> Sri Lanka
               </p>
               <div className="flex gap-12">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 cursor-pointer hover:text-[#C15B32] transition-colors">Instagram</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 cursor-pointer hover:text-[#C15B32] transition-colors">Pinterest</span>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
