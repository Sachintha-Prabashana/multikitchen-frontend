'use client';
// Refreshed dashboard route via minor edit to trigger Next.js rebuild

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/components';
import { Package, AlertTriangle, TrendingUp, Clock, Activity, ArrowUpRight, ArrowDownLeft, User as UserIcon } from 'lucide-react';
import * as reportService from '@/services/reportService';
import * as stockService from '@/services/stockService';
import { useAuth } from '@/hooks/useAuth';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const { user: currentUser } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [report, daily, lowStock, history] = await Promise.all([
          reportService.getStockReport(),
          reportService.getDailyReport(),
          stockService.getLowStock(),
          stockService.getHistory()
        ]);
        
        setActivities(history.slice(0, 5));
        setStats({
          totalItems: report.totalItems,
          stockValue: report.totalStockValue,
          lowStockCount: lowStock.length,
          todayIssues: daily.totalIssues,
          todayReceives: daily.totalReceives,
          chartData: {
            labels: ['Stock Issued', 'Stock Received'],
            datasets: [{
              label: 'Today\'s Activity',
              data: [daily.totalIssues, daily.totalReceives],
              backgroundColor: ['#C15B32', '#1F1F1F'],
              borderColor: ['#C15B32', '#1F1F1F'],
              borderWidth: 0,
              borderRadius: 8,
            }]
          }
        });
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
           <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Syncing System Data...</p>
        </div>
     );
  }

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-500">
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-gray-100 pb-8 md:pb-12 gap-6">
         <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 md:mb-4">Dashboard <span className="text-brand">Overview.</span></h1>
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Real-time Operations Monitoring — © 2026 MultiKitchen Pvt Ltd</p>
         </div>
         <div className="bg-[#1F1F1F] text-white px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 shadow-xl shadow-gray-900/10 self-end sm:self-auto">
            <Activity className="h-3 w-3 md:h-4 md:w-4 text-brand" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">System Operational</span>
         </div>
      </div>

      {/* Stats Cards - Hidden on mobile per user request */}
      <div className="hidden md:grid grid-cols-2 xl:grid-cols-4 gap-6 md:gap-10">
        <StatCard title="Total Inventory Item" value={stats.totalItems} icon={Package} type="dark" desc="Active items in registry" />
        <StatCard title="Total Stock Value" value={`LKR ${stats.stockValue.toLocaleString()}`} icon={TrendingUp} type="light" desc="Estimated inventory worth" />
        <StatCard title="Low Stock Warning" value={stats.lowStockCount} icon={AlertTriangle} type="warning" desc="Items below minimum level" />
        <StatCard title="Today's Movements" value={stats.todayIssues + stats.todayReceives} icon={Clock} type="accent" desc="Total stock operations today" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-10">
        <div className="xl:col-span-4">
          <Card className="bg-white rounded-2xl md:rounded-[3rem] border border-gray-100 shadow-2xl h-full p-6 md:p-10 flex flex-col">
            <CardHeader className="p-0 mb-6 md:mb-8 border-b border-gray-50 pb-4 md:pb-6 flex flex-row items-center justify-between">
              <CardTitle className="text-xl md:text-2xl font-bold tracking-tight">Recent <span className="text-brand">Activity.</span></CardTitle>
              <ArrowUpRight className="h-4 w-4 text-gray-300" />
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <div className="space-y-4 md:space-y-6">
                {activities.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-4 animate-in slide-in-from-bottom-2" style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className={`p-2.5 md:p-3 rounded-xl shrink-0 ${activity.type === 'ISSUE' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {activity.type === 'ISSUE' ? <ArrowUpRight className="h-3.5 w-3.5 md:h-4 md:w-4" /> : <ArrowDownLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-[11px] md:text-xs font-bold text-charcoal truncate">{activity.item.item_name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest ${activity.type === 'ISSUE' ? 'text-red-400' : 'text-green-400'}`}>
                          {activity.type === 'ISSUE' ? 'Issued' : 'Received'} {activity.quantity}
                        </span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                        <span className="text-[8px] md:text-[9px] font-medium text-gray-400 uppercase">
                          {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      {currentUser?.role === 'OWNER' && (
                        <div className="mt-2 pt-2 border-t border-gray-50 flex items-center gap-2">
                           <UserIcon className="h-2.5 w-2.5 md:h-3 md:w-3 text-gray-300" />
                           <p className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest truncate">
                             {activity.type === 'ISSUE' ? `To: ${activity.worker_name || 'N/A'}` : `By: ${activity.user.name}`}
                           </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {activities.length === 0 && (
                  <div className="py-12 md:py-20 text-center opacity-40">
                     <Clock className="h-8 w-8 mx-auto mb-4 text-gray-300" />
                     <p className="text-[10px] font-black uppercase tracking-widest">No activity recorded yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-8">
          <Card className="bg-white rounded-2xl md:rounded-[3rem] border border-gray-100 shadow-2xl h-full p-6 md:p-10">
            <CardHeader className="p-0 mb-6 md:mb-8 border-b border-gray-50 pb-4 md:pb-6">
              <CardTitle className="text-xl md:text-2xl font-bold tracking-tight">Transaction <span className="text-brand">Overview.</span></CardTitle>
            </CardHeader>
            <CardContent className="h-64 md:h-80 w-full flex items-center justify-center p-0 md:p-6">
              <Bar 
                data={stats.chartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: '#1F1F1F',
                      titleFont: { family: 'Inter', weight: 900, size: 10 },
                      bodyFont: { family: 'Inter', weight: 400, size: 12 },
                      padding: 12,
                      cornerRadius: 8
                    }
                  },
                  scales: {
                    x: { grid: { display: false }, ticks: { font: { size: 9 } } },
                    y: { grid: { color: '#F8FAFC' }, ticks: { font: { size: 9 } } }
                  }
                }} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, type, desc }: any) {
  const themes: any = {
    dark: "bg-[#1F1F1F] text-[#F9F7F2]",
    light: "bg-white text-[#1F1F1F]",
    warning: "bg-white border-brand/20",
    accent: "bg-[#F9F7F2] text-[#1F1F1F]"
  };

  return (
    <Card className={`rounded-3xl md:rounded-[3rem] border border-gray-100 shadow-2xl transition-all hover:-translate-y-1 md:hover:-translate-y-2 duration-500 overflow-hidden relative ${themes[type]}`}>
      {type === 'warning' && <div className="absolute top-0 left-0 w-full h-1 bg-brand" />}
      <CardContent className="p-6 md:p-10 flex flex-col justify-between h-48 md:h-64">
        <div className="flex justify-between items-start">
           <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${type === 'dark' ? 'bg-brand' : 'bg-white md:bg-[#F9F7F2] text-brand border border-gray-50 md:border-0'}`}>
             <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
           </div>
           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hidden xs:block">Key Metrics</span>
        </div>
        <div className="mt-4 md:mt-8">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 md:mb-2 truncate">{title}</p>
          <p className={`text-2xl md:text-4xl font-black tracking-tighter mb-2 md:mb-4 truncate ${type === 'dark' ? 'text-white' : 'text-[#1F1F1F]'}`}>{value}</p>
          <div className="h-px w-6 md:w-8 bg-brand mb-2 md:mb-4" />
          <p className="text-[8px] md:text-[9px] font-medium text-gray-400 uppercase tracking-widest leading-none truncate">{desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}
