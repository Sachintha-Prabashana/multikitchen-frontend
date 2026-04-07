'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Modal, CardHeader, CardTitle, CardContent } from '@/components/ui/components';
import { X, AlertCircle, Package, Scan, Tag } from 'lucide-react';
import * as brandService from '@/services/brandService';

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  initialData?: any;
}

export default function ItemModal({ isOpen, onClose, onSave, initialData }: ItemModalProps) {
  const [formData, setFormData] = useState({
    item_name: '',
    barcode: '',
    brand_name: '',
    buying_price: '',
    selling_price: '',
    min_quantity: '10',
  });
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await brandService.getBrands();
        setBrands(data);
      } catch (err) {
        console.error('Failed to fetch brands', err);
      }
    };
    if (isOpen) {
      fetchBrands();
    }
  }, [isOpen]);

  useEffect(() => {
    setError(null);
    if (initialData) {
      setFormData({
        item_name: initialData.item_name || '',
        barcode: initialData.barcode || '',
        brand_name: initialData.brand?.name || '',
        buying_price: initialData.buying_price?.toString() || '',
        selling_price: initialData.selling_price?.toString() || '',
        min_quantity: initialData.min_quantity?.toString() || '10',
      });
    } else {
      setFormData({
        item_name: '',
        barcode: '',
        brand_name: '',
        buying_price: '',
        selling_price: '',
        min_quantity: '10',
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!formData.item_name.trim()) {
      setError('Item name is required');
      setLoading(false);
      return;
    }

    try {
      await onSave({
        ...formData,
        barcode: formData.barcode.trim() === '' ? null : formData.barcode.trim(),
        brand_name: formData.brand_name.trim() === '' ? null : formData.brand_name.trim(),
        buying_price: formData.buying_price && formData.buying_price.trim() !== '' ? parseFloat(formData.buying_price) : null,
        selling_price: formData.selling_price && formData.selling_price.trim() !== '' ? parseFloat(formData.selling_price) : null,
        min_quantity: parseInt(formData.min_quantity),
      });
      onClose();
    } catch (err: any) {
      console.error('Save failed', err);
      setError(err.response?.data?.error || err.message || 'Check your internet connection or system logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CardHeader className="relative border-b border-gray-100 pb-6">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center text-brand">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-charcoal tracking-tight">
              {initialData ? 'Edit' : 'Add New'} <span className="text-brand">Item.</span>
            </CardTitle>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Inventory Control Manifest</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-8 px-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Item Name</label>
              <Input 
                required
                placeholder="Type item name..." 
                value={formData.item_name}
                onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
                className="h-14 rounded-2xl bg-cream/30 border-gray-100 focus:bg-white transition-all text-charcoal font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Brand (Search or Type)</label>
              <div className="relative group">
                <Input 
                  list="brand-options"
                  placeholder="Select or enter brand..." 
                  value={formData.brand_name}
                  onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                  className="h-14 rounded-2xl bg-cream/30 border-gray-100 focus:bg-white transition-all text-charcoal font-medium pl-12"
                />
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-brand transition-colors" />
                <datalist id="brand-options">
                  {brands.map((b) => (
                    <option key={b.id} value={b.name} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Barcode (Optional)</label>
            <div className="relative group">
              <Input 
                placeholder="Scan or type barcode..." 
                value={formData.barcode}
                onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                className="h-14 rounded-2xl bg-cream/30 border-gray-100 focus:bg-white transition-all text-charcoal font-mono pl-12"
              />
              <Scan className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-brand transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Buying Price (Rs.)</label>
              <Input 
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.buying_price}
                onChange={(e) => setFormData({ ...formData, buying_price: e.target.value })}
                className="h-14 rounded-2xl bg-cream/30 border-gray-100 focus:bg-white transition-all text-charcoal font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Selling Price (Rs.)</label>
              <Input 
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.selling_price}
                onChange={(e) => setFormData({ ...formData, selling_price: e.target.value })}
                className="h-14 rounded-2xl bg-cream/30 border-gray-100 focus:bg-white transition-all text-charcoal font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Minimum Stock Level</label>
            <Input 
              type="number"
              required
              min="0"
              value={formData.min_quantity}
              onChange={(e) => setFormData({ ...formData, min_quantity: e.target.value })}
              className="h-14 rounded-2xl bg-cream/30 border-gray-100 focus:bg-white transition-all text-charcoal font-medium"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 animate-in shake-in duration-300">
               <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
               <p className="text-[10px] text-red-700 font-bold uppercase tracking-tight leading-relaxed">
                  System Error: {error}
               </p>
            </div>
          )}

          <div className="flex gap-4 pt-4 pb-4">
            <Button 
              type="button"
              variant="outline"
              className="flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border-gray-200"
              onClick={onClose}
            >
              Discard
            </Button>
            <Button 
              type="submit"
              disabled={loading}
              className="flex-[2] h-14 rounded-2xl bg-brand text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand/90 shadow-xl shadow-brand/20 active:scale-95 transition-all"
            >
              {loading ? 'Processing...' : (initialData ? 'Update Item' : 'Add Item')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Modal>
  );
}
