import api from '../lib/api';

export const getStockReport = async () => {
  const { data } = await api.get('/reports/stock');
  return data;
};

export const getDailyReport = async (date?: string) => {
  const { data } = await api.get('/reports/daily', { params: { date } });
  return data;
};

export const getMonthlyReport = async (year?: number, month?: number) => {
  const { data } = await api.get('/reports/monthly', { params: { year, month } });
  return data;
};

export const exportReport = async (
  format: 'pdf' | 'excel', 
  reportType: 'STOCK' | 'TRANSACTIONS' = 'STOCK',
  periodType: 'DAILY' | 'MONTHLY' | 'YEARLY' = 'DAILY',
  dateValue: string = new Date().toISOString()
) => {
  const { data } = await api.get('/reports/export', {
    params: { format, reportType, periodType, dateValue },
    responseType: 'blob'
  });
  return data;
};

export const getSummaryAnalytics = async () => {
  const { data } = await api.get('/reports/summary');
  return data;
};
