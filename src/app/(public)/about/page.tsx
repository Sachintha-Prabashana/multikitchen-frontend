'use client';

import { motion } from 'framer-motion';
import { Target, Users, History, Award, ChefHat, Signature, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F7F2] font-sans text-[#1F1F1F]">
      {/* Editorial Hero Section */}
      <section className="py-24 md:py-32 lg:py-48 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-1/2"
            >
              <span className="text-[10px] font-black tracking-[0.4em] text-[#C15B32] uppercase mb-8 md:mb-12 block text-center lg:text-left">The MultiKitchen Story</span>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif mb-8 md:mb-16 tracking-tighter leading-[0.9] md:leading-[0.85] text-center lg:text-left">
                 Bespoke <br/>
                 <span className="italic font-light">Heritage.</span>
              </h1>
              <div className="w-16 h-1 bg-[#C15B32] mb-8 md:mb-12 mx-auto lg:mx-0" />
              <p className="text-xl md:text-2xl text-gray-500 font-serif italic mb-8 md:mb-12 leading-relaxed text-center lg:text-left">
                "MultiKitchen Co (Pvt) Ltd was founded with a singular vision: to bring the precision of modern modular cabinet engineering to the beautiful homes of Sri Lanka."
              </p>
              
              <div className="flex justify-center lg:justify-start gap-12 md:gap-20">
                <div className="space-y-1 md:space-y-2 text-center lg:text-left">
                  <h4 className="text-4xl md:text-5xl font-serif text-[#C15B32]">500+</h4>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Masterpieces Created</p>
                </div>
                <div className="space-y-1 md:space-y-2 text-center lg:text-left">
                  <h4 className="text-4xl md:text-5xl font-serif text-[#C15B32]">10+</h4>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Expert Designers</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-20 lg:mt-0"
            >
               <div className="w-full max-w-lg aspect-[4/5] bg-gray-50 rounded-[2.5rem] md:rounded-[4rem] flex items-center justify-center p-12 md:p-20 overflow-hidden relative shadow-2xl group">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[3s]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=2070&auto=format&fit=crop)' }} />
                  <div className="absolute top-8 left-8 md:top-12 md:left-12 p-6 md:p-8 bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 scale-75 md:scale-100">
                     <ChefHat className="w-8 h-8 md:w-12 md:h-12 text-[#C15B32]" />
                  </div>
               </div>
               <div className="absolute bottom-[-20px] left-[-10px] md:-bottom-12 md:-left-12 bg-[#C15B32] p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] shadow-2xl text-white max-w-[280px] md:max-w-sm rotate-[-3deg]">
                  <p className="text-base md:text-xl font-serif italic leading-relaxed text-white">"Every module we install is a promise of lifelong reliability and timeless design." — The MultiKitchen Atelier</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-32 lg:py-48 bg-[#F9F7F2]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-32">
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif text-[#1F1F1F] mb-8 md:mb-12 tracking-tighter">Our <span className="italic font-light">Values.</span></h2>
            <div className="w-px h-16 md:h-24 bg-[#C15B32]/30 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
            <ValueCard 
              icon={Target}
              title="Innovation"
              desc="We constantly refined our Japanese engineering techniques to adapt to Sri Lanka's unique tropical environment."
            />
            <ValueCard 
              icon={Users}
              title="Integrity"
              desc="Transparent material sourcing and honest lifelong cabinetry—no shortcuts on quality."
            />
            <ValueCard 
              icon={Award}
              title="Mastery"
              desc="Every craftsman is trained to achieve the 'MultiKitchen standard' of zero-seam precision."
              className="md:col-span-2 lg:col-span-1"
            />
          </div>
        </div>
      </section>

      {/* History Timeline - Editorial style */}
      <section className="py-20 md:py-32 lg:py-48 bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16 md:mb-32">
             <span className="text-[10px] font-black tracking-[0.5em] text-[#C15B32] uppercase mb-8 md:mb-12 block">The Anthology</span>
             <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif text-[#1F1F1F] mb-8 md:mb-12 tracking-tighter leading-tight">Milestones <br className="hidden sm:block" /> <span className="italic font-light">of Excellence.</span></h2>
          </div>
          
          <div className="space-y-24 md:space-y-48">
            <TimelineItem 
              year="2024"
              title="The Inception"
              desc="Founded in Nugegoda with two modular designers and a vision for precision."
              side="left"
            />
            <TimelineItem 
              year="2025"
              title="Atelier Expansion"
              desc="Opened the signature Nawala Showroom, introducing the 10-Year structural guarantee."
              side="right"
            />
            <TimelineItem 
              year="2026"
              title="Leading The Market"
              desc="Recognized as Colombo's premier atelier for high-end modular pantry solutions."
              side="left"
            />
          </div>
        </div>
      </section>

      {/* Modern CTA Bottom */}
      <section className="py-20 md:py-32 lg:py-48 bg-[#F9F7F2]">
        <div className="container mx-auto px-6">
           <div className="flex flex-col items-center">
              <Star className="h-8 w-8 md:h-10 md:w-10 text-[#C15B32] mb-8 md:mb-12" />
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif text-[#1F1F1F] text-center mb-12 md:mb-16 tracking-tighter leading-[1] md:leading-[0.9]">Start your journey <br/> <span className="italic font-light text-[#C15B32]">With Us.</span></h2>
              <button className="w-full sm:w-auto px-12 md:px-16 h-16 md:h-20 rounded-full bg-[#1F1F1F] text-[#F9F7F2] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] hover:bg-[#C15B32] transition-all shadow-2xl shadow-gray-900/40 active:scale-95">
                 Request A Brochure
              </button>
           </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon: Icon, title, desc, className = '' }: any) {
  return (
    <div className={`bg-white p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] text-center group hover:scale-[1.03] transition-transform duration-700 shadow-2xl shadow-gray-900/5 ${className}`}>
      <div className="w-20 h-20 md:w-24 md:h-24 bg-[#F9F7F2] rounded-[2rem] md:rounded-[3rem] flex items-center justify-center mb-8 md:mb-12 mx-auto text-[#C15B32] group-hover:rotate-12 transition-transform">
        <Icon className="w-8 h-8 md:w-10 md:h-10 strokeWidth={1}" />
      </div>
      <h3 className="text-2xl md:text-3xl font-serif mb-4 md:mb-6 text-[#1F1F1F]">{title}</h3>
      <p className="text-sm md:text-base text-gray-400 font-sans italic leading-relaxed">{desc}</p>
    </div>
  );
}

function TimelineItem({ year, title, desc, side }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`flex flex-col lg:flex-row items-center gap-12 md:gap-20 ${side === 'right' ? 'lg:flex-row-reverse' : ''}`}
    >
       <div className="w-full lg:w-1/2">
          <div className="aspect-[16/10] bg-gray-50 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-[2s]">
             <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          </div>
       </div>
       <div className="w-full lg:w-1/2 text-center lg:text-left">
          <span className="text-5xl md:text-6xl font-serif italic text-[#C15B32] mb-6 md:mb-8 block opacity-30">{year}</span>
          <h3 className="text-3xl md:text-4xl font-serif mb-4 md:mb-6 text-[#1F1F1F] leading-tight">{title}</h3>
          <p className="text-lg md:text-xl text-gray-500 font-serif leading-relaxed italic">{desc}</p>
          <div className="w-12 h-px bg-[#1F1F1F] mt-8 md:mt-12 mx-auto lg:mx-0" />
       </div>
    </motion.div>
  );
}
