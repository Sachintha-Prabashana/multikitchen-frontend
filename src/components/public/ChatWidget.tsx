'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button, Input } from '@/components/ui/components';
import * as chatService from '@/services/chatService';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setLoading(true);
    try {
      await chatService.sendMessage({ sender_name: name, message });
      setSent(true);
      setMessage('');
    } catch (error) {
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-96 bg-white rounded-[2.5rem] shadow-2xl shadow-orange-900/20 border border-gray-100 overflow-hidden flex flex-col mb-6"
          >
            <div className="p-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-md">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-black text-lg block">Live Support</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">Typically replies in minutes</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-grow p-8 min-h-[350px] flex flex-col justify-end bg-gray-50/30">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div 
                    key="sent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-4"
                  >
                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="h-8 w-8" />
                    </div>
                    <p className="text-gray-900 font-black text-xl mb-2">Message Sent!</p>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">We've received your inquiry and will respond to your email shortly.</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-8 rounded-xl border-gray-200 font-bold" 
                      onClick={() => setSent(false)}
                    >
                      Send another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="chat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col space-y-4"
                  >
                    <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-sm font-medium text-gray-700 self-start max-w-[85%] leading-relaxed">
                      Hello! 👋 How can our team help you with MultiKitchen Co today?
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!sent && (
              <form onSubmit={handleSend} className="p-6 bg-white border-t border-gray-50 space-y-4">
                <div className="relative">
                  <Input 
                    placeholder="Your Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="h-14 rounded-2xl border-cream bg-cream/70 text-charcoal focus:bg-white transition-all pl-4 font-medium" 
                    required 
                  />
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type message..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className="h-14 rounded-2xl border-cream bg-cream/70 text-charcoal focus:bg-white transition-all pl-4 font-medium flex-grow" 
                    required 
                  />
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="h-14 w-14 rounded-2xl bg-orange-600 shadow-lg shadow-orange-200 active:scale-95 transition-transform shrink-0"
                  >
                    {loading ? <Loader2 className="animate-spin h-6 w-6" /> : <Send className="h-6 w-6" />}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[2rem] shadow-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-gray-900 text-white rotate-90' : 'bg-orange-600 text-white hover:bg-amber-600 shadow-orange-200'}`}
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
      </motion.button>
    </div>
  );
}

