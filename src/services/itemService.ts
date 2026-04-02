import api from '../lib/api';

export const getItems = async () => {
  const { data } = await api.get('/items');
  return data;
};

export const createItem = async (itemData: any) => {
  const { data } = await api.post('/items', itemData);
  return data;
};

export const updateItem = async (id: number, itemData: any) => {
  const { data } = await api.put(`/items/${id}`, itemData);
  return data;
};

export const deleteItem = async (id: number) => {
  const { data } = await api.delete(`/items/${id}`);
  return data;
};
