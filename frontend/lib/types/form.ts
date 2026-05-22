export interface RIFormData {
  // Sheet 1: REQUERIMIENTOS NUTRICIONALES
  info_general: {
    fecha_visita: string;
    sede_educativa: string;
    num_servicios: string;
    atiende_nombre: string;
    atiende_cargo: string;
    realiza_nombre: string;
    realiza_cargo: string;
  };
  visita: {
    opcion_1ra: string;
    opcion_2da: string;
    opcion_3ra: string;
  };
  menu: {
    descripcion_menu: string;
    intercambio_alimento: string;
    intercambio_motivo: string;
    intercambio_fecha: string;
    intercambio_autorizado_por: string;
  };
  calificaciones: Record<string, string>;
  observaciones: { texto: string };
  firmas: SignatureData;

  // Sheet 2: DESPACHO Y SUMINISTRO
  info_general_despacho: Record<string, string>;
  calificaciones_despacho: Record<string, string>;
  componentes: Record<string, string>;
  observaciones_despacho: { texto: string };
  firmas_despacho: SignatureData;

  // Sheet 3: VERIFICACIÓN ORG, GRAM Y TEMP
  info_general_verificacion: Record<string, string>;
  productos: Record<string, string>;
  observaciones_verificacion: {
    obs_organolep: string;
    obs_gramajes_temp: string;
  };
  firmas_verificacion: SignatureData;

  // Sheet 4: ROTULADO
  info_general_rotulado: Record<string, string>;
  productos_res5109: Record<string, string>;
  productos_res333: Record<string, string>;
  observaciones_rotulado: { texto: string };
  firmas_rotulado: SignatureData;

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

export interface SignatureData {
  firma1_nombre: string;
  firma1_documento: string;
  firma1_cargo: string;
  firma2_nombre: string;
  firma2_documento: string;
  firma2_cargo: string;
}

export type UpdateFunction = (section: string, field: string, value: string) => void;