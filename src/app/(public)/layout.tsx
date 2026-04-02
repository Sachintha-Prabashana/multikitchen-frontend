'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChefHat, MessageCircle, Home, Mail, Info, Briefcase, Image as ImageIcon, Lock } from 'lucide-react';


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

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F7F2] text-[#1F1F1F] font-sans">
      <style dangerouslySetInnerHTML={{ __html: atelierFonts }} />
      
      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 py-4 h-auto">
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          <Link href="/" className="text-3xl font-serif text-[#C15B32] flex items-center tracking-tight font-black uppercase tracking-[0.2em] scale-y-110">
             MultiKitchen <span className="text-[#1F1F1F] ml-3 italic font-medium lowercase tracking-normal -translate-y-1 opacity-60 text-xl font-light">Atelier</span>
          </Link>
          
          <nav className="flex items-center space-x-12">
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
              className="p-3 bg-[#1F1F1F] text-white rounded-2xl hover:bg-[#C15B32] transition-colors shadow-lg shadow-gray-900/10 active:scale-95"
              title="Staff Access"
            >
              <Lock className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </header>



      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1F1F1F] text-[#F9F7F2] py-24 border-t border-white/5">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div>
            <h4 className="text-xl font-serif mb-8 text-[#C15B32]">MultiKitchen Co</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Finest modular kitchen and pantry solutions in Sri Lanka. Designing your heart of the home since 2024.</p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-gray-500">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/services" className="text-gray-400 hover:text-[#C15B32] transition-colors">Our Services</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-[#C15B32] transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[#C15B32] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#C15B32] transition-colors">Contact</Link></li>
              <li><Link href="/login" className="text-[#C15B32] font-black text-[10px] uppercase tracking-widest hover:underline">Staff Entrance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-gray-500">The Atelier</h4>
            <p className="text-gray-400 text-sm mb-2">176 Nawala Rd, Nugegoda</p>
            <p className="text-gray-400 text-sm mb-2">sales@multikitchen.lk</p>
            <p className="text-gray-300 font-bold">+94 71 272 9938</p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-gray-500">Consultation</h4>
            <Button className="w-full h-16 rounded-2xl bg-[#C15B32] hover:bg-[#A14B22] text-white border-0 shadow-xl shadow-orange-900/20 active:scale-95 transition-transform">
              <MessageCircle className="mr-2 h-4 w-4" /> Start Live Chat
            </Button>
          </div>
        </div>
        <ChatWidget />
        <div className="container mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-600">
          <p>© 2026 MultiKitchen Co (Pvt) Ltd. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
          </div>
        </div>
      </footer>


    </div>
  );
}
