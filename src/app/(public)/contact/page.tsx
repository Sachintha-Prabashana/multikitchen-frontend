'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/components';
import { Mail, Phone, MapPin, Send, MessageSquare, Share2, Globe, ArrowRight, Camera, Pin } from 'lucide-react';

import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-24 md:py-32 lg:py-48 bg-[#F9F7F2] relative overflow-hidden min-h-screen font-sans text-[#1F1F1F]">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#C15B32]/10 rounded-full blur-[120px] -mr-32 -mt-32 opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center px-4 py-2 mb-8 md:mb-12 text-[10px] font-black tracking-[0.5em] text-[#C15B32] uppercase bg-white rounded-full border border-gray-100 shadow-sm"
          >
             The MultiKitchen Atelier
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl md:text-9xl font-serif mb-8 md:mb-12 tracking-tighter leading-[0.9] md:leading-[0.85]"
          >
            Connect <br/> <span className="italic font-light">With Us.</span>
          </motion.h1>
          <div className="w-px h-16 md:h-24 bg-[#C15B32]/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-start">
          
          {/* Contact Details - Editorial Column */}
          <motion.div 
            className="lg:col-span-5 space-y-12 md:space-y-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <div className="space-y-12 md:space-y-16">
              <ContactInfo 
                  icon={Mail} 
                  title="Portfolio Inquiries" 
                  detail="sales@multikitchen.lk" 
                  desc="For bespoke design and installation requests." 
              />
              <ContactInfo 
                  icon={Phone} 
                  title="The Atelier Line" 
                  detail="+94 71 272 9938" 
                  desc="Direct line to our showroom manager." 
              />
              <ContactInfo 
                 icon={MapPin} 
                 title="Nugegoda Showroom" 
                 detail="176 Nawala Rd, Sri Lanka" 
                 desc="Visit us to touch and feel our materials."
                 cta={{ label: "Showroom Route", href: "https://maps.google.com/?q=176+Nawala+Rd,+Nugegoda" }}
              />
            </div>

            <div className="pt-12 md:pt-20 border-t border-gray-200">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-gray-400">Social Narratives</h4>
              <div className="flex gap-10 text-[#1F1F1F]">
                <Camera className="h-6 w-6 hover:text-[#C15B32] transition-colors cursor-pointer" />
                <Pin className="h-6 w-6 hover:text-[#C15B32] transition-colors cursor-pointer" />
                <Globe className="h-6 w-6 hover:text-[#C15B32] transition-colors cursor-pointer" />
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Editorial style */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="bg-white p-6 md:p-16 lg:p-24 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl shadow-gray-900/5 border border-gray-100">
              <h3 className="text-3xl md:text-4xl font-serif mb-4 md:mb-6 text-[#1F1F1F]">Send a message</h3>
              <p className="text-gray-400 font-serif italic mb-10 md:mb-16">"Tell us about your home and your dream kitchen. Our designers will reach out within 24 hours."</p>

              {submitted ? (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="py-16 md:py-24 text-center bg-[#F9F7F2] rounded-[2rem] md:rounded-[3rem] px-4 md:px-8"
                >
                  <h4 className="font-serif text-2xl md:text-3xl mb-4 text-[#C15B32]">Inquiry Received.</h4>
                  <p className="text-lg font-serif italic text-gray-400">Thank you. Expect a call from our design consultant shortly.</p>
                  <button 
                    className="mt-8 md:mt-12 bg-[#1F1F1F] text-[#F9F7F2] px-12 h-16 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.4em] active:scale-95 transition-transform shadow-xl"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Name</label>
                      <input 
                        className="w-full bg-[#F9F7F2] border-none rounded-xl md:rounded-2xl h-14 md:h-16 px-6 font-serif text-lg md:text-xl focus:ring-2 focus:ring-[#C15B32]/20 transition-all outline-none"
                        placeholder="Full Name"
                        required 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Email</label>
                      <input 
                        type="email"
                        className="w-full bg-[#F9F7F2] border-none rounded-xl md:rounded-2xl h-14 md:h-16 px-6 font-serif text-lg md:text-xl focus:ring-2 focus:ring-[#C15B32]/20 transition-all outline-none"
                        placeholder="example@design.com"
                        required 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Message</label>
                    <textarea 
                      className="w-full bg-[#F9F7F2] border-none rounded-[1.5rem] md:rounded-[2rem] h-48 md:h-64 p-6 md:p-8 font-serif text-lg md:text-xl focus:ring-2 focus:ring-[#C15B32]/20 transition-all outline-none resize-none"
                      placeholder="Share your ideas or specific requirements..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full h-16 md:h-20 rounded-full bg-[#1F1F1F] text-[#F9F7F2] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] hover:bg-[#C15B32] transition-all shadow-2xl shadow-gray-900/40 flex items-center justify-center gap-4 group active:scale-95">
                    Send Inquiry <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                  
                  <div className="pt-8 md:pt-12 mt-8 md:mt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Review our atelier</p>
                     <Link href="https://search.google.com/local/writereview?placeid=ChIJ-XXXXXXXXXX" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-[#C15B32] border-b border-[#C15B32] hover:opacity-70 transition-opacity">
                        Write a Google Review
                     </Link>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon: Icon, title, detail, desc, cta }: any) {
  return (
    <div className="flex items-start group">
      <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-2xl shadow-gray-900/5 group-hover:scale-110 group-hover:bg-[#F9F7F2] transition-all border border-gray-50 flex items-center justify-center mr-6 md:mr-10 text-[#C15B32] shrink-0">
        <Icon className="h-5 w-5 md:h-6 md:w-6 strokeWidth={1}" />
      </div>
      <div>
        <h4 className="text-xl md:text-2xl font-serif text-[#1F1F1F] mb-1 md:mb-2">{title}</h4>
        <p className="text-[#C15B32] font-serif italic text-xl md:text-2xl mb-2 md:mb-4 leading-tight">{detail}</p>
        <p className="text-xs md:text-sm text-gray-400 font-sans leading-relaxed mb-4 md:mb-6">{desc}</p>
        {cta && (
          <Link href={cta.href} target="_blank" className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F] border-b border-[#1F1F1F] hover:text-[#C15B32] hover:border-[#C15B32] transition-all">
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  );
}
