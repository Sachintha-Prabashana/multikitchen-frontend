'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Plus, X, Send } from 'lucide-react';
import axios from 'axios';

const testimonials = [
  {
    name: "Dinithi Perera",
    role: "Homeowner",
    location: "Colombo 07",
    content: "The precision of MultiKitchen's modular design is unmatched. Our kitchen feels like a piece of art that we use every single day.",
    rating: 5
  },
  {
    name: "Sashini de Silva",
    role: "Interior Architect",
    location: "Mount Lavinia",
    content: "As an architect, I value details. MultiKitchen's zero-seam finish and Japanese hardware are why I recommend them to all my luxury clients.",
    rating: 5
  },
  {
    name: "Rohan Gunawardena",
    role: "Restaurateur",
    location: "Nugegoda",
    content: "I needed a pantry that could handle high-intensity use while maintaining a sleek aesthetic. MultiKitchen delivered beyond my expectations.",
    rating: 5
  }
];

export default function Testimonials() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/reviews', formData);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setShowForm(false);
        setFormData({ name: '', comment: '', rating: 5 });
      }, 3000);
    } catch (error) {
      console.error('Error submitting review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-48 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-12 inline-block"
          >
             <Quote className="h-20 w-20 text-[#C15B32] opacity-10 mx-auto" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-serif text-[#1F1F1F] mb-12 tracking-tighter"
          >
            Kind <span className="italic font-light text-[#C15B32]">Words.</span>
          </motion.h2>
          <div className="w-px h-24 bg-[#C15B32]/30 mx-auto mb-16" />
          
          <button 
            onClick={() => setShowForm(true)}
            className="px-10 h-16 rounded-full bg-[#1F1F1F] text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 mx-auto hover:bg-[#C15B32] transition-colors shadow-2xl shadow-gray-900/10 group"
          >
            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" /> Share Your Experience
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className="bg-[#F9F7F2] p-16 rounded-[4rem] flex flex-col items-center text-center relative hover:scale-[1.05] transition-transform duration-700"
            >
              <div className="flex mb-8 gap-2">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#C15B32] fill-current" />
                ))}
              </div>

              <p className="text-[#1F1F1F] mb-12 font-serif italic text-2xl leading-relaxed flex-grow">
                "{t.content}"
              </p>

              <div>
                <h4 className="font-serif text-2xl text-[#1F1F1F] mb-2">{t.name}</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C15B32]">{t.role} — {t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1F1F1F]/40 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-xl bg-white rounded-[4rem] p-12 shadow-3xl relative overflow-hidden"
            >
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-10 right-10 p-4 rounded-full bg-[#F9F7F2] hover:bg-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center mb-12">
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C15B32] mb-6">Testimonial</div>
                 <h3 className="text-4xl font-serif text-[#1F1F1F] tracking-tighter">Your <span className="italic font-light">Story.</span></h3>
              </div>

              {isSuccess ? (
                <div className="py-20 text-center animate-bounce">
                  <Star className="h-16 w-16 text-[#C15B32] mx-auto mb-6 fill-current" />
                  <p className="text-2xl font-serif italic text-gray-500">Thank you for sharing your journey with us.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 text-left">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                    <input 
                      type="text"
                      className="w-full h-16 bg-[#F9F7F2] border-0 rounded-2xl px-8 font-serif text-xl focus:ring-2 focus:ring-[#C15B32]/20 transition-all outline-none"
                      placeholder="e.g., Jane Perera"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Experience Details</label>
                    <textarea 
                      className="w-full h-48 bg-[#F9F7F2] border-0 rounded-3xl p-8 font-serif text-xl focus:ring-2 focus:ring-[#C15B32]/20 transition-all outline-none resize-none"
                      placeholder="How has your new kitchen transformed your home?"
                      required
                      value={formData.comment}
                      onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    />
                  </div>

                  <div className="flex justify-between items-center bg-[#F9F7F2] p-8 rounded-3xl">
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Rating</span>
                     <div className="flex gap-2">
                       {[1,2,3,4,5].map(s => (
                         <Star 
                            key={s} 
                            className={`h-6 w-6 cursor-pointer transition-all ${s <= formData.rating ? 'fill-[#C15B32] text-[#C15B32]' : 'text-gray-200'}`}
                            onClick={() => setFormData({...formData, rating: s})}
                         />
                       ))}
                     </div>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full h-20 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center gap-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#C15B32] transition-colors active:scale-95 shadow-2xl shadow-gray-900/10"
                  >
                    {isSubmitting ? 'Submitting...' : 'Send Testimonial'} <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
