import api from '../lib/api';

export const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const updateRole = async (id: number, role: string) => {
  const { data } = await api.put(`/users/${id}`, { role });
  return data;
};

export const deleteUser = async (id: number) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};
