'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui/components';
import { BarChart3, Search, Package, AlertCircle } from 'lucide-react';
import * as itemService from '@/services/itemService';
import * as stockService from '@/services/stockService';
import { useAuth } from '@/hooks/useAuth';

export default function StockSummaryPage() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'>('ALL');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      fetchData();
    }
  }, [loading, user]);

  const fetchData = async () => {
    try {
      const [items, history] = await Promise.all([
        itemService.getItems(),
        stockService.getHistory()
      ]);
      const map: Record<number, any> = {};
      items.forEach((it: any) => {
        map[it.item_id] = {
          name: it.item_name,
          sku: it.barcode || 'N/A',
          brand: it.brand?.name || 'GENERIC',
          received: 0,
          issued: 0,
          balance: it.quantity,
          min: it.min_quantity
        };
      });
      history.forEach((tr: any) => {
        const entry = map[tr.item_id];
        if (!entry) return;
        if (tr.type === 'RECEIVE') entry.received += tr.quantity;
        if (tr.type === 'ISSUE') entry.issued += tr.quantity;
      });
      const rows = Object.values(map).map((row: any) => ({
        ...row,
        status: row.balance === 0 ? 'OUT OF STOCK' : (row.balance <= row.min ? 'LOW STOCK' : 'IN STOCK')
      }));
      setData(rows);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to load summary');
    }
  };

  const filteredData = data.filter(row => {
    const matchesSearch = row.name.toLowerCase().includes(search.toLowerCase()) ||
                         row.brand.toLowerCase().includes(search.toLowerCase()) ||
                         row.sku.toLowerCase().includes(search.toLowerCase());
    
    if (statusFilter === 'IN_STOCK') return matchesSearch && row.balance > row.min;
    if (statusFilter === 'LOW_STOCK') return matchesSearch && row.balance <= row.min && row.balance > 0;
    if (statusFilter === 'OUT_OF_STOCK') return matchesSearch && row.balance === 0;
    return matchesSearch;
  });

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Summary...</p></div>;

  return (
    <div className="max-w-[1440px] mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500 p-4 md:p-8 lg:p-12">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="w-full xl:w-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-charcoal tracking-tighter transition-all">Stock <span className="text-brand">Summary.</span></h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-1">Industrial Logistics Manifest</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="flex bg-cream p-1 rounded-2xl border border-gray-100 shadow-sm w-full sm:w-auto overflow-x-auto no-scrollbar whitespace-nowrap lg:mr-2">
            {[
              { id: 'ALL', label: 'All' },
              { id: 'IN_STOCK', label: 'In Stock', color: 'bg-green-500', text: 'text-green-600' },
              { id: 'LOW_STOCK', label: 'Low Stock', color: 'bg-orange-500', text: 'text-orange-600' },
              { id: 'OUT_OF_STOCK', label: 'Out of Stock', color: 'bg-red-500', text: 'text-red-600' }
            ].map((f) => (
              <button 
                key={f.id}
                onClick={() => setStatusFilter(f.id as any)}
                className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === f.id ? (f.color ? `${f.color} text-white shadow-lg` : 'bg-white text-charcoal shadow-sm') : `text-gray-400 hover:${f.text || 'text-charcoal'}`}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64 md:w-80 group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-brand transition-colors" />
            <Input 
              className="pl-12 h-12 rounded-2xl bg-white border-gray-100 shadow-sm focus:ring-4 focus:ring-brand/5 transition-all text-sm font-medium" 
              placeholder="Search item, brand or SKU..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-[10px] text-red-800 font-bold uppercase tracking-tight">{error}</p>
        </div>
      )}

      <Card className="rounded-2xl md:rounded-[2.5rem] border-white shadow-2xl shadow-gray-200/50 overflow-hidden bg-white/80 backdrop-blur-xl">
        <CardHeader className="px-6 md:px-8 pt-8 pb-4">
          <CardTitle className="text-lg md:text-xl font-bold text-charcoal tracking-tight">Movement Audit Log.</CardTitle>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">Inventory Balance & Lifecycle Tracking</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full table-auto min-w-[900px] lg:min-w-full">
              <thead className="bg-[#FAF9F6]">
                <tr>
                  <th className="px-6 md:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Item Details</th>
                  <th className="px-6 md:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Brand</th>
                  <th className="px-6 md:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">SKU/Barcode</th>
                  <th className="px-6 md:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Received</th>
                  <th className="px-6 md:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Issued</th>
                  <th className="px-6 md:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Balance</th>
                  <th className="px-6 md:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF9F6]/50 transition-colors group">
                    <td className="px-6 md:px-8 py-6 whitespace-nowrap">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                             <Package className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-bold text-charcoal tracking-tight">{row.name}</span>
                       </div>
                    </td>
                    <td className="px-6 md:px-8 py-6 whitespace-nowrap">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#888] bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                        {row.brand}
                      </span>
                    </td>
                    <td className="px-6 md:px-8 py-6 whitespace-nowrap text-sm font-mono text-gray-400">{row.sku}</td>
                    <td className="px-6 md:px-8 py-6 whitespace-nowrap">
                      <span className="text-sm font-bold text-green-600">{row.received}</span>
                    </td>
                    <td className="px-6 md:px-8 py-6 whitespace-nowrap">
                      <span className="text-sm font-bold text-red-600">{row.issued}</span>
                    </td>
                    <td className="px-6 md:px-8 py-6 whitespace-nowrap">
                      <span className="text-sm font-black text-charcoal">{row.balance}</span>
                      <span className="text-[9px] text-gray-300 ml-1 uppercase font-bold tracking-tighter">Units</span>
                    </td>
                    <td className="px-6 md:px-8 py-6 whitespace-nowrap">
                      <span className={`px-4 py-1.5 inline-flex text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm ${
                        row.status === 'OUT OF STOCK' ? 'bg-red-500 text-white shadow-red-200' :
                        row.status === 'LOW STOCK' ? 'bg-orange-50 text-orange-600 shadow-orange-100' : 
                        'bg-green-50 text-green-600 shadow-green-100'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredData.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-gray-400 text-sm font-medium">No matching items found in summary.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
