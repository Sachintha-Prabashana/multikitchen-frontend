'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Package, 
  ArrowLeftRight, 
  BarChart3, 
  Users, 
  Database, 
  Settings, 
  LogOut, 
  User as UserIcon,
  ShieldCheck,
  Bell,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';
import { Button, Card, cn } from '@/components/ui/components';
import * as stockService from '@/services/stockService';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Inventory List', href: '/admin/items', icon: Package, badge: true },
  { name: 'Stock Management', href: '/admin/stock', icon: ArrowLeftRight },
  { name: 'Analytics', href: '/admin/reports', icon: BarChart3 },
  { name: 'Stock Summary', href: '/admin/stock/summary', icon: BarChart3 },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'System Backup', href: '/admin/backup', icon: ShieldCheck },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user, loading } = useAuth();
  const [lowStockCount, setLowStockCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine visible navigation items for OWNER role
  const displayedNavItems = user?.role === 'OWNER'
    ? navItems.filter(item => ['Dashboard', 'Inventory List', 'Analytics', 'User Management', 'Stock Summary'].includes(item.name))
    : navItems;

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
       fetchLowStock();
    }
  }, [user, loading, router]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const fetchLowStock = async () => {
    try {
      const data = await stockService.getLowStock();
      setLowStockCount(data.length);
    } catch (error) {
      console.error('Failed to fetch low stock', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (loading || !user) {
    return (
      <div className="h-screen bg-[#FDFDFD] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Authenticating Access...</p>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      <div className="p-8 md:p-10">
         <Link href="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
           <h1 className="text-2xl md:text-3xl font-black tracking-tighter">MultiKitchen <span className="text-brand">Pvt Ltd.</span></h1>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mt-2">Industrial Inventory</p>
         </Link>
      </div>
      
      <nav className="flex-1 px-4 md:px-6 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        {displayedNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative",
                isActive && "bg-[#1A1A1A] text-white shadow-xl shadow-gray-900/20",
                !isActive && "text-gray-400 hover:bg-gray-50 hover:text-[#1A1A1A]"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-transform duration-300", isActive ? "text-brand scale-110" : "group-hover:scale-110")} />
              <span className="text-[11px] font-black uppercase tracking-widest">{item.name}</span>
              {item.badge && lowStockCount > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 flex h-5 min-w-[20px] px-1.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white shadow-lg shadow-red-500/20 animate-in zoom-in-50">
                  {lowStockCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 md:p-8 border-t border-gray-50 bg-[#FDFDFD]">
        <Card className="p-6 bg-cream/50 border-0 rounded-[2rem] shadow-none">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-bold text-xl text-brand shadow-sm">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-charcoal truncate uppercase tracking-tighter leading-none mb-1">{user?.name || 'Admin'}</p>
              <Link href="/admin/profile" className="text-[10px] font-bold uppercase tracking-widest text-brand hover:underline">Edit Profile</Link>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-start h-12 rounded-xl border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50 text-[10px] uppercase font-black tracking-widest transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" /> Sign Out
          </Button>
        </Card>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#FDFDFD] font-sans text-[#1A1A1A] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden xl:flex w-80 bg-white border-r border-gray-100 flex-col shadow-2xl shadow-gray-900/5 z-20">
        <SidebarContent />
      </aside>
 
      {/* Mobile Sidebar Slider */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 xl:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl z-40 xl:hidden flex flex-col"
            >
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute right-6 top-10 p-2 bg-gray-50 rounded-xl text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
 
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#FDFDFD] relative flex flex-col">
        <header className="sticky top-0 z-50 px-4 sm:px-6 md:px-12 py-4 md:py-8 bg-[#FDFDFD]/80 backdrop-blur-md flex justify-between items-center border-b border-gray-50">
           <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="xl:hidden p-2.5 sm:p-3 bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-sm text-gray-400 active:scale-95 transition-all flex-shrink-0"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <h2 className="text-lg md:text-3xl font-black tracking-tighter capitalize leading-none truncate pr-2">
                 {pathname.split('/').pop()?.replace('-', ' ')}
              </h2>
           </div>
           
           <div className="flex items-center gap-3 md:gap-6">
              <div className="text-right hidden min-[425px]:block">
                 <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brand">System Status</p>
                 <p className="text-[11px] md:text-xs font-bold text-charcoal">Operational</p>
              </div>
              <button 
                onClick={() => router.push('/admin/profile')}
                className="h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-[#1F1F1F] text-[#F9F7F2] flex items-center justify-center shadow-xl shadow-gray-900/10 border border-white/10 group cursor-pointer hover:rotate-6 transition-transform flex-shrink-0"
              >
                <UserIcon className="h-4 w-4 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
              </button>
           </div>
        </header>

        <div className="p-3 sm:p-6 md:p-8 lg:p-12 flex-1 relative overflow-x-clip">
          <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand/5 rounded-full blur-[80px] md:blur-[120px] -mr-20 md:-mr-32 -mt-20 md:-mt-32 pointer-events-none" />
          <div className="relative z-10 w-full h-full">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
}
