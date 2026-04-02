'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/components';
import { useAuth } from '@/hooks/useAuth';
import * as authService from '@/services/authService';
import { User, Mail, Lock, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setSaving(false);
      return;
    }

    try {
      await authService.updateProfile({
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined,
      });
      setSuccess('Profile updated successfully. Your new credentials are now active.');
      setFormData({ ...formData, password: '', confirmPassword: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading Profile...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-black text-charcoal tracking-tighter">Account <span className="text-brand">Settings.</span></h2>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-1">Manage your administrative credentials</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="rounded-[2.5rem] border-white shadow-2xl shadow-gray-200/50 bg-white/80 backdrop-blur-xl overflow-hidden">
            <div className="p-10 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-brand/10 rounded-[2rem] flex items-center justify-center text-brand mb-6 shadow-pill">
                <User className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-black text-charcoal truncate w-full uppercase tracking-tight">{user?.name}</h3>
              <p className={`text-[10px] font-black uppercase tracking-widest mt-2 px-4 py-1.5 rounded-full ${user?.role === 'OWNER' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                {user?.role} Access
              </p>
            </div>
            <div className="px-8 pb-10 space-y-4">
               <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-gray-50">
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1 leading-none">Registered Email</p>
                  <p className="text-xs font-bold text-charcoal truncate">{user?.email}</p>
               </div>
               <div className="flex items-center gap-2 p-3 text-[9px] font-bold text-green-600 uppercase tracking-widest">
                  <ShieldCheck className="h-3 w-3" /> System Verified Account
               </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="rounded-[2.5rem] border-white shadow-2xl shadow-gray-200/50 bg-white/80 backdrop-blur-xl">
            <CardHeader className="p-10 border-b border-gray-50">
              <CardTitle className="text-xl font-bold text-charcoal tracking-tight">Security <span className="text-brand">Update.</span></CardTitle>
            </CardHeader>
            <CardContent className="p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
                  <div className="relative group">
                    <Input 
                      required
                      placeholder="Your name..." 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-14 rounded-2xl bg-gray-50 border-gray-50 focus:bg-white transition-all text-charcoal font-medium pl-12"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-brand transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
                  <div className="relative group">
                    <Input 
                      type="email"
                      required
                      placeholder="email@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-14 rounded-2xl bg-gray-50 border-gray-50 focus:bg-white transition-all text-charcoal font-medium pl-12"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-brand transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">New Password (Leave blank to keep same)</label>
                    <div className="relative group">
                      <Input 
                        type="password"
                        placeholder="••••••••" 
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="h-14 rounded-2xl bg-gray-50 border-gray-50 focus:bg-white transition-all text-charcoal font-medium pl-12"
                      />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-brand transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Confirm New Password</label>
                    <div className="relative group">
                      <Input 
                        type="password"
                        placeholder="••••••••" 
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="h-14 rounded-2xl bg-gray-50 border-gray-50 focus:bg-white transition-all text-charcoal font-medium pl-12"
                      />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-brand transition-colors" />
                    </div>
                  </div>
                </div>

                {success && (
                  <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-start gap-4 animate-in slide-in-from-top-4">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-green-800 font-bold uppercase tracking-tight leading-relaxed">
                      {success}
                    </p>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 animate-in zoom-in-95">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-red-800 font-bold uppercase tracking-tight leading-relaxed">
                      {error}
                    </p>
                  </div>
                )}

                <Button 
                  type="submit"
                  disabled={saving}
                  className="w-full h-14 rounded-2xl bg-charcoal text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-brand transition-all active:scale-[0.98]"
                >
                  {saving ? 'Synchronizing...' : 'Save Updated Security Details'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
