/**
 * Axios instance configured for backend API
 */
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inspector API calls
export const inspectorApi = {
  validateCode: async (code: string) => {
    const response = await api.post('/inspectores/validar-codigo', { codigo: code });
    return response.data;
  },
  
  generateRI: async (code: string, formData: any) => {
    const response = await api.post(
      `/templates/generate-ri-public?inspector_code=${code}`,
      formData,
      {
        responseType: 'blob', // Important for file download
      }
    );
    return response.data;
  },
};