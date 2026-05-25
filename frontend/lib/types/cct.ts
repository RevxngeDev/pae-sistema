import { SignatureData } from './form';

export interface CCTFormData {
  // Sheet 1: TEMP - ORG
  info_general: {
    etc_no_c: string;
    fecha_visita: string;
    sede_educativa: string;
    jornada_manana: string;
    jornada_tarde: string;
    almuerzo: string;
    operador: string;
    num_servicios: string;
  };
  preparaciones: Record<string, string>;
  indicador: {
    porcentaje_cumplimiento: string;
  };
  observaciones: { texto: string };
  firmas: SignatureData;

  // Sheet 2: TRANS Y DISTRIB
  info_general_trans: Record<string, string>;
  menu_trans: { descripcion_menu: string };
  info_ruta: Record<string, string>;
  distribucion: Record<string, string>;
  calif_personal_manipulador: Record<string, string>;
  calif_vehiculos: Record<string, string>;
  calif_entrega: Record<string, string>;
  calif_consumo: Record<string, string>;
  observaciones_generales_trans: { texto: string };
  firmas_trans: SignatureData;

  // Sheet 3: REQUERIMIENTOS ALIM Y NUTR
  info_general_req: Record<string, string>;
  menu_req: { descripcion_menu: string };
  intercambios_req: {
    alimento: string;
    motivo: string;
    fecha: string;
    autorizado_por: string;
  };
  calificaciones_req: Record<string, string>;
  observaciones_req: { texto: string };
  firmas_req: SignatureData;

  // Sheet 4: GRAMAJES
  info_general_gramajes: Record<string, string>;
  instrumento: Record<string, string>;
  intercambios_gramajes: Record<string, string>;
  alimentos_programados: Record<string, string>;
  alimentos_verificados: Record<string, string>;
  gramajes_tabla: Record<string, string>;
  observaciones_gramajes: { texto: string };
  cambios_menu: Record<string, string>;

  // Sheets 5-6: Photos
  fotos_general: {
    sede_educativa: string;
    fecha: string;
    periodo: string;
    foto_1?: File | null;
    descripcion_1: string;
    foto_2?: File | null;
    descripcion_2: string;
    foto_3?: File | null;
    descripcion_3: string;
    foto_4?: File | null;
    descripcion_4: string;
    foto_5?: File | null;
    descripcion_5: string;
    foto_6?: File | null;
    descripcion_6: string;
    foto_7?: File | null;
    descripcion_7: string;
    foto_8?: File | null;
    descripcion_8: string;
    foto_9?: File | null;
    descripcion_9: string;
    foto_10?: File | null;
    descripcion_10: string;
    foto_11?: File | null;
    descripcion_11: string;
    foto_12?: File | null;
    descripcion_12: string;
  };
  fotos_hallazgos: {
    sede_educativa: string;
    fecha: string;
    periodo: string;
    foto_1?: File | null;
    descripcion_1: string;
    foto_2?: File | null;
    descripcion_2: string;
    foto_3?: File | null;
    descripcion_3: string;
    foto_4?: File | null;
    descripcion_4: string;
    foto_5?: File | null;
    descripcion_5: string;
    foto_6?: File | null;
    descripcion_6: string;
    foto_7?: File | null;
    descripcion_7: string;
    foto_8?: File | null;
    descripcion_8: string;
    foto_9?: File | null;
    descripcion_9: string;
    foto_10?: File | null;
    descripcion_10: string;
    foto_11?: File | null;
    descripcion_11: string;
    foto_12?: File | null;
    descripcion_12: string;
  };
}

export type CCTUpdateFunction = (section: string, field: string, value: string) => void;