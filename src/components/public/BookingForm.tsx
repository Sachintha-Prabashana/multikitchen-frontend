'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, Card, CardContent } from '@/components/ui/components';
import { CheckCircle, Calendar, Clock, User, Mail, Phone, ShoppingCart, Loader2 } from 'lucide-react';
import api from '@/lib/api';

const services = [
  "Main Kitchen Cabinetry",
  "Pantry Cupboard Set",
  "Kitchen Renovation",
  "Interior Space Planning",
  "Hardware & Accessories",
  "Worktop Installation"
];

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: services[0],
    date: '',
    time: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/bookings', {
        ...formData,
        date_time: `${formData.date}T${formData.time}:00Z`
      });
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: services[0],
        date: '',
        time: '',
      });
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-[2rem] md:rounded-[3rem] border-0 shadow-2xl shadow-orange-100/50 overflow-hidden bg-white/80 backdrop-blur-lg">
      <CardContent className="p-6 md:p-10">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12 md:py-20 px-4 md:px-8 flex flex-col items-center"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 md:mb-8">
                <CheckCircle className="h-10 w-10 md:h-12 md:w-12" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-[#1F1F1F] mb-4">Booking Confirmed!</h3>
              <p className="text-gray-500 text-base md:text-lg mb-8 md:mb-10 max-w-sm">
                Thank you for choosing MultiKitchen Co. Our design consultant will contact you shortly to schedule an on-site visit.
              </p>
              <Button 
                 onClick={() => setSuccess(false)}
                 className="rounded-xl md:rounded-2xl px-12 h-14 font-bold bg-green-600 hover:bg-green-700 text-white"
              >
                Make Another Booking
              </Button>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="text-center mb-8 md:mb-10">
                <h3 className="text-2xl md:text-3xl font-serif text-[#1F1F1F] mb-2">Book a Consultation</h3>
                <p className="text-sm md:text-base text-gray-500">Professional design and installation services for your home.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3 md:space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center">
                    <User className="h-3 w-3 mr-2 text-[#C15B32]" /> Full Name
                  </label>
                  <Input 
                    required 
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl border-gray-100 bg-gray-50/50 text-[#1F1F1F] focus:bg-white transition-all shadow-sm"
                    placeholder="Enter your name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-3 md:space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center">
                    <Mail className="h-3 w-3 mr-2 text-[#C15B32]" /> Email Address
                  </label>
                  <Input 
                    type="email" 
                    required 
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl border-gray-100 bg-gray-50/50 text-[#1F1F1F] focus:bg-white transition-all shadow-sm"
                    placeholder="example@company.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
                <div className="space-y-3 md:space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center">
                    <Phone className="h-3 w-3 mr-2 text-[#C15B32]" /> Phone Number
                  </label>
                  <Input 
                    required 
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl border-gray-100 bg-gray-50/50 text-[#1F1F1F] focus:bg-white transition-all shadow-sm"
                    placeholder="+94 71 272 9938" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  />
                </div>
                <div className="space-y-3 md:space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center">
                    <ShoppingCart className="h-3 w-3 mr-2 text-[#C15B32]" /> Select Service
                  </label>
                  <div className="relative">
                    <select 
                      title="Select a service"
                      className="w-full h-12 md:h-14 rounded-xl md:rounded-2xl border border-gray-100 bg-gray-50/50 text-[#1F1F1F] focus:bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C15B32]/20 transition-all appearance-none cursor-pointer shadow-sm"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <Clock className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center">
                    <Calendar className="h-3 w-3 mr-2 text-[#C15B32]" /> Preferred Date
                  </label>
                  <Input 
                    type="date" 
                    required 
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl border-gray-100 bg-gray-50/50 text-[#1F1F1F] focus:bg-white transition-all shadow-sm"
                    value={formData.date} 
                    onChange={(e) => setFormData({...formData, date: e.target.value})} 
                  />
                </div>
                <div className="space-y-3 md:space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center">
                    <Clock className="h-3 w-3 mr-2 text-[#C15B32]" /> Preferred Time
                  </label>
                  <Input 
                    type="time" 
                    required 
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl border-gray-100 bg-gray-50/50 text-[#1F1F1F] focus:bg-white transition-all shadow-sm"
                    value={formData.time} 
                    onChange={(e) => setFormData({...formData, time: e.target.value})} 
                  />
                </div>
              </div>

              <div className="pt-4 md:pt-6">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-16 md:h-20 rounded-xl md:rounded-2xl text-base md:text-lg font-black uppercase tracking-[0.2em] shadow-2xl shadow-orange-900/10 bg-[#1F1F1F] hover:bg-[#C15B32] active:scale-95 transition-all text-white border-0"
                >
                  {loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Confirm Consultation"}
                </Button>
                <p className="mt-6 text-center text-[10px] font-black uppercase tracking-widest text-gray-400 max-w-xs mx-auto leading-relaxed">
                  By booking, you agree to our <span className="underline cursor-pointer">Terms of Atelier</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
