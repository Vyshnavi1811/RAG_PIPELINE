import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = {
  async uploadPDFs(files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await axios.post(`${API_URL}/pdf/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async processPDF(fileId: string) {
    const response = await axios.post(`${API_URL}/pdf/process/${fileId}`);
    return response.data;
  },

  async sendChatQuery(query: string) {
    const response = await axios.post(`${API_URL}/chat/query`, { query });
    return response.data;
  },
};