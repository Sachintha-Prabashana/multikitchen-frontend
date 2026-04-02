'use client';

import { useState } from 'react';
import { Button, Input, Modal, CardHeader, CardTitle, CardContent } from '@/components/ui/components';
import { X, UserPlus, Shield, Mail, Lock } from 'lucide-react';
import * as authService from '@/services/authService';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UserModal({ isOpen, onClose, onSuccess }: UserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await authService.register(formData);
      onSuccess();
      onClose();
      setFormData({ name: '', email: '', password: '', role: 'ADMIN' });
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Registration failed');
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
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <UserPlus className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-charcoal tracking-tight">
              Register <span className="text-blue-600">Admin.</span>
            </CardTitle>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Create Access Credentials</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-8 px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
            <div className="relative group">
              <Input 
                required
                placeholder="Staff Member Name..." 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white transition-all text-charcoal font-medium pl-12"
              />
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
            <div className="relative group">
              <Input 
                type="email"
                required
                placeholder="staff@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white transition-all text-charcoal font-medium pl-12"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Temporary Password</label>
            <div className="relative group">
              <Input 
                type="password"
                required
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white transition-all text-charcoal font-medium pl-12"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Access Level</label>
            <select 
              className="w-full h-14 rounded-2xl bg-gray-50 border border-gray-100 px-4 text-sm font-bold appearance-none focus:bg-white transition-all cursor-pointer"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="ADMIN">System Administrator</option>
              <option value="OWNER">System Owner (Full Access)</option>
            </select>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
               <X className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
               <p className="text-[10px] text-red-700 font-bold uppercase tracking-tight leading-relaxed">
                  Configuration Error: {error}
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
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={loading}
              className="flex-[2] h-14 rounded-2xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-700 shadow-xl shadow-blue-900/20 active:scale-95 transition-all"
            >
              {loading ? 'Creating...' : 'Grant Access'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Modal>
  );
}
