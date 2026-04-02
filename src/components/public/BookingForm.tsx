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
    <Card className="rounded-3xl border-0 shadow-2xl shadow-orange-100 overflow-hidden bg-white/80 backdrop-blur-lg">
      <CardContent className="p-10">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20 px-8 flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8">
                <CheckCircle className="h-12 w-12" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Booking Confirmed!</h3>
              <p className="text-gray-500 text-lg mb-10 max-w-sm">
                Thank you for choosing MultiKitchen Co. Our design consultant will contact you shortly to schedule an on-site visit.
              </p>
              <Button 
                 onClick={() => setSuccess(false)}
                 className="rounded-2xl px-12 h-14 font-bold bg-green-600 hover:bg-green-700"
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
              className="space-y-8"
            >
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Book a Consultation</h3>
                <p className="text-gray-500">Professional design and installation services for your home.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <User className="h-4 w-4 mr-2 text-orange-500" /> Full Name
                  </label>
                  <Input 
                    required 
                    className="h-14 rounded-2xl border-cream bg-cream/50 text-charcoal focus:bg-white transition-all"
                    placeholder="Enter your name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-orange-500" /> Email Address
                  </label>
                  <Input 
                    type="email" 
                    required 
                    className="h-14 rounded-2xl border-cream bg-cream/50 text-charcoal focus:bg-white transition-all"
                    placeholder="example@company.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-orange-500" /> Phone Number
                  </label>
                  <Input 
                    required 
                    className="h-14 rounded-2xl border-cream bg-cream/50 text-charcoal focus:bg-white transition-all"
                    placeholder="+94 71 272 9938" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-2 text-orange-500" /> Select Service
                  </label>
                  <select 
                    title="Select a service"
                    className="w-full h-14 rounded-2xl border border-cream bg-cream/50 text-charcoal focus:bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all appearance-none cursor-pointer"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-orange-500" /> Preferred Date
                  </label>
                  <Input 
                    type="date" 
                    required 
                    className="h-14 rounded-2xl border-cream bg-cream/50 text-charcoal focus:bg-white transition-all"
                    value={formData.date} 
                    onChange={(e) => setFormData({...formData, date: e.target.value})} 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-orange-500" /> Preferred Time
                  </label>
                  <Input 
                    type="time" 
                    required 
                    className="h-14 rounded-2xl border-cream bg-cream/50 text-charcoal focus:bg-white transition-all"
                    value={formData.time} 
                    onChange={(e) => setFormData({...formData, time: e.target.value})} 
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-orange-200 bg-gradient-to-r from-orange-600 to-amber-600 active:scale-95 transition-transform text-white border-0"
                >
                  {loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Confirm Booking"}
                </Button>
                <p className="mt-6 text-center text-xs text-gray-400 max-w-sm mx-auto">
                  By booking, you agree to our Terms of Service and Privacy Policy. We will handle your data securely.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
