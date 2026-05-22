'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileDown, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { RequerimientosTab } from '@/components/forms/ri/RequerimientosTab';
import { DespachoTab } from '@/components/forms/ri/DespachoTab';
import { VerificacionTab } from '@/components/forms/ri/VerificacionTab';
import { RotuladoTab } from '@/components/forms/ri/RotuladoTab';
import { SuccessDialog } from '@/components/forms/SuccessDialog';
import { ErrorDialog } from '@/components/forms/ErrorDialog';
import { RIFormData } from '@/lib/types/form';
import { inspectorApi } from '@/lib/api';
import { downloadBlob, generateRIFilename } from '@/lib/utils/download';
import { FotosGeneralTab } from '@/components/forms/ri/FotosGeneralTab';
import { FotosHallazgosTab } from '@/components/forms/ri/FotosHallazgosTab';

const initialFormData: RIFormData = {
  info_general: {
    fecha_visita: '',
    sede_educativa: '',
    num_servicios: '',
    atiende_nombre: '',
    atiende_cargo: '',
    realiza_nombre: '',
    realiza_cargo: '',
  },
  visita: { opcion_1ra: '', opcion_2da: '', opcion_3ra: '' },
  menu: {
    descripcion_menu: '',
    intercambio_alimento: '',
    intercambio_motivo: '',
    intercambio_fecha: '',
    intercambio_autorizado_por: '',
  },
  calificaciones: {},
  observaciones: { texto: '' },
  firmas: {
    firma1_nombre: '', firma1_documento: '', firma1_cargo: '',
    firma2_nombre: '', firma2_documento: '', firma2_cargo: '',
  },
  info_general_despacho: {},
  calificaciones_despacho: {},
  componentes: {},
  observaciones_despacho: { texto: '' },
  firmas_despacho: {
    firma1_nombre: '', firma1_documento: '', firma1_cargo: '',
    firma2_nombre: '', firma2_documento: '', firma2_cargo: '',
  },
  info_general_verificacion: {},
  productos: {},
  observaciones_verificacion: { obs_organolep: '', obs_gramajes_temp: '' },
  firmas_verificacion: {
    firma1_nombre: '', firma1_documento: '', firma1_cargo: '',
    firma2_nombre: '', firma2_documento: '', firma2_cargo: '',
  },
  info_general_rotulado: {},
  productos_res5109: {},
  productos_res333: {},
  observaciones_rotulado: { texto: '' },
  firmas_rotulado: {
    firma1_nombre: '', firma1_documento: '', firma1_cargo: '',
    firma2_nombre: '', firma2_documento: '', firma2_cargo: '',
  },
  // NEW: photos
  fotos_general: {
    sede_educativa: '',
    fecha: '',
    periodo: '',
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
    sede_educativa: '',
    fecha: '',
    periodo: '',
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
  const templateType = searchParams.get('tipo') || 'RI';
  const inspectorCode = searchParams.get('codigo') || '';

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('requerimientos');
  const [formData, setFormData] = useState<RIFormData>(initialFormData);
  
  // Dialog states
  const [successFilename, setSuccessFilename] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateFormData = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof RIFormData] as object),
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

  const validateRequired = (): string | null => {
    // Validate required fields from REQUERIMIENTOS
    if (!formData.info_general.fecha_visita) {
      return 'La fecha de visita es obligatoria (REQUERIMIENTOS NUTRICIONALES)';
    }
    if (!formData.info_general.sede_educativa.trim()) {
      return 'La sede educativa es obligatoria (REQUERIMIENTOS NUTRICIONALES)';
    }
    return null;
  };

  const handleSubmit = async () => {
    // Validate before sending
    const validationError = validateRequired();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(true);
    
    try {
      const blob = await inspectorApi.generateRI(inspectorCode, formData);
      
      // Generate filename and download
      const filename = generateRIFilename(inspectorCode);
      downloadBlob(blob, filename);
      
      // Show success dialog
      setSuccessFilename(filename);
    } catch (error: any) {
      console.error('Error generating template:', error);
      
      let message = 'Ocurrió un error al generar la planilla. Intenta de nuevo.';
      
      if (error.response?.status === 404) {
        message = 'Código de inspector no encontrado.';
      } else if (error.response?.status === 403) {
        message = 'Tu código ha sido desactivado. Contacta al administrador.';
      } else if (error.response?.status === 422) {
        message = 'Datos del formulario inválidos. Revisa los campos.';
      } else if (error.message === 'Network Error') {
        message = 'Error de conexión. Verifica que el servidor esté disponible.';
      }
      
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewForm = () => {
    setFormData(initialFormData);
    setActiveTab('requerimientos');
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
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="requerimientos">REQUERIMIENTOS NUTRICIONALES</TabsTrigger>
                  <TabsTrigger value="despacho">DESPACHO Y SUMINISTRO</TabsTrigger>
                  <TabsTrigger value="verificacion">VERIFICACIÓN ORG, GRAM Y TEMP</TabsTrigger>
                  <TabsTrigger value="rotulado">ROTULADO</TabsTrigger>
                  <TabsTrigger value="fotos_general">REGISTRO FOTOG GENERAL</TabsTrigger>
                  <TabsTrigger value="fotos_hallazgos">REGISTRO FOTOG HALLAZGOS</TabsTrigger>
                </TabsList>

                <TabsContent value="requerimientos" className="mt-6">
                  <RequerimientosTab formData={formData} updateFormData={updateFormData} />
                </TabsContent>

                <TabsContent value="despacho" className="mt-6">
                  <DespachoTab formData={formData} updateFormData={updateFormData} />
                </TabsContent>

                <TabsContent value="verificacion" className="mt-6">
                  <VerificacionTab formData={formData} updateFormData={updateFormData} />
                </TabsContent>

                <TabsContent value="rotulado" className="mt-6">
                  <RotuladoTab formData={formData} updateFormData={updateFormData} />
                </TabsContent>

                <TabsContent value="fotos_general" className="mt-6">
                  <FotosGeneralTab 
                    formData={formData} 
                    updateFormData={updateFormData}
                    updatePhoto={updatePhoto}
                  />
                </TabsContent>

                <TabsContent value="fotos_hallazgos" className="mt-6">
                  <FotosHallazgosTab 
                    formData={formData} 
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

      {/* Success Dialog */}
      {successFilename && (
        <SuccessDialog
          filename={successFilename}
          onClose={() => router.push('/')}
          onNewForm={handleNewForm}
        />
      )}

      {/* Error Dialog */}
      {errorMessage && (
        <ErrorDialog
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </>
  );
}

export default function FormPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <FormContent />
    </Suspense>
  );
}