'use client';

import { useEffect, useState, useRef } from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent, CardFooter, Modal } from '@/components/ui/components';
import * as stockService from '@/services/stockService';
import * as itemService from '@/services/itemService';
import { RefreshCw, Scan, ArrowUpRight, ArrowDownLeft, Package, Check, AlertCircle, ShoppingCart, Search, LayoutList, X, Plus, FileText } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function StockPage() {
  const [activeTab, setActiveTab] = useState<'logistics' | 'manifest'>('logistics');
  const [type, setType] = useState<'ISSUE' | 'RECEIVE'>('ISSUE');
  const [barcode, setBarcode] = useState('');
  const [item, setItem] = useState<any>(null);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [manifest, setManifest] = useState<any[]>([]);
  const [workerName, setWorkerName] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [lastIssued, setLastIssued] = useState<{items: any[], worker: string} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<any>(null);
  const [isZeroStockAlertOpen, setIsZeroStockAlertOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const [historyData, itemsData] = await Promise.all([
        stockService.getHistory(),
        itemService.getItems()
      ]);
      setHistory(historyData);
      setAllItems(itemsData);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScan = async (code: string) => {
    setBarcode(code);
    setError(null);
    const found = allItems.find((i: any) => i.barcode === code);
    if (found) {
      handleAddItem(found);
    } else {
      setError('Barcode not recognized.');
    }
  };

  const handleAddItem = (selectedItem: any) => {
    if (type === 'ISSUE' && selectedItem.quantity <= 0) {
      setPendingItem(selectedItem);
      setIsZeroStockAlertOpen(true);
      return;
    }
    addToManifest(selectedItem);
  };

  const addToManifest = (selectedItem: any) => {
    const exists = manifest.find(i => i.item_id === selectedItem.item_id);
    if (exists) {
       setManifest(manifest.map(i => i.item_id === selectedItem.item_id ? { ...i, quantity: i.quantity + quantity } : i));
    } else {
       setManifest([...manifest, { ...selectedItem, quantity }]);
    }
    setBarcode('');
    setItem(null);
    setQuantity(1);
    setSuccess(`Added ${selectedItem.item_name} to manifest.`);
    setTimeout(() => setSuccess(null), 2000);
  };

  const confirmZeroStockRedirect = () => {
    if (pendingItem) {
      setType('RECEIVE');
      addToManifest(pendingItem);
      setPendingItem(null);
      setIsZeroStockAlertOpen(false);
    }
  };

  const removeFromManifest = (itemId: number) => {
    setManifest(manifest.filter(i => i.item_id !== itemId));
  };

  const filteredSearchItems = allItems.filter(i => 
    i.item_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (i.barcode && i.barcode.includes(searchQuery))
  );

  const handleManualSelect = (selectedItem: any) => {
    setItem(selectedItem);
    setBarcode(selectedItem.barcode || '');
    setSearchQuery('');
  };

  const handleSubmitManifest = async () => {
    if (manifest.length === 0) return;
    if (type === 'ISSUE' && !workerName) {
       setError('Recipient worker name is required for issuing.');
       return;
    }

    setLoading(true);
    setError(null);
    try {
      const items = manifest.map(i => ({ item_id: i.item_id, quantity: i.quantity }));
      if (type === 'ISSUE') {
        const issuedData = { items: [...manifest], worker: workerName };
        await stockService.batchIssueStock({ items, worker_name: workerName });
        setLastIssued(issuedData);
      } else {
        await stockService.batchReceiveStock({ items });
        setLastIssued(null);
      }
      
      setSuccess(`Manifest successfully processed.`);
      setManifest([]);
      setWorkerName('');
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Batch transaction failed.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrintSlip = async () => {
    if (!lastIssued) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/reports/issue-slip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          items: lastIssued.items,
          workerName: lastIssued.worker
        })
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `IssueSlip-${lastIssued.worker}-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to print slip', error);
    }
  };

  const startScanner = () => {
    if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
        return;
    }
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: { width: 250, height: 250 } }, false);
    scanner.render((decodedText) => {
      handleScan(decodedText);
    }, (error) => {});
    scannerRef.current = scanner;
  };

  return (
    <div className="max-w-[1440px] mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500 p-2 md:p-4 lg:p-0">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="w-full xl:w-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-charcoal tracking-tighter">MultiKitchen <span className="text-brand">Logistics.</span></h2>
          <div className="flex gap-4 mt-2 overflow-x-auto no-scrollbar whitespace-nowrap">
            <button 
              onClick={() => setActiveTab('logistics')}
              className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] pb-1 transition-all ${activeTab === 'logistics' ? 'text-brand border-b-2 border-brand' : 'text-gray-400 border-b-2 border-transparent'}`}
            >
              Operations
            </button>
            <button 
              onClick={() => setActiveTab('manifest')}
              className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] pb-1 transition-all ${activeTab === 'manifest' ? 'text-brand border-b-2 border-brand' : 'text-gray-400 border-b-2 border-transparent'}`}
            >
              Inventory Summary
            </button>
          </div>
        </div>
        
        {activeTab === 'logistics' && (
          <div className="flex bg-cream p-1 md:p-1.5 rounded-2xl shadow-inner border border-gray-100 w-full xl:w-auto overflow-hidden">
            <button
              onClick={() => { setType('ISSUE'); setManifest([]); }}
              className={`flex-1 xl:flex-none px-4 md:px-8 py-2 md:py-2.5 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${type === 'ISSUE' ? 'bg-white shadow-md text-red-600' : 'text-gray-400 hover:text-charcoal'}`}
            >
              Issue Stock
            </button>
            <button
              onClick={() => { setType('RECEIVE'); setManifest([]); }}
              className={`flex-1 xl:flex-none px-4 md:px-8 py-2 md:py-2.5 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${type === 'RECEIVE' ? 'bg-white shadow-md text-green-600' : 'text-gray-400 hover:text-charcoal'}`}
            >
              Receive Stock
            </button>
          </div>
        )}
      </div>

      {activeTab === 'logistics' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {/* Item Selector */}
          <div className="space-y-6">
            <Card className="rounded-2xl md:rounded-[2.5rem] border-white shadow-2xl shadow-gray-200/50 bg-white/80 backdrop-blur-xl transition-all">
              <CardHeader className="border-b border-gray-50 p-6 md:p-8">
                <CardTitle className="text-lg md:text-xl font-bold text-charcoal tracking-tight">Select <span className="text-brand">Item.</span></CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-8 space-y-6 md:space-y-8">
                {/* Barcode Scanner Section */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Barcode Intelligence</label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Scan/Type Barcode..." 
                      className="h-12 md:h-14 font-mono rounded-xl md:rounded-2xl bg-cream/30 border-gray-50 focus:bg-white text-sm"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleScan(barcode)}
                    />
                    <Button variant="outline" className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl border-gray-200 hover:border-brand/30 transition-all flex-shrink-0" onClick={startScanner}>
                      <Scan className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    </Button>
                  </div>
                </div>

                {/* Search & Quantity Section */}
                <div className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Manual Selection & Quantity</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-grow group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-brand transition-colors" />
                        <Input 
                          placeholder="Search items..." 
                          className="h-12 md:h-14 pl-12 rounded-xl md:rounded-2xl bg-cream/30 border-gray-50 focus:bg-white transition-all shadow-sm text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="w-full sm:w-24">
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="Qty"
                          className="h-12 md:h-14 rounded-xl md:rounded-2xl text-center font-black bg-cream/30 border-gray-50 focus:bg-white" 
                          value={quantity} 
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setQuantity(isNaN(val) ? 1 : Math.max(1, val));
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* List Area */}
                  <div className="border border-gray-50 rounded-[2rem] bg-gray-50/30 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-white/50 flex items-center justify-between">
                       <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Available Inventory ({filteredSearchItems.length})</span>
                       {searchQuery && (
                         <button onClick={() => setSearchQuery('')} className="text-[9px] font-black uppercase tracking-widest text-brand hover:underline">Clear Search</button>
                       )}
                    </div>
                    <div className="max-h-96 overflow-y-auto p-2 space-y-1 bg-white/50 custom-scrollbar">
                      {filteredSearchItems.length > 0 ? (
                        filteredSearchItems.map((foundItem) => (
                          <div 
                            key={foundItem.item_id}
                            className="flex items-center justify-between p-3 hover:bg-white hover:shadow-lg hover:shadow-gray-900/5 rounded-xl transition-all group"
                          >
                            <div 
                              className="flex-grow cursor-pointer pr-4"
                              onClick={() => setItem(foundItem)}
                            >
                              <p className="text-[11px] font-bold text-charcoal truncate">{foundItem.item_name}</p>
                              <div className="flex gap-2 text-[8px] font-black uppercase tracking-tighter text-gray-400 mt-0.5">
                                 <span className="text-brand/50">{foundItem.barcode || 'SN-N/A'}</span>
                                 <span className="opacity-10">|</span>
                                 <span className={foundItem.quantity <= foundItem.min_quantity ? 'text-red-500' : 'text-gray-400'}>Stock: {foundItem.quantity}</span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              className="h-8 w-8 p-0 rounded-lg bg-charcoal text-white hover:bg-brand transition-all shadow-lg active:scale-90"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddItem(foundItem);
                              }}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="p-12 text-center">
                           <Package className="h-8 w-8 text-gray-100 mx-auto mb-3" />
                           <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">No results found</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {item && (
                  <div className="p-6 bg-brand/5 border border-brand/10 rounded-[2rem] animate-in zoom-in-95 duration-300">
                    <p className="font-bold text-charcoal text-lg mb-2">{item.item_name}</p>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
                       <span>In Stock: {item.quantity}</span>
                       <span className="w-1 h-1 bg-gray-300 rounded-full" />
                       <span>{item.barcode || 'NO BARCODE'}</span>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        min="1" 
                        value={quantity} 
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="h-12 rounded-xl text-center font-black bg-white"
                      />
                      <Button 
                        onClick={() => handleAddItem(item)}
                        className="h-12 bg-charcoal text-white rounded-xl flex-grow font-black text-[10px] uppercase tracking-widest hover:bg-brand transition-colors"
                      >
                        Add to List
                      </Button>
                    </div>
                  </div>
                )}
                
                <div id="reader" className="w-full overflow-hidden rounded-3xl" />
              </CardContent>
            </Card>
          </div>

          {/* Batch Manifest (Cart) */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="rounded-2xl md:rounded-[2.5rem] border-white shadow-2xl shadow-gray-200/50 overflow-hidden bg-white/80 backdrop-blur-xl min-h-[400px] flex flex-col">
              <CardHeader className="border-b border-gray-50 p-6 md:p-8 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg md:text-xl font-bold text-charcoal tracking-tight">Items to <span className="text-brand">Process.</span></CardTitle>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">{type === 'ISSUE' ? 'Issuing stock to worker' : 'Receiving stock into inventory'}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-black tracking-tighter text-charcoal">{manifest.length}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Total Items</p>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-8 flex-grow overflow-y-auto max-h-[500px]">
                {type === 'ISSUE' && (
                  <div className="mb-8 p-4 md:p-6 bg-charcoal rounded-2xl md:rounded-[2rem] text-white shadow-xl shadow-charcoal/20 animate-in slide-in-from-top-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 block">Issued To (Worker Name)</label>
                    <div className="relative group">
                       <ShoppingCart className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-brand transition-colors" />
                       <input 
                         required
                         placeholder="Type worker name..." 
                         className="w-full h-12 md:h-14 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl pl-14 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand focus:bg-white/10 transition-all text-sm font-medium"
                         value={workerName}
                         onChange={(e) => setWorkerName(e.target.value)}
                       />
                    </div>
                    <p className="text-[9px] font-bold text-gray-500 mt-3 uppercase tracking-widest flex items-center gap-2">
                       <AlertCircle className="h-3 w-3" /> Note: Worker name is required for all stock issues.
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {manifest.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 bg-white rounded-[1.5rem] border border-gray-50 hover:border-brand/20 transition-all group animate-in slide-in-from-right-4" style={{ animationDelay: `${idx * 50}ms` }}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                           <Package className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-charcoal leading-none mb-1">{m.item_name}</p>
                          <p className="text-[9px] font-black uppercase tracking-widest text-gray-300">Barcode: {m.barcode || 'Manual Entry'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-lg font-black tracking-tighter text-charcoal">{m.quantity}</p>
                          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Units</p>
                        </div>
                        <button 
                          onClick={() => removeFromManifest(m.item_id)}
                          className="w-10 h-10 flex items-center justify-center text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {manifest.length === 0 && (
                    <div className="py-20 text-center text-gray-300">
                       <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                       <p className="font-bold text-lg tracking-tight">The list is currently empty.</p>
                       <p className="text-[9px] font-black uppercase tracking-widest mt-2">Scan or select items to start.</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-8 border-t border-gray-50 bg-[#FAF9F6]/50">
                <Button 
                   onClick={handleSubmitManifest}
                   disabled={manifest.length === 0 || loading || (type === 'ISSUE' && !workerName)}
                   className={`w-full h-18 rounded-2xl text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl transition-all active:scale-95 ${type === 'ISSUE' ? 'bg-charcoal text-white hover:bg-red-600 shadow-red-900/10' : 'bg-charcoal text-white hover:bg-green-600 shadow-green-900/10'}`}
                >
                  {loading ? 'Processing...' : 'Confirm Transaction'}
                </Button>
                {success && (
                  <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-100 animate-in fade-in zoom-in-95">
                    <p className="text-center text-green-600 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                       <Check className="h-4 w-4" /> {success}
                    </p>
                    {lastIssued && (
                      <Button 
                        onClick={handlePrintSlip}
                        className="mt-4 w-full h-12 bg-charcoal text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-brand transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-900/10"
                      >
                         <FileText className="h-4 w-4" /> Print PDF Issue Slip
                      </Button>
                    )}
                  </div>
                )}
                {error && <p className="text-center text-red-600 text-[10px] font-black uppercase tracking-widest mt-4 animate-in fade-in">{error}</p>}
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        /* Industry List View */
        <Card className="rounded-2xl md:rounded-[2.5rem] border-white shadow-2xl shadow-gray-200/50 overflow-hidden bg-white/80 backdrop-blur-xl flex flex-col">
          <CardHeader className="border-b border-gray-50 p-6 md:p-8">
             <CardTitle className="text-lg md:text-xl font-bold text-charcoal tracking-tight">Inventory <span className="text-brand">Stock Summary.</span></CardTitle>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">Detailed overview of current stock levels</p>
          </CardHeader>
          <CardContent className="p-0 text-xs sm:text-sm">
             <div className="overflow-x-auto custom-scrollbar">
               <table className="min-w-[900px] lg:min-w-full divide-y divide-gray-50">
                 <thead className="bg-[#FAF9F6]">
                   <tr>
                     <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Item Name</th>
                     <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Brand</th>
                     <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Prices (Buy/Sell)</th>
                     <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Stock Count</th>
                     <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Min Level</th>
                     <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {allItems.map((i, idx) => (
                     <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                       <td className="px-8 py-6 whitespace-nowrap">
                          <p className="text-sm font-bold text-charcoal">{i.item_name}</p>
                          <p className="text-[10px] font-mono text-gray-400">{i.barcode || 'INTERNAL-ONLY'}</p>
                       </td>
                       <td className="px-8 py-6 whitespace-nowrap">
                          <span className="text-[10px] font-black uppercase tracking-widest text-brand bg-brand/5 px-3 py-1 rounded-lg border border-brand/10">
                             {i.brand?.name || 'GENERIC'}
                          </span>
                       </td>
                       <td className="px-8 py-6 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-500">Buy: ${i.buying_price || '0'}</p>
                          <p className="text-sm font-bold text-brand">Sell: ${i.selling_price || '0'}</p>
                       </td>
                       <td className="px-8 py-6 whitespace-nowrap">
                          <p className="text-lg font-black tracking-tighter text-charcoal">{i.quantity} <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest ml-1">Units</span></p>
                       </td>
                       <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-400 font-bold">
                          {i.min_quantity} <span className="text-[9px] uppercase">Min</span>
                       </td>
                       <td className="px-8 py-6 whitespace-nowrap">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${i.quantity <= i.min_quantity ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {i.quantity <= i.min_quantity ? 'LOW STOCK' : 'IN STOCK'}
                          </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </CardContent>
        </Card>
      )}

      {/* Transaction History Log (Compact) */}
      <div className="mt-12">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6 flex items-center gap-3 px-8">
           <RefreshCw className="h-3 w-3" /> Recent Transactions
        </h3>
        <Card className="rounded-[2.5rem] border-white shadow-xl shadow-gray-200/50 overflow-hidden bg-white/50 backdrop-blur-sm">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-50">
             {history.slice(0, 4).map((t, idx) => (
               <div key={idx} className="p-8 flex flex-col justify-between group hover:bg-white transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-xl ${t.type === 'ISSUE' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {t.type === 'ISSUE' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                    </div>
                    <p className={`text-xl font-black tracking-tighter ${t.type === 'ISSUE' ? 'text-red-400' : 'text-green-400'}`}>
                      {t.type === 'ISSUE' ? '-' : '+'}{t.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-charcoal truncate mb-1">{t.item.item_name}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                      {t.type === 'ISSUE' ? `To: ${t.worker_name || 'N/A'}` : `By: ${t.user.name}`}
                    </p>
                  </div>
               </div>
             ))}
           </div>
        </Card>
      </div>

      <Modal isOpen={isZeroStockAlertOpen} onClose={() => setIsZeroStockAlertOpen(false)}>
        <CardHeader className="p-8 border-b border-gray-50">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                <AlertCircle className="h-6 w-6" />
             </div>
             <div>
                <CardTitle className="text-xl font-bold text-charcoal tracking-tight">Zero Stock <span className="text-amber-500">Warning.</span></CardTitle>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Inventory Depleted</p>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
           <p className="text-sm font-medium text-gray-600 leading-relaxed">
             You are attempting to issue <span className="font-bold text-charcoal">{pendingItem?.item_name}</span>, but the current stock level is <span className="font-black text-red-500">0</span>. 
             Would you like to switch to the <span className="font-bold text-brand italic">Receive Stock</span> tab to add inventory for this item instead?
           </p>
        </CardContent>
        <CardFooter className="p-8 border-t border-gray-50 flex gap-4">
           <Button 
             variant="outline" 
             className="flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest"
             onClick={() => setIsZeroStockAlertOpen(false)}
           >
             Cancel
           </Button>
           <Button 
             className="flex-[2] h-12 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand/90 transition-all"
             onClick={confirmZeroStockRedirect}
           >
             Yes, Go to Receive
           </Button>
        </CardFooter>
      </Modal>
    </div>
  );
}
