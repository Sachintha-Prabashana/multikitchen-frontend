'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/components';
import { Mail, Lock as LockIcon, Eye, EyeOff } from 'lucide-react';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAF9F6] font-sans p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C15B32]/5 rounded-full blur-[100px] -mr-48 -mt-48 opacity-40 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1F1F1F]/5 rounded-full blur-[80px] -ml-32 -mb-32 opacity-20" />
      
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-2xl shadow-gray-900/5 p-4 sm:p-8 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C15B32]/40 to-transparent" />
        
        <CardHeader className="text-center pb-10 pt-2">
           <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C15B32] mb-6 flex items-center justify-center gap-2">
             <span className="w-8 h-[1px] bg-[#C15B32]/20" />
             The Atelier
             <span className="w-8 h-[1px] bg-[#C15B32]/20" />
           </div>
           <CardTitle className="text-4xl font-serif text-[#1A1A1A] tracking-tighter leading-none">
             Staff <span className="italic font-light text-[#C15B32]">Access.</span>
           </CardTitle>
           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-6 opacity-60">Authorized Personnel Management</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Credential Identifier</label>
              <div className="relative group/field">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 transition-transform duration-300 group-focus-within/field:scale-110">
                  <Mail className="h-4 w-4 text-gray-400 group-focus-within/field:text-[#C15B32] transition-colors" strokeWidth={2} />
                </div>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="h-16 rounded-2xl bg-cream/50 border-0 pl-14 pr-6 focus:ring-4 focus:ring-brand/10 transition-all font-semibold text-charcoal placeholder:text-gray-400/60 placeholder:italic placeholder:font-normal"
                  placeholder="office@multikitchen.lk"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-1">
                 <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Security Key</label>
                 <Link href="/forgot-password" title="Contact Admin" className="text-[8px] font-black uppercase tracking-widest text-[#C15B32]/60 hover:text-[#C15B32] transition-colors border-b border-[#C15B32]/10 hover:border-[#C15B32] pb-0.5">
                    Forgotten?
                 </Link>
              </div>
              <div className="relative group/field">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 transition-transform duration-300 group-focus-within/field:scale-110">
                  <LockIcon className="h-4 w-4 text-gray-400 group-focus-within/field:text-[#C15B32] transition-colors" strokeWidth={2} />
                </div>
                <Input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="h-16 rounded-2xl bg-cream/50 border-0 pl-14 pr-14 focus:ring-4 focus:ring-brand/10 transition-all font-semibold text-charcoal placeholder:tracking-[0.3em]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C15B32] transition-colors z-10 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 py-3 px-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider text-center">{error}</p>
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-16 rounded-2xl bg-[#1A1A1A] text-[#FAF9F6] font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-[#C15B32] hover:shadow-xl hover:shadow-[#C15B32]/20 transition-all active:scale-[0.98] disabled:opacity-50 mt-4 relative overflow-hidden group"
            >
              <span className="relative z-10">{isLoading ? 'Initializing...' : 'Initialize Session'}</span>
            </Button>
          </form>

          <div className="mt-10 text-center">
             <Link href="/" className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#C15B32] transition-all hover:tracking-[0.3em]">
                ← Return to Showroom
             </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
