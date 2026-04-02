'use client';

import { motion } from 'framer-motion';
import BookingForm from '@/components/public/BookingForm';
import { Calendar, Clock, ShieldCheck, Mail } from 'lucide-react';

export default function BookingPage() {
  return (
    <div className="py-24 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Information Column */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <h1 className="text-5xl font-black mb-6 text-gray-900 leading-tight">Secure Your <span className="text-blue-600">Spot</span>.</h1>
              <p className="text-xl text-gray-500 mb-12 font-medium leading-relaxed">
                Choose a time that works for you. Our experts are ready to help you optimize your inventory management workflow.
              </p>

              <div className="space-y-8">
                <InfoItem 
                  icon={Calendar}
                  title="Flexible Scheduling"
                  desc="Book audits or consultations anytime that suits your operational hours."
                />
                <InfoItem 
                  icon={ShieldCheck}
                  title="Professional Experts"
                  desc="All services are performed by certified logistics and data professionals."
                />
                <InfoItem 
                  icon={Mail}
                  title="Instant Confirmation"
                  desc="Receive a detailed email and calendar invite as soon as your booking is confirmed."
                />
              </div>

              <div className="mt-12 p-8 bg-blue-600 rounded-3xl text-white shadow-2xl shadow-blue-200">
                <h4 className="font-bold mb-2">Need a Custom Quote?</h4>
                <p className="text-blue-100 text-sm mb-6 font-medium">For large-scale enterprise deployments, please contact our sales team directly.</p>
                <button className="text-sm font-bold underline hover:text-white transition-colors">Contact Sales →</button>
              </div>
            </motion.div>
          </div>

          {/* Form Column */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
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
    <div className="flex items-start">
      <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center mr-6 text-blue-600 shrink-0 border border-gray-50">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-500 text-sm font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
