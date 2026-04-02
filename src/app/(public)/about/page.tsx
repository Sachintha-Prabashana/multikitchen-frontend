'use client';

import { motion } from 'framer-motion';
import { Target, Users, History, Award, ChefHat, Signature, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F7F2] font-sans text-[#1F1F1F]">
      {/* Editorial Hero Section */}
      <section className="py-48 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <span className="text-[10px] font-black tracking-[0.4em] text-[#C15B32] uppercase mb-12 block">The MultiKitchen Story</span>
              <h1 className="text-7xl md:text-9xl font-serif mb-16 tracking-tighter leading-[0.85]">
                 Bespoke <br/>
                 <span className="italic font-light">Heritage.</span>
              </h1>
              <div className="w-16 h-1 bg-[#C15B32] mb-12" />
              <p className="text-2xl text-gray-500 font-serif italic mb-12 leading-relaxed">
                "MultiKitchen Co (Pvt) Ltd was founded with a singular vision: to bring the precision of modern modular cabinet engineering to the beautiful homes of Sri Lanka."
              </p>
              
              <div className="flex gap-20">
                <div className="space-y-2">
                  <h4 className="text-5xl font-serif text-[#C15B32]">500+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Masterpieces Created</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-5xl font-serif text-[#C15B32]">10+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Expert Designers</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 relative flex justify-end"
            >
               <div className="w-full max-w-lg aspect-[4/5] bg-gray-50 rounded-[4rem] flex items-center justify-center p-20 overflow-hidden relative shadow-2xl group">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[3s]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=2070&auto=format&fit=crop)' }} />
                  <div className="absolute top-12 left-12 p-8 bg-white/40 backdrop-blur-md rounded-2xl border border-white/40">
                     <ChefHat className="w-12 h-12 text-[#C15B32]" />
                  </div>
               </div>
               <div className="absolute -bottom-12 -left-12 bg-[#C15B32] p-12 rounded-[3.5rem] shadow-2xl text-white max-w-sm rotate-[-3deg]">
                  <p className="text-xl font-serif italic leading-relaxed">"Every module we install is a promise of lifelong reliability and timeless design." — The MultiKitchen Atelier</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-48 bg-[#F9F7F2]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-6xl md:text-8xl font-serif text-[#1F1F1F] mb-12 tracking-tighter">Our <span className="italic font-light">Values.</span></h2>
            <div className="w-px h-24 bg-[#C15B32]/30 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
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
            />
          </div>
        </div>
      </section>

      {/* History Timeline - Editorial */}
      <section className="py-48 bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-32">
             <span className="text-[10px] font-black tracking-[0.5em] text-[#C15B32] uppercase mb-12 block">The Anthology</span>
             <h2 className="text-6xl md:text-8xl font-serif text-[#1F1F1F] mb-12 tracking-tighter">Milestones <br/> <span className="italic font-light">of Excellence.</span></h2>
          </div>
          
          <div className="space-y-48">
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

      {/* Modern 'Brochure' CTA Bottom */}
      <section className="py-48 bg-[#F9F7F2]">
        <div className="container mx-auto px-6">
           <div className="flex flex-col items-center">
              <Star className="h-10 w-10 text-[#C15B32] mb-12" />
              <h2 className="text-6xl md:text-8xl font-serif text-[#1F1F1F] text-center mb-16 tracking-tighter leading-[0.9]">Start your journey <br/> <span className="italic font-light">With Us.</span></h2>
              <button className="px-16 h-20 rounded-full bg-[#1F1F1F] text-[#F9F7F2] font-black text-xs uppercase tracking-[0.4em] hover:bg-[#C15B32] transition-colors shadow-2xl shadow-gray-900/40">
                 Request A Brochure
              </button>
           </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="bg-white p-16 rounded-[4rem] text-center group hover:scale-[1.03] transition-transform duration-700 shadow-2xl shadow-gray-900/5">
      <div className="w-24 h-24 bg-[#F9F7F2] rounded-[3rem] flex items-center justify-center mb-12 mx-auto text-[#C15B32] group-hover:rotate-12 transition-transform">
        <Icon className="w-10 h-10 strokeWidth={1}" />
      </div>
      <h3 className="text-3xl font-serif mb-6 text-[#1F1F1F]">{title}</h3>
      <p className="text-gray-400 font-sans italic leading-relaxed">{desc}</p>
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
      className={`flex flex-col lg:flex-row items-center gap-20 ${side === 'right' ? 'lg:flex-row-reverse' : ''}`}
    >
       <div className="lg:w-1/2">
          <div className="aspect-[16/10] bg-gray-50 rounded-[3rem] overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-[2s]">
             <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          </div>
       </div>
       <div className="lg:w-1/2">
          <span className="text-6xl font-serif italic text-[#C15B32] mb-8 block opacity-30">{year}</span>
          <h3 className="text-4xl font-serif mb-6 text-[#1F1F1F]">{title}</h3>
          <p className="text-xl text-gray-500 font-serif leading-relaxed italic">{desc}</p>
          <div className="w-12 h-px bg-[#1F1F1F] mt-12" />
       </div>
    </motion.div>
  );
}
