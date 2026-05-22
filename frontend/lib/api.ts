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
    const data = new FormData();
    
    const { fotos_general, fotos_hallazgos, ...regularData } = formData;
    
    data.append('form_data', JSON.stringify(regularData));
    
    // Metadata (descriptions, info)
    const buildMeta = (fotos: any) => ({
      sede_educativa: fotos.sede_educativa,
      fecha: fotos.fecha,
      periodo: fotos.periodo,
      ...Array.from({ length: 12 }, (_, i) => i + 1).reduce((acc, num) => ({
        ...acc,
        [`descripcion_${num}`]: fotos[`descripcion_${num}`] || '',
      }), {}),
    });
    
    data.append('fotos_general_meta', JSON.stringify(buildMeta(fotos_general)));
    data.append('fotos_hallazgos_meta', JSON.stringify(buildMeta(fotos_hallazgos)));
    
    // Add all 24 photo files (only the ones that exist)
    for (let i = 1; i <= 12; i++) {
      if (fotos_general[`foto_${i}`]) {
        data.append(`foto_general_${i}`, fotos_general[`foto_${i}`]);
      }
      if (fotos_hallazgos[`foto_${i}`]) {
        data.append(`foto_hallazgos_${i}`, fotos_hallazgos[`foto_${i}`]);
      }
    }
    
    const response = await api.post(
      `/templates/generate-ri-public?inspector_code=${code}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      }
    );
    return response.data;
  },
};