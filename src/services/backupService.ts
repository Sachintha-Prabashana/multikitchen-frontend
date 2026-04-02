import api from '../lib/api';

export const createBackup = async () => {
  const { data } = await api.post('/backup/create');
  return data;
};

export const getBackups = async () => {
  const { data } = await api.get('/backup');
  return data;
};

export const restoreBackup = async (fileName: string) => {
  const { data } = await api.post('/backup/restore', { fileName });
  return data;
};
