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
    <div className="py-24 bg-gray-50/20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl font-black mb-4 text-gray-900 leading-tight">Our <span className="text-blue-600">Inventory</span>.</h1>
            <p className="text-xl text-gray-500 font-medium">Browse our professional-grade products and real-time stock status.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full md:w-96"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search products or barcode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-100/50 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium"
            />
          </motion.div>
        </div>

        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center text-blue-600">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Package className="h-12 w-12" />
            </motion.div>
            <p className="mt-4 font-bold text-gray-400">Syncing with warehouse...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
                  <Card className="rounded-[2.5rem] border-0 shadow-xl shadow-gray-200/40 overflow-hidden group hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 bg-white">
                    <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-300 group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500 relative">
                       <ShoppingBag className="h-16 w-16 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500" />
                       <div className="absolute top-6 right-6">
                         <span className={`text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-full ${item.quantity > 10 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                           {item.quantity} In Stock
                         </span>
                       </div>
                    </div>
                    <CardContent className="p-8">
                      <h3 className="font-black text-xl mb-2 text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.item_name}</h3>
                      <p className="text-xs font-bold text-gray-300 mb-6 flex items-center">
                        <Package className="h-3 w-3 mr-1" /> SN: {item.barcode || 'N/A'}
                      </p>
                      
                      <div className="flex justify-between items-end">
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">MSRP</p>
                           <span className="text-3xl font-black text-gray-900">${item.selling_price}</span>
                        </div>
                        <button className="h-12 w-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                           <ArrowRight className="h-5 w-5" />
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
                <div className="inline-block p-8 bg-gray-100/50 rounded-full mb-6">
                  <Search className="h-12 w-12 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-400 italic">No items found matching your search.</h3>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

