'use client';

import { useEffect, useState } from 'react';
import * as itemService from '@/services/itemService';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/components';
import { Plus, Edit, Trash, Search, Package, AlertTriangle } from 'lucide-react';
import ItemModal from '@/components/admin/ItemModal';
import { useAuth } from '@/hooks/useAuth';

export default function ItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'IN_STOCK' | 'LOW_STOCK'>('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const fetchItems = async () => {
    try {
      const data = await itemService.getItems();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (data: any) => {
    try {
      if (editingItem) {
        await itemService.updateItem(editingItem.item_id, data);
      } else {
        await itemService.createItem(data);
      }
      fetchItems();
    } catch (error) {
      console.error('Failed to save item', error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) return;
    try {
      await itemService.deleteItem(id);
      fetchItems();
    } catch (error) {
      console.error('Failed to delete item', error);
      alert('Failed to delete item. It might be linked to existing transactions.');
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.item_name.toLowerCase().includes(search.toLowerCase()) ||
                         item.barcode?.toLowerCase().includes(search.toLowerCase()) ||
                         item.brand?.name?.toLowerCase().includes(search.toLowerCase());
    
    if (statusFilter === 'LOW_STOCK') return matchesSearch && item.quantity <= item.min_quantity;
    if (statusFilter === 'IN_STOCK') return matchesSearch && item.quantity > item.min_quantity;
    return matchesSearch;
  });

  return (
    <div className="max-w-[1440px] mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500 p-2 md:p-4 lg:p-0">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="w-full xl:w-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-charcoal tracking-tighter">Inventory <span className="text-brand">List.</span></h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-1">Manage your items and stock levels</p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="flex bg-cream p-1 rounded-2xl border border-gray-100 shadow-sm w-full lg:w-auto overflow-x-auto no-scrollbar whitespace-nowrap lg:mr-2">
            <button 
              onClick={() => setStatusFilter('ALL')}
              className={`flex-1 lg:flex-none px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === 'ALL' ? 'bg-white text-charcoal shadow-sm' : 'text-gray-400 hover:text-charcoal'}`}
            >
              All
            </button>
            <button 
              onClick={() => setStatusFilter('IN_STOCK')}
              className={`flex-1 lg:flex-none px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === 'IN_STOCK' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'text-gray-400 hover:text-green-600'}`}
            >
              In Stock
            </button>
            <button 
              onClick={() => setStatusFilter('LOW_STOCK')}
              className={`flex-1 lg:flex-none px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === 'LOW_STOCK' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-gray-400 hover:text-red-600'}`}
            >
              Low Stock
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-grow w-full sm:w-64 md:w-80 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-brand transition-colors" />
              <Input 
                className="pl-12 h-12 rounded-2xl bg-white border-gray-100 shadow-sm focus:ring-4 focus:ring-brand/5 transition-all text-sm font-medium" 
                placeholder="Search items..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {isAdmin && (
              <Button 
                onClick={openAddModal}
                className="w-full sm:w-auto h-12 px-6 rounded-2xl bg-brand text-white hover:bg-brand/90 shadow-lg shadow-brand/20 active:scale-95 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
              >
                <Plus className="h-4 w-4" /> Add Item
              </Button>
            )}
          </div>
        </div>
      </div>

      <Card className="rounded-2xl md:rounded-[2.5rem] border-white shadow-2xl shadow-gray-200/50 overflow-hidden bg-white/80 backdrop-blur-xl">
        <CardHeader className="px-6 md:px-8 pt-8 pb-0 flex flex-row justify-between items-end">
           <div>
              <CardTitle className="text-lg md:text-xl font-bold text-charcoal tracking-tight">Product Registry.</CardTitle>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">Showing {filteredItems.length} items</p>
           </div>
           {statusFilter !== 'ALL' && (
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-brand/5 rounded-xl border border-brand/10 md:mb-1">
                <div className={`w-2 h-2 rounded-full ${statusFilter === 'LOW_STOCK' ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className="text-[9px] font-black uppercase tracking-widest text-brand">Filter Active</span>
             </div>
           )}
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-[900px] lg:min-w-full divide-y divide-gray-50">
              <thead className="bg-[#FAF9F6]">
                <tr>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Item Details</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Brand</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Barcode</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Prices (Buy/Sell)</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Current Stock</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Stock Status</th>
                  {isAdmin && <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {filteredItems.map((item) => (
                  <tr key={item.item_id} className="hover:bg-[#FAF9F6]/50 transition-colors group">
                    <td className="px-8 py-6 whitespace-nowrap">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                             <Package className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-bold text-charcoal tracking-tight">{item.item_name}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                          {item.brand?.name || 'GENERIC'}
                       </span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-mono text-gray-400">
                      {item.barcode ? (
                        <span className="bg-gray-100 px-3 py-1 rounded-lg text-[11px] font-bold text-gray-600">{item.barcode}</span>
                      ) : (
                        <div className="flex items-center gap-1.5 opacity-40">
                           <AlertTriangle className="h-3 w-3" />
                           <span className="text-[10px] font-black uppercase tracking-tighter">Manual Only</span>
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-500 font-medium">
                      <span className="text-charcoal text-[10px] font-black uppercase tracking-widest mr-1">Rs.</span>
                      <span className="text-charcoal font-bold">{item.buying_price || '0.00'}</span> 
                      <span className="mx-2 text-gray-200">/</span> 
                      <span className="text-brand text-[10px] font-black uppercase tracking-widest mr-1">Rs.</span>
                      <span className="text-brand font-bold">{item.selling_price || '0.00'}</span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-charcoal font-black tracking-tighter">
                      {item.quantity} <span className="text-[10px] text-gray-400 font-normal uppercase tracking-widest ml-1">Units</span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span className={`px-4 py-1.5 inline-flex text-[9px] leading-5 font-black uppercase tracking-widest rounded-full shadow-sm ${item.quantity <= item.min_quantity ? 'bg-red-50 text-red-600 shadow-red-100' : 'bg-green-50 text-green-600 shadow-green-100'}`}>
                        {item.quantity <= item.min_quantity ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-8 py-6 whitespace-nowrap text-right text-sm">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(item)}
                            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-brand hover:bg-brand/5 rounded-xl transition-all"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.item_id)}
                            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredItems.length === 0 && !loading && (
              <div className="py-24 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-200">
                   <Package className="h-8 w-8" />
                </div>
                <p className="text-charcoal font-serif text-xl tracking-tight">No records found.</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-2">Adjust your search parameters or manifest a new entry.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        initialData={editingItem}
      />
    </div>
  );
}
