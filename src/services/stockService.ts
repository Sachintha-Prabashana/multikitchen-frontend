import api from '../lib/api';

export const issueStock = async (stockData: { item_id: number; quantity: number }) => {
  const { data } = await api.post('/stock/issue', stockData);
  return data;
};

export const batchIssueStock = async (stockData: { items: { item_id: number; quantity: number }[]; worker_name: string }) => {
  const { data } = await api.post('/stock/issue/batch', stockData);
  return data;
};

export const receiveStock = async (stockData: { item_id: number; quantity: number }) => {
  const { data } = await api.post('/stock/receive', stockData);
  return data;
};

export const batchReceiveStock = async (stockData: { items: { item_id: number; quantity: number }[] }) => {
  const { data } = await api.post('/stock/receive/batch', stockData);
  return data;
};

export const getHistory = async () => {
  const { data } = await api.get('/stock/history');
  return data;
};

export const getLowStock = async () => {
  const { data } = await api.get('/stock/low');
  return data;
};
