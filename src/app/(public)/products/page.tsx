'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card, CardContent } from '@/components/ui/components';
import { Search, ShoppingBag, Package, ArrowRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await api.get('/items');
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(item => 
    item.item_name.toLowerCase().includes(search.toLowerCase()) ||
    item.barcode?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-24 md:py-32 lg:py-48 bg-[#F9F7F2] min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#C15B32]/10 rounded-full blur-[100px] md:blur-[150px] -mr-48 md:-mr-96 -mt-48 md:-mt-96 opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <span className="text-[10px] font-black tracking-[0.5em] text-[#C15B32] uppercase mb-8 md:mb-12 block">The Inventory Catalogue</span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif mb-8 md:mb-12 text-[#1F1F1F] tracking-tighter leading-[1] md:leading-[0.85]">Our <br/> <span className="italic font-light">Inventory.</span></h1>
            <p className="text-xl md:text-2xl text-gray-400 font-serif italic">Browse our selection of premium components and structural materials.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full lg:w-96"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-16 md:h-20 pl-16 pr-6 rounded-full border-none bg-white shadow-2xl shadow-gray-900/5 focus:outline-none focus:ring-2 focus:ring-[#C15B32]/20 transition-all font-serif italic text-xl md:text-2xl placeholder:text-gray-200"
            />
          </motion.div>
        </div>

        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-[#C15B32]"
            >
              <Package className="h-12 w-12 strokeWidth={1}" />
            </motion.div>
            <p className="mt-8 font-serif italic text-2xl text-gray-400 text-center">Syncing with our Atelier...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            <AnimatePresence>
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.item_id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="rounded-[2.5rem] md:rounded-[3rem] border-0 shadow-2xl shadow-gray-900/5 overflow-hidden group hover:-translate-y-4 transition-all duration-700 bg-white relative">
                    <div className="h-64 md:h-72 bg-[#F9F7F2] flex items-center justify-center text-gray-200 group-hover:bg-[#C15B32]/5 transition-all duration-700 relative overflow-hidden">
                       <ShoppingBag className="h-20 w-20 md:h-24 md:w-24 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700" />
                       <div className="absolute top-8 right-8">
                         <span className={`text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-black px-4 py-2 rounded-full shadow-lg ${item.quantity > 10 ? 'bg-white text-green-600' : 'bg-white text-orange-600'}`}>
                           {item.quantity} In Stock
                         </span>
                       </div>
                    </div>
                    <CardContent className="p-8 md:p-10">
                      <h3 className="font-serif text-2xl md:text-3xl mb-2 text-[#1F1F1F] leading-tight tracking-tight uppercase line-clamp-1">{item.item_name}</h3>
                      <p className="text-[10px] font-black text-gray-400 mb-8 flex items-center uppercase tracking-widest">
                        <Package className="h-3 w-3 mr-2 text-[#C15B32]" /> SN: {item.barcode || 'MK-ATELIER'}
                      </p>
                      
                      <div className="flex justify-between items-end">
                         <div className="flex flex-col">
                            <p className="text-[8px] md:text-[10px] font-black text-[#C15B32] uppercase tracking-[0.3em] mb-1">MSRP Narrative</p>
                            <div className="flex items-baseline gap-2">
                               <span className="text-xl md:text-2xl font-serif text-[#C15B32] italic">Rs.</span>
                               <span className="text-4xl md:text-5xl font-serif text-[#1F1F1F] tracking-tighter">{item.selling_price}</span>
                            </div>
                         </div>
                        <button className="h-14 w-14 md:h-16 md:w-16 bg-[#1F1F1F] text-white rounded-2xl md:rounded-[1.5rem] flex items-center justify-center group-hover:bg-[#C15B32] transition-all shadow-xl active:scale-95">
                           <ArrowRight className="h-6 w-6" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredItems.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 text-center"
              >
                <div className="inline-block p-12 bg-white rounded-full mb-8 shadow-2xl shadow-gray-900/5">
                  <Search className="h-12 w-12 text-gray-200" />
                </div>
                <h3 className="text-3xl font-serif text-gray-400 italic">No components found matching your search.</h3>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

