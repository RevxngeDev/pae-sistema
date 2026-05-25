'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileDown, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { TempOrgTab } from '@/components/forms/cct/TempOrgTab';
import { TransDistribTab } from '@/components/forms/cct/TransDistribTab';
import { RequerimientosAlimTab } from '@/components/forms/cct/RequerimientosAlimTab';
import { GramajesTab } from '@/components/forms/cct/GramajesTab';
import { PhotosTab } from '@/components/forms/PhotosTab';
import { SuccessDialog } from '@/components/forms/SuccessDialog';
import { ErrorDialog } from '@/components/forms/ErrorDialog';
import { CCTFormData } from '@/lib/types/cct';
import { inspectorApi } from '@/lib/api';
import { downloadBlob } from '@/lib/utils/download';

const initialFormData: CCTFormData = {
  info_general: {
    etc_no_c: '',
    fecha_visita: '',
    sede_educativa: '',
    jornada_manana: '',
    jornada_tarde: '',
    almuerzo: '',
    operador: '',
    num_servicios: '',
  },
  preparaciones: {},
  indicador: { porcentaje_cumplimiento: '' },
  observaciones: { texto: '' },
  firmas: {
    firma1_nombre: '', firma1_documento: '', firma1_cargo: '',
    firma2_nombre: '', firma2_documento: '', firma2_cargo: '',
  },
  info_general_trans: {},
  menu_trans: { descripcion_menu: '' },
  info_ruta: {},
  distribucion: {},
  calif_personal_manipulador: {},
  calif_vehiculos: {},
  calif_entrega: {},
  calif_consumo: {},
  observaciones_generales_trans: { texto: '' },
  firmas_trans: {
    firma1_nombre: '', firma1_documento: '', firma1_cargo: '',
    firma2_nombre: '', firma2_documento: '', firma2_cargo: '',
  },
  info_general_req: {},
  menu_req: { descripcion_menu: '' },
  intercambios_req: {
    alimento: '', motivo: '', fecha: '', autorizado_por: '',
  },
  calificaciones_req: {},
  observaciones_req: { texto: '' },
  firmas_req: {
    firma1_nombre: '', firma1_documento: '', firma1_cargo: '',
    firma2_nombre: '', firma2_documento: '', firma2_cargo: '',
  },
  info_general_gramajes: {},
  instrumento: {},
  intercambios_gramajes: {},
  alimentos_programados: {},
  alimentos_verificados: {},
  gramajes_tabla: {},
  observaciones_gramajes: { texto: '' },
  cambios_menu: {},
  fotos_general: {
    sede_educativa: '', fecha: '', periodo: '',
    foto_1: null, descripcion_1: '',
    foto_2: null, descripcion_2: '',
    foto_3: null, descripcion_3: '',
    foto_4: null, descripcion_4: '',
    foto_5: null, descripcion_5: '',
    foto_6: null, descripcion_6: '',
    foto_7: null, descripcion_7: '',
    foto_8: null, descripcion_8: '',
    foto_9: null, descripcion_9: '',
    foto_10: null, descripcion_10: '',
    foto_11: null, descripcion_11: '',
    foto_12: null, descripcion_12: '',
  },
  fotos_hallazgos: {
    sede_educativa: '', fecha: '', periodo: '',
    foto_1: null, descripcion_1: '',
    foto_2: null, descripcion_2: '',
    foto_3: null, descripcion_3: '',
    foto_4: null, descripcion_4: '',
    foto_5: null, descripcion_5: '',
    foto_6: null, descripcion_6: '',
    foto_7: null, descripcion_7: '',
    foto_8: null, descripcion_8: '',
    foto_9: null, descripcion_9: '',
    foto_10: null, descripcion_10: '',
    foto_11: null, descripcion_11: '',
    foto_12: null, descripcion_12: '',
  },
};

function FormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateType = searchParams.get('tipo') || 'CCT';
  const inspectorCode = searchParams.get('codigo') || '';

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('temp_org');
  const [formData, setFormData] = useState<CCTFormData>(initialFormData);
  
  const [successFilename, setSuccessFilename] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateFormData = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof CCTFormData] as object),
        [field]: value,
      },
    }));
  };

  const updatePhoto = (
    section: 'fotos_general' | 'fotos_hallazgos', 
    field: string, 
    file: File | null
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: file,
      },
    }));
  };

  const generateCCTFilename = (code: string): string => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
    return `CCT_${code}_${timestamp}.xlsx`;
  };

  const handleSubmit = async () => {
    if (!formData.info_general.fecha_visita) {
      setErrorMessage('La fecha de visita es obligatoria');
      return;
    }
    if (!formData.info_general.sede_educativa.trim()) {
      setErrorMessage('La sede educativa es obligatoria');
      return;
    }

    setLoading(true);
    
    try {
      const blob = await inspectorApi.generateCCT(inspectorCode, formData);
      const filename = generateCCTFilename(inspectorCode);
      downloadBlob(blob, filename);
      setSuccessFilename(filename);
    } catch (error: any) {
      console.error('Error generating template:', error);
      
      let message = 'Ocurrió un error al generar la planilla. Intenta de nuevo.';
      
      if (error.response?.status === 404) {
        message = 'Código de inspector no encontrado.';
      } else if (error.response?.status === 403) {
        message = 'Tu código ha sido desactivado.';
      } else if (error.response?.status === 422) {
        message = 'Datos del formulario inválidos.';
      } else if (error.message === 'Network Error') {
        message = 'Error de conexión.';
      }
      
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewForm = () => {
    setFormData(initialFormData);
    setActiveTab('temp_org');
    setSuccessFilename(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!inspectorCode) {
    router.push('/');
    return null;
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cancelar
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Formulario {templateType}
            </h1>
            <div className="w-20" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Planilla de seguimiento - {templateType}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Código inspector: <strong>{inspectorCode}</strong>
              </p>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="temp_org">TEMP - ORG</TabsTrigger>
                  <TabsTrigger value="trans_distrib">TRANS Y DISTRIB</TabsTrigger>
                  <TabsTrigger value="requerimientos">REQUERIMIENTOS</TabsTrigger>
                  <TabsTrigger value="gramajes">GRAMAJES</TabsTrigger>
                  <TabsTrigger value="fotos_general">FOTOS GENERAL</TabsTrigger>
                  <TabsTrigger value="fotos_hallazgos">FOTOS HALLAZGOS</TabsTrigger>
                </TabsList>

                <TabsContent value="temp_org" className="mt-6">
                  <TempOrgTab formData={formData} updateFormData={updateFormData} />
                </TabsContent>

                <TabsContent value="trans_distrib" className="mt-6">
                  <TransDistribTab formData={formData} updateFormData={updateFormData} />
                </TabsContent>

                <TabsContent value="requerimientos" className="mt-6">
                  <RequerimientosAlimTab formData={formData} updateFormData={updateFormData} />
                </TabsContent>

                <TabsContent value="gramajes" className="mt-6">
                  <GramajesTab formData={formData} updateFormData={updateFormData} />
                </TabsContent>

                <TabsContent value="fotos_general" className="mt-6">
                  <PhotosTab
                    title="Fotografías Generales"
                    description="Sube hasta 12 fotografías generales con sus descripciones."
                    sectionKey="fotos_general"
                    data={formData.fotos_general}
                    updateFormData={updateFormData}
                    updatePhoto={updatePhoto}
                  />
                </TabsContent>

                <TabsContent value="fotos_hallazgos" className="mt-6">
                  <PhotosTab
                    title="Fotografías de Hallazgos"
                    description="Sube hasta 12 fotografías de hallazgos con sus descripciones."
                    sectionKey="fotos_hallazgos"
                    data={formData.fotos_hallazgos}
                    updateFormData={updateFormData}
                    updatePhoto={updatePhoto}
                  />
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex justify-end gap-3">
                <Link href="/">
                  <Button variant="outline" size="lg" disabled={loading}>
                    Cancelar
                  </Button>
                </Link>
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading} 
                  size="lg"
                  className="min-w-[200px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <FileDown className="w-4 h-4 mr-2" />
                      Generar planilla
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {successFilename && (
        <SuccessDialog
          filename={successFilename}
          onClose={() => router.push('/')}
          onNewForm={handleNewForm}
        />
      )}

      {errorMessage && (
        <ErrorDialog
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </>
  );
}

export default function FormCCTPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <FormContent />
    </Suspense>
  );
}