'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import * as reportService from '@/services/reportService';
import { Button, Card, CardHeader, CardTitle, CardContent, Input, cn } from '@/components/ui/components';
import { 
  FileText, 
  Download, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Package, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
);

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Report Hub State
  const [reportType, setReportType] = useState<'STOCK' | 'TRANSACTIONS'>('TRANSACTIONS');
  const [periodType, setPeriodType] = useState<'DAILY' | 'MONTHLY' | 'YEARLY'>('DAILY');
  const [dateValue, setDateValue] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const summary = await reportService.getSummaryAnalytics();
      setData(summary);
    } catch (error) {
      console.error('Failed to fetch analytics', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format: 'pdf' | 'excel') => {
    try {
      const blob = await reportService.exportReport(format, reportType, periodType, dateValue);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportType}-${periodType}-${dateValue}.${format === 'pdf' ? 'pdf' : 'xlsx'}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed', error);
      alert('Report generation failed. Please check server logs.');
    }
  };

  if (loading || !data) return (
     <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading System Analytics...</p>
     </div>
  );

  const { summary, trends } = data;

  const lineData = {
    labels: trends.map((t: any) => t.date.split('-').slice(1).join('/')),
    datasets: [
      {
        label: 'Activity',
        data: trends.map((t: any) => t.issues + t.receives),
        borderColor: '#C15B32',
        backgroundColor: 'rgba(193, 91, 50, 0.05)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="border-b border-gray-100 pb-8 md:pb-12">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 md:mb-4">Inventory <span className="text-brand">Intelligence.</span></h1>
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">MultiKitchen Co — Executive Analysis Hub</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Col: Simple Analytics */}
        <div className="lg:col-span-12 space-y-8 md:space-y-12">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <KPICard title="Portfolio Valuation" value={`LKR ${summary.totalStockValue.toLocaleString()}`} icon={TrendingUp} color="text-charcoal" />
              <KPICard title="Inventory Health" value={`${Math.round((summary.healthyStockItems / summary.totalItems) * 100)}%`} icon={CheckCircle2} color="text-emerald-500" />
              <KPICard title="Movement Frequency" value={trends.reduce((acc:any, t:any) => acc + t.issues + t.receives, 0)} icon={Layers} color="text-brand" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <Card className="rounded-2xl md:rounded-[3rem] border-white shadow-2xl p-6 md:p-10 bg-white/50 h-64 md:h-80">
                 <CardTitle className="text-lg md:text-xl font-black uppercase tracking-widest text-gray-400 mb-6 md:mb-8 whitespace-nowrap overflow-hidden text-ellipsis">Recent Movement Trends</CardTitle>
                 <div className="h-40 md:h-48">
                    <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false }, ticks: { font: { size: 9 } } } } }} />
                 </div>
              </Card>

              {/* REPORT HUB: The Central Feature */}
              <Card className="rounded-2xl md:rounded-[3rem] border-brand/20 shadow-2xl p-6 md:p-10 bg-[#1A1A1A] text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                 
                 <CardHeader className="p-0 mb-6 md:mb-8 border-b border-white/5 pb-4 md:pb-6">
                    <CardTitle className="text-xl font-bold tracking-tight">Report <span className="text-brand italic">Generation Hub.</span></CardTitle>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">Configure & Download Industrial Audit Logs</p>
                 </CardHeader>

                 <CardContent className="p-0 space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="space-y-1.5 md:space-y-2">
                          <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-500">Report Focus</label>
                          <select 
                            value={reportType} 
                            onChange={(e:any) => setReportType(e.target.value)}
                            className="w-full h-11 md:h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-[9px] md:text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-brand text-white"
                          >
                             <option value="STOCK" className="bg-[#1A1A1A] text-white">Current Stock</option>
                             <option value="TRANSACTIONS" className="bg-[#1A1A1A] text-white">Transactions Log</option>
                          </select>
                       </div>
                       <div className="space-y-1.5 md:space-y-2">
                          <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-500">Period Interval</label>
                          <select 
                            value={periodType} 
                            onChange={(e:any) => setPeriodType(e.target.value)}
                            className="w-full h-11 md:h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-[9px] md:text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-brand text-white"
                          >
                             <option value="DAILY" className="bg-[#1A1A1A] text-white">Single Day</option>
                             <option value="MONTHLY" className="bg-[#1A1A1A] text-white">Full Month</option>
                             <option value="YEARLY" className="bg-[#1A1A1A] text-white">Full Year</option>
                          </select>
                       </div>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                       <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-500">Selection Date</label>
                       <div className="relative">
                          <Input 
                            type="date" 
                            className="w-full h-11 md:h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-[9px] md:text-[10px] font-bold text-white uppercase tracking-widest"
                            value={dateValue}
                            onChange={(e) => setDateValue(e.target.value)}
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-2 md:pt-4">
                       <Button onClick={() => handleDownload('pdf')} className="h-12 md:h-14 bg-white text-charcoal rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-brand hover:text-white transition-all shadow-xl shadow-gray-900/20">
                          <FileText className="h-4 w-4 mr-2" /> Download PDF
                       </Button>
                       <Button onClick={() => handleDownload('excel')} variant="outline" className="h-12 md:h-14 border-white/10 text-white rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                          <Download className="h-4 w-4 mr-2" /> Master XLSX
                       </Button>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="rounded-2xl md:rounded-[2.5rem] border-white shadow-xl p-6 md:p-8 hover:-translate-y-1 transition-all duration-500 bg-white">
       <CardContent className="p-0 flex justify-between items-center">
          <div className="min-w-0 pr-4">
             <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1 truncate">{title}</p>
             <p className={cn("text-xl md:text-3xl font-black tracking-tighter truncate", color)}>{value}</p>
          </div>
          <div className="p-2.5 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl text-brand flex-shrink-0">
             <Icon className="h-4 w-4 md:h-5 md:w-5" />
          </div>
       </CardContent>
    </Card>
  );
}
