import api from '../lib/api';

export const getBrands = async () => {
  const { data } = await api.get('/brands');
  return data;
};

export const createBrand = async (name: string) => {
  const { data } = await api.post('/brands', { name });
  return data;
};
