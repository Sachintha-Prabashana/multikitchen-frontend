'use client';

import { useEffect, useState } from 'react';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/components';
import * as backupService from '@/services/backupService';
import { Database, Download, RefreshCw, Plus } from 'lucide-react';

export default function BackupPage() {
  const [backups, setBackups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBackups = async () => {
    try {
      const data = await backupService.getBackups();
      setBackups(data);
    } catch (error) {
      console.error('Failed to fetch backups', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  const handleCreateBackup = async () => {
    try {
      await backupService.createBackup();
      alert('Backup created successfully');
      fetchBackups();
    } catch (error) {
      alert('Failed to create backup');
    }
  };

  const handleRestore = async (fileName: string) => {
    if (!confirm(`Are you sure you want to restore from ${fileName}? Current data will be overwritten.`)) return;
    try {
      await backupService.restoreBackup(fileName);
      alert('Restore successful');
    } catch (error) {
      alert('Restore failed');
    }
  };

  if (loading) return <div>Loading backups...</div>;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="w-full md:w-auto">
          <h2 className="text-2xl md:text-3xl font-black text-charcoal tracking-tighter">System <span className="text-purple-600">Backups.</span></h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-1">Industrial Data Integrity & Disaster Recovery</p>
        </div>
        
        <Button 
          onClick={handleCreateBackup}
          className="w-full md:w-auto h-12 px-6 rounded-xl md:rounded-2xl bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
        >
          <Plus className="h-4 w-4" /> Create Registry Snapshot
        </Button>
      </div>

      <Card className="rounded-2xl md:rounded-[2.5rem] border-white shadow-2xl shadow-gray-200/50 overflow-hidden bg-white/80 backdrop-blur-xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <div className="min-w-[600px] divide-y divide-gray-50 bg-white">
              {backups.map((backup) => (
                <div key={backup.backup_id} className="p-6 md:p-8 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                      <Database className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-charcoal tracking-tight truncate max-w-[200px] md:max-w-md">{backup.file_path}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Created {new Date(backup.date).toLocaleDateString()}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                        <span className="text-[9px] font-bold text-brand uppercase tracking-widest">By {backup.user.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleRestore(backup.file_path)} 
                      variant="outline" 
                      className="h-10 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-gray-100 hover:bg-purple-50 hover:text-purple-600 transition-all"
                    >
                      <RefreshCw className="mr-2 h-3 w-3" /> Restore Snapshot
                    </Button>
                  </div>
                </div>
              ))}
              {backups.length === 0 && (
                <div className="py-24 text-center">
                  <Database className="h-12 w-12 mx-auto text-gray-200 mb-4" />
                  <p className="text-charcoal font-bold text-xl">No historical backups.</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Initialize your first system snapshot.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
