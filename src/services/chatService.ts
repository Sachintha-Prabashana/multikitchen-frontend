import api from '../lib/api';

export const sendMessage = async (messageData: { sender_name: string; message: string }) => {
  const { data } = await api.post('/chat/send', messageData);
  return data;
};

export const getMessages = async () => {
  const { data } = await api.get('/chat/messages');
  return data;
};

export const replyToMessage = async (id: number, reply: string) => {
  const { data } = await api.post(`/chat/reply/${id}`, { reply });
  return data;
};
