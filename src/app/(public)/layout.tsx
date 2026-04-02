'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Home, Mail, Info, Briefcase, 
  Image as ImageIcon, Lock, Menu, X, 
  MessageCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/components';
import ChatWidget from '@/components/public/ChatWidget';

// Import House of Pantry Fonts
const atelierFonts = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
  
  .font-serif { font-family: 'Cormorant Garamond', serif; }
  .font-sans { font-family: 'Inter', sans-serif; }
`;

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Services', href: '/services', icon: Briefcase },
  { name: 'Gallery', href: '/gallery', icon: ImageIcon },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F7F2] text-[#1F1F1F] font-sans">
      <style dangerouslySetInnerHTML={{ __html: atelierFonts }} />
      
      {/* Navigation */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl py-3 md:py-4 shadow-sm border-b border-gray-100' : 'bg-transparent py-5 md:py-8'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl sm:text-2xl md:text-3xl font-serif text-[#C15B32] flex items-center tracking-tight font-black uppercase scale-y-110 shrink-0">
               MultiKitchen <span className="text-[#1F1F1F] ml-2 italic font-medium lowercase tracking-normal -translate-y-1 opacity-60 text-sm sm:text-lg md:text-xl font-light">Atelier</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative group ${pathname === item.href ? 'text-[#C15B32]' : 'text-gray-400 hover:text-[#C15B32]'}`}
                >
                  {item.name}
                  <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C15B32] transition-opacity ${pathname === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
                </Link>
              ))}
              <div className="h-4 w-px bg-gray-200 mx-2" />
              <Link 
                href="/login" 
                className="p-3 bg-[#1F1F1F] text-white rounded-2xl hover:bg-[#C15B32] transition-all active:scale-95 shadow-lg shadow-gray-900/10"
              >
                <Lock className="h-4 w-4" />
              </Link>
            </nav>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-2 sm:space-x-4">
              <Link href="/login" className="p-2 text-gray-400 hover:text-[#C15B32]">
                <Lock className="h-5 w-5" />
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[#1F1F1F] transition-transform active:scale-90"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white lg:hidden p-8 sm:p-12 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12 sm:mb-16">
              <span className="text-xl font-serif text-[#C15B32]">The Atelier</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2"><X className="h-8 w-8" /></button>
            </div>
            
            <nav className="flex flex-col gap-6 sm:gap-8 flex-grow">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-3xl sm:text-4xl font-serif tracking-tighter ${pathname === item.href ? 'text-[#C15B32]' : 'text-[#1F1F1F]'}`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="pt-8 sm:pt-12 border-t border-gray-100">
               <p className="text-[10px] font-black uppercase tracking-widest text-[#C15B32] mb-4 sm:mb-6">Experience Excellence</p>
               <Button className="w-full h-14 sm:h-16 rounded-2xl bg-[#1F1F1F] text-white font-bold active:scale-95 transition-all" onClick={() => setIsMenuOpen(false)}>
                  Book Design Visit
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-20 sm:pt-24 lg:pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1F1F1F] text-[#F9F7F2] py-20 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
          <div>
            <h4 className="text-xl font-serif mb-8 text-[#C15B32]">MultiKitchen Co</h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Finest modular kitchen and pantry solutions in Sri Lanka. Designing your heart of the home since 2024.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-gray-500">Curated Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/services" className="text-gray-400 hover:text-[#C15B32] transition-colors">Our Services</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-[#C15B32] transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[#C15B32] transition-colors">About Us</Link></li>
              <li><Link href="/login" className="text-[#C15B32] font-black text-[10px] uppercase tracking-widest hover:underline">Staff Entrance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-gray-500">The Atelier</h4>
            <p className="text-gray-400 text-sm mb-2">176 Nawala Rd, Nugegoda</p>
            <p className="text-gray-400 text-sm mb-2 opacity-60 underline">sales@multikitchen.lk</p>
            <p className="text-xl md:text-2xl font-serif text-white mt-4 italic">+94 71 272 9938</p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-gray-500">Consultation</h4>
            <Button className="w-full h-20 rounded-[2rem] bg-[#C15B32] hover:bg-[#A14B22] text-white border-0 shadow-2xl shadow-orange-900/20 active:scale-95 transition-all">
              <MessageCircle className="mr-3 h-5 w-5" /> Start Live Chat
            </Button>
          </div>
        </div>
        <ChatWidget />
        <div className="container mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-600">
          <p>© 2026 MultiKitchen Co (Pvt) Ltd. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Atelier</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
