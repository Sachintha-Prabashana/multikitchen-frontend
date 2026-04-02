'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ShieldCheck, Mail, Search, Package, ShoppingBag, ArrowRight } from 'lucide-react';
import BookingForm from '@/components/public/BookingForm';
import { Card, CardContent } from '@/components/ui/components';
import api from '@/lib/api';

export default function BookingPage() {
  return (
    <div className="py-24 md:py-32 lg:py-48 bg-[#F9F7F2] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-start">
          {/* Information Column */}
          <div className="w-full lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-[10px] font-black tracking-[0.4em] text-[#C15B32] uppercase mb-8 md:mb-12 block">The Atelier Appointment</span>
              <h1 className="text-5xl md:text-7xl font-serif mb-8 md:mb-12 text-[#1F1F1F] tracking-tighter leading-[1] md:leading-[0.9]">Secure Your <br/> <span className="italic font-light">Consultation.</span></h1>
              <p className="text-xl text-gray-500 mb-12 font-serif italic leading-relaxed">
                Choose a time that works for you. Our master designers are ready to translate your vision into a structural masterpiece.
              </p>

              <div className="space-y-8 md:space-y-12">
                <InfoItem 
                  icon={Calendar}
                  title="Flexible Curation"
                  desc="Book bespoke design sessions during your preferred architecture phase."
                />
                <InfoItem 
                  icon={ShieldCheck}
                  title="Certified Mastery"
                  desc="Sessions are moderated by senior modular cabinet engineers."
                />
                <InfoItem 
                  icon={Mail}
                  title="Signature Confirmation"
                  desc="Receive a digital atelier invitation and calendar integration instantly."
                />
              </div>

              <div className="mt-12 md:mt-24 p-8 md:p-12 bg-white rounded-[2.5rem] md:rounded-[3rem] text-[#1F1F1F] shadow-2xl shadow-gray-900/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C15B32]/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <h4 className="font-serif text-2xl mb-4 relative z-10">Bespoke Enterprise?</h4>
                <p className="text-gray-400 text-sm mb-8 font-sans leading-relaxed relative z-10">For large-scale residential developments or luxury apartments, please reach out to our corporate team.</p>
                <button className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C15B32] border-b-2 border-[#C15B32] pb-1 hover:opacity-70 transition-opacity relative z-10 active:scale-95">Consult Corporate Atelier →</button>
              </div>
            </motion.div>
          </div>

          {/* Form Column */}
          <div className="w-full lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BookingForm />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex items-start group">
      <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-2xl shadow-gray-900/5 flex items-center justify-center mr-6 md:mr-10 text-[#C15B32] shrink-0 border border-gray-50 group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6 strokeWidth={1}" />
      </div>
      <div>
        <h4 className="text-xl md:text-2xl font-serif text-[#1F1F1F] mb-1 md:mb-2">{title}</h4>
        <p className="text-gray-400 text-xs md:text-sm font-sans leading-relaxed italic">{desc}</p>
      </div>
    </div>
  );
}
