'use client';

import { useEffect, useState } from 'react';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/components';
import * as userService from '@/services/userService';
import { Users, Shield, Trash, UserPlus, Mail, Fingerprint } from 'lucide-react';
import UserModal from '@/components/admin/UserModal';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id: number, role: string) => {
    try {
      await userService.updateRole(id, role);
      fetchUsers();
    } catch (error) {
      alert('Failed to update role');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user? This will revoke all access.')) return;
    try {
      await userService.deleteUser(id);
      fetchUsers();
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="w-full md:w-auto">
          <h2 className="text-2xl md:text-3xl font-black text-charcoal tracking-tighter">User <span className="text-blue-600">Management.</span></h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-1">Control administrative access and permissions</p>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto h-12 px-6 rounded-xl md:rounded-2xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
        >
          <UserPlus className="h-4 w-4" /> Add New User
        </Button>
      </div>

      <Card className="rounded-2xl md:rounded-[2.5rem] border-white shadow-2xl shadow-gray-200/50 overflow-hidden bg-white/80 backdrop-blur-xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-[800px] lg:min-w-full divide-y divide-gray-50">
              <thead className="bg-[#FAF9F6]">
                <tr>
                  <th className="px-6 md:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Profile Details</th>
                  <th className="px-6 md:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Access Credentials</th>
                  <th className="px-6 md:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Permission Level</th>
                  <th className="px-6 md:px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 md:px-8 py-6 whitespace-nowrap">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                             <Fingerprint className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-bold text-charcoal tracking-tight">{user.name}</span>
                       </div>
                    </td>
                    <td className="px-6 md:px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="h-3 w-3" />
                        <span className="text-xs font-medium">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-6 whitespace-nowrap">
                      <div className="relative group/select">
                        <Shield className={`absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 ${user.role === 'OWNER' ? 'text-red-500' : 'text-blue-500'}`} />
                        <select 
                          value={user.role} 
                          onChange={(e) => handleRoleChange(user.user_id, e.target.value)}
                          className={`pl-8 pr-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border-0 ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer ${user.role === 'OWNER' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="OWNER">OWNER</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-6 whitespace-nowrap text-right text-sm">
                      <button 
                        onClick={() => handleDelete(user.user_id)} 
                        className="w-10 h-10 ml-auto flex items-center justify-center text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Revoke Access"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && !loading && (
              <div className="py-24 text-center">
                <Users className="h-12 w-12 mx-auto text-gray-200 mb-4" />
                <p className="text-charcoal font-bold text-xl">No active users.</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Initialize your administrative team.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchUsers} 
      />
    </div>
  );
}
