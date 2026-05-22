'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileDown } from 'lucide-react';
import Link from 'next/link';
import { FormField } from '@/components/forms/FormField';
import { FormGrid } from '@/components/forms/FormGrid';
import { FormSection } from '@/components/forms/FormSection';

function FormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateType = searchParams.get('tipo') || 'RI';
  const inspectorCode = searchParams.get('codigo') || '';

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Form state - we'll build this incrementally
  const [formData, setFormData] = useState({
    info_general: {
      fecha_visita: '',
      sede_educativa: '',
      num_servicios: '',
      atiende_nombre: '',
      atiende_cargo: '',
      realiza_nombre: '',
      realiza_cargo: '',
    },
    visita: {
      opcion_1ra: '',
      opcion_2da: '',
      opcion_3ra: '',
    },
    menu: {
      descripcion_menu: '',
      intercambio_alimento: '',
      intercambio_motivo: '',
      intercambio_fecha: '',
      intercambio_autorizado_por: '',
    },
    calificaciones: {
      item_1: '',
      item_2: '',
      item_3: '',
      item_4: '',
      item_5: '',
      item_6: '',
      item_7: '',
      item_8: '',
      item_9: '',
      item_10: '',
      item_11: '',
    },
    observaciones: {
      texto: '',
    },
    firmas: {
      firma1_nombre: '',
      firma1_documento: '',
      firma1_cargo: '',
      firma2_nombre: '',
      firma2_documento: '',
      firma2_cargo: '',
    },
    // ... otros tabs que llenaremos después
    info_general_despacho: {},
    calificaciones_despacho: {},
    componentes: {},
    observaciones_despacho: {},
    firmas_despacho: {},
    info_general_verificacion: {},
    productos: {},
    observaciones_verificacion: {},
    firmas_verificacion: {},
    info_general_rotulado: {},
    productos_res5109: {},
    productos_res333: {},
    observaciones_rotulado: {},
    firmas_rotulado: {},
  });

  const updateFormData = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    // We'll implement this later
    console.log('Form data:', formData);
  };

  if (!inspectorCode) {
    router.push('/');
    return null;
  }

  return (
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
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Planilla de seguimiento - {templateType}</CardTitle>
          </CardHeader>
          <CardContent>
           <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="requerimientos">REQUERIMIENTOS NUTRICIONALES</TabsTrigger>
              <TabsTrigger value="despacho">DESPACHO Y SUMINISTRO</TabsTrigger>
              <TabsTrigger value="verificacion">VERIFICACIÓN ORG, GRAM Y TEMP</TabsTrigger>
              <TabsTrigger value="rotulado">ROTULADO</TabsTrigger>
            </TabsList>

            <TabsContent value="requerimientos" className="space-y-6 mt-6">
              {/* Sección 1: Info General */}
              <FormSection title="Información General">
                <FormGrid>
                  <FormField
                    label="Fecha de visita"
                    type="date"
                    value={formData.info_general.fecha_visita}
                    onChange={(v) => updateFormData('info_general', 'fecha_visita', v)}
                    required
                  />
                  <FormField
                    label="Sede educativa"
                    value={formData.info_general.sede_educativa}
                    onChange={(v) => updateFormData('info_general', 'sede_educativa', v)}
                    placeholder="Nombre de la sede"
                    required
                  />
                  <FormField
                    label="Número de servicios"
                    type="number"
                    value={formData.info_general.num_servicios}
                    onChange={(v) => updateFormData('info_general', 'num_servicios', v)}
                    placeholder="Ej: 325"
                  />
                </FormGrid>

                <FormGrid>
                  <FormField
                    label="Nombre quien atiende"
                    value={formData.info_general.atiende_nombre}
                    onChange={(v) => updateFormData('info_general', 'atiende_nombre', v)}
                    placeholder="Nombre completo"
                  />
                  <FormField
                    label="Cargo quien atiende"
                    value={formData.info_general.atiende_cargo}
                    onChange={(v) => updateFormData('info_general', 'atiende_cargo', v)}
                    placeholder="Ej: Rectora"
                  />
                </FormGrid>

                <FormGrid>
                  <FormField
                    label="Nombre quien realiza"
                    value={formData.info_general.realiza_nombre}
                    onChange={(v) => updateFormData('info_general', 'realiza_nombre', v)}
                    placeholder="Nombre completo"
                  />
                  <FormField
                    label="Cargo quien realiza"
                    value={formData.info_general.realiza_cargo}
                    onChange={(v) => updateFormData('info_general', 'realiza_cargo', v)}
                    placeholder="Ej: Inspector PAE"
                  />
                </FormGrid>
              </FormSection>

              {/* Sección 2: Tipo de Visita */}
              <FormSection title="Tipo de Visita">
                <FormGrid columns={3}>
                  <FormField
                    label="1ra visita"
                    type="select"
                    value={formData.visita.opcion_1ra}
                    onChange={(v) => updateFormData('visita', 'opcion_1ra', v)}
                    options={[
                      { value: '', label: 'Sin marcar' },
                      { value: 'X', label: 'Marcado (X)' },
                    ]}
                  />
                  <FormField
                    label="2da visita"
                    type="select"
                    value={formData.visita.opcion_2da}
                    onChange={(v) => updateFormData('visita', 'opcion_2da', v)}
                    options={[
                      { value: '', label: 'Sin marcar' },
                      { value: 'X', label: 'Marcado (X)' },
                    ]}
                  />
                  <FormField
                    label="3ra visita"
                    type="select"
                    value={formData.visita.opcion_3ra}
                    onChange={(v) => updateFormData('visita', 'opcion_3ra', v)}
                    options={[
                      { value: '', label: 'Sin marcar' },
                      { value: 'X', label: 'Marcado (X)' },
                    ]}
                  />
                </FormGrid>
              </FormSection>

              {/* Sección 3: Menú */}
              <FormSection title="Menú del Día">
                <FormField
                  label="Descripción del menú"
                  type="textarea"
                  value={formData.menu.descripcion_menu}
                  onChange={(v) => updateFormData('menu', 'descripcion_menu', v)}
                  placeholder="Describe el menú completo del día"
                />
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-3">Intercambio de Alimentos (si aplica)</p>
                  <FormGrid>
                    <FormField
                      label="Alimento intercambiado"
                      value={formData.menu.intercambio_alimento}
                      onChange={(v) => updateFormData('menu', 'intercambio_alimento', v)}
                      placeholder="N/A si no aplica"
                    />
                    <FormField
                      label="Motivo del intercambio"
                      value={formData.menu.intercambio_motivo}
                      onChange={(v) => updateFormData('menu', 'intercambio_motivo', v)}
                      placeholder="N/A si no aplica"
                    />
                  </FormGrid>
                  <FormGrid>
                    <FormField
                      label="Fecha del intercambio"
                      type="date"
                      value={formData.menu.intercambio_fecha}
                      onChange={(v) => updateFormData('menu', 'intercambio_fecha', v)}
                    />
                    <FormField
                      label="Autorizado por"
                      value={formData.menu.intercambio_autorizado_por}
                      onChange={(v) => updateFormData('menu', 'intercambio_autorizado_por', v)}
                      placeholder="N/A si no aplica"
                    />
                  </FormGrid>
                </div>
              </FormSection>

              {/* Sección 4: Calificaciones */}
              <FormSection title="Calificaciones de Cumplimiento">
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <p className="text-sm text-gray-600 mb-2">
                    C = Cumple | NC = No Cumple | N/A = No Aplica
                  </p>
                  
                  <FormGrid>
                    <FormField
                      label="1. El menu del dia es acorde a lo establecido en el ciclo de menus y minuta patron adoptada."
                      type="select"
                      value={formData.calificaciones.item_1}
                      onChange={(v) => updateFormData('calificaciones', 'item_1', v)}
                      options={[
                        { value: '', label: 'Seleccionar' },
                        { value: 'C', label: 'C - Cumple' },
                        { value: 'NC', label: 'NC - No Cumple' },
                        { value: 'N/A', label: 'N/A - No Aplica' },
                      ]}
                    />
                    <FormField
                      label="2. El ciclo de menú se ejecuta bajo las especificaciones técnicas definidas."
                      type="select"
                      value={formData.calificaciones.item_2}
                      onChange={(v) => updateFormData('calificaciones', 'item_2', v)}
                      options={[
                        { value: '', label: 'Seleccionar' },
                        { value: 'C', label: 'C - Cumple' },
                        { value: 'NC', label: 'NC - No Cumple' },
                        { value: 'N/A', label: 'N/A - No Aplica' },
                      ]}
                    />
                  </FormGrid>

                  <FormGrid>
                    <FormField
                      label="3. El menú entregado según el tipo de complemento corresponde a lo programado y aprobado. "
                      type="select"
                      value={formData.calificaciones.item_3}
                      onChange={(v) => updateFormData('calificaciones', 'item_3', v)}
                      options={[
                        { value: '', label: 'Seleccionar' },
                        { value: 'C', label: 'C - Cumple' },
                        { value: 'NC', label: 'NC - No Cumple' },
                        { value: 'N/A', label: 'N/A - No Aplica' },
                      ]}
                    />
                    <FormField
                      label="4. En caso de presentarse intercambios, estos se realizan de acuerdo al componente, a la frecuencia y cuentan con documento soporte de aprobación."
                      type="select"
                      value={formData.calificaciones.item_4}
                      onChange={(v) => updateFormData('calificaciones', 'item_4', v)}
                      options={[
                        { value: '', label: 'Seleccionar' },
                        { value: 'C', label: 'C - Cumple' },
                        { value: 'NC', label: 'NC - No Cumple' },
                        { value: 'N/A', label: 'N/A - No Aplica' },
                      ]}
                    />
                  </FormGrid>

                  <FormGrid>
                    <FormField
                      label="5. Los alimentos preparados cumplen con las características organolépticas propias de la preparación  o alimentos que hacen parte del menú servido."
                      type="select"
                      value={formData.calificaciones.item_5}
                      onChange={(v) => updateFormData('calificaciones', 'item_5', v)}
                      options={[
                        { value: '', label: 'Seleccionar' },
                        { value: 'C', label: 'C - Cumple' },
                        { value: 'NC', label: 'NC - No Cumple' },
                        { value: 'N/A', label: 'N/A - No Aplica' },
                      ]}
                    />
                    <FormField
                      label="6. El  menú entregado a los estudiantes tiene aspecto atractivo y buena presentación."
                      type="select"
                      value={formData.calificaciones.item_6}
                      onChange={(v) => updateFormData('calificaciones', 'item_6', v)}
                      options={[
                        { value: '', label: 'Seleccionar' },
                        { value: 'C', label: 'C - Cumple' },
                        { value: 'NC', label: 'NC - No Cumple' },
                        { value: 'N/A', label: 'N/A - No Aplica' },
                      ]}
                    />
                  </FormGrid>

                  <FormGrid>
                    <FormField
                      label="7. Se cumple con los horarios de distribución establecidos para el servicio  y no se generan retrasos durante el suministro."
                      type="select"
                      value={formData.calificaciones.item_7}
                      onChange={(v) => updateFormData('calificaciones', 'item_7', v)}
                      options={[
                        { value: '', label: 'Seleccionar' },
                        { value: 'C', label: 'C - Cumple' },
                        { value: 'NC', label: 'NC - No Cumple' },
                        { value: 'N/A', label: 'N/A - No Aplica' },
                      ]}
                    />
                    <FormField
                      label="8. En el ciclo de minutas incluye alimentos y/o preparaciones propias del territorio"
                      type="select"
                      value={formData.calificaciones.item_8}
                      onChange={(v) => updateFormData('calificaciones', 'item_8', v)}
                      options={[
                        { value: '', label: 'Seleccionar' },
                        { value: 'C', label: 'C - Cumple' },
                        { value: 'NC', label: 'NC - No Cumple' },
                        { value: 'N/A', label: 'N/A - No Aplica' },
                      ]}
                    />
                  </FormGrid>

                  <FormGrid>
                    <FormField
                      label="9. En la sede de entrega, el operador promocionan practicas adecuadas de habitos alimentarios en los estudiantes beneficiarios."
                      type="select"
                      value={formData.calificaciones.item_9}
                      onChange={(v) => updateFormData('calificaciones', 'item_9', v)}
                      options={[
                        { value: '', label: 'Seleccionar' },
                        { value: 'C', label: 'C - Cumple' },
                        { value: 'NC', label: 'NC - No Cumple' },
                        { value: 'N/A', label: 'N/A - No Aplica' },
                      ]}
                    />
                    <FormField
                      label="10. La aceptabilidad de los alimentos  es adecuada."
                      type="select"
                      value={formData.calificaciones.item_10}
                      onChange={(v) => updateFormData('calificaciones', 'item_10', v)}
                      options={[
                        { value: '', label: 'Seleccionar' },
                        { value: 'C', label: 'C - Cumple' },
                        { value: 'NC', label: 'NC - No Cumple' },
                        { value: 'N/A', label: 'N/A - No Aplica' },
                      ]}
                    />
                  </FormGrid>

                  <FormGrid columns={1}>
                    <FormField
                      label="11. El desperdicio de alimentos es bajo."
                      type="select"
                      value={formData.calificaciones.item_11}
                      onChange={(v) => updateFormData('calificaciones', 'item_11', v)}
                      options={[
                        { value: '', label: 'Seleccionar' },
                        { value: 'C', label: 'C - Cumple' },
                        { value: 'NC', label: 'NC - No Cumple' },
                        { value: 'N/A', label: 'N/A - No Aplica' },
                      ]}
                    />
                  </FormGrid>
                </div>
              </FormSection>

              {/* Sección 5: Observaciones */}
              <FormSection title="Observaciones">
                <FormField
                  label="Observaciones generales"
                  type="textarea"
                  value={formData.observaciones.texto}
                  onChange={(v) => updateFormData('observaciones', 'texto', v)}
                  placeholder="Escribe aquí cualquier observación relevante sobre la visita"
                />
              </FormSection>

              {/* Sección 6: Firmas */}
              <FormSection title="Firmas">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Firma 1 */}
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <p className="font-medium text-gray-900 mb-3">Firma 1</p>
                    <FormField
                      label="Nombre completo"
                      value={formData.firmas.firma1_nombre}
                      onChange={(v) => updateFormData('firmas', 'firma1_nombre', v)}
                      placeholder="Nombre completo"
                    />
                    <FormField
                      label="Documento"
                      value={formData.firmas.firma1_documento}
                      onChange={(v) => updateFormData('firmas', 'firma1_documento', v)}
                      placeholder="Número de documento"
                    />
                    <FormField
                      label="Cargo"
                      value={formData.firmas.firma1_cargo}
                      onChange={(v) => updateFormData('firmas', 'firma1_cargo', v)}
                      placeholder="Cargo"
                    />
                  </div>

                  {/* Firma 2 */}
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <p className="font-medium text-gray-900 mb-3">Firma 2</p>
                    <FormField
                      label="Nombre completo"
                      value={formData.firmas.firma2_nombre}
                      onChange={(v) => updateFormData('firmas', 'firma2_nombre', v)}
                      placeholder="Nombre completo"
                    />
                    <FormField
                      label="Documento"
                      value={formData.firmas.firma2_documento}
                      onChange={(v) => updateFormData('firmas', 'firma2_documento', v)}
                      placeholder="Número de documento"
                    />
                    <FormField
                      label="Cargo"
                      value={formData.firmas.firma2_cargo}
                      onChange={(v) => updateFormData('firmas', 'firma2_cargo', v)}
                      placeholder="Cargo"
                    />
                  </div>
                </div>
              </FormSection>
            </TabsContent>

            <TabsContent value="despacho" className="space-y-6 mt-6">
              <div className="text-center py-8 text-gray-500">
                Sección DESPACHO Y SUMINISTRO - En construcción
              </div>
            </TabsContent>

            <TabsContent value="verificacion" className="space-y-6 mt-6">
              <div className="text-center py-8 text-gray-500">
                Sección VERIFICACIÓN ORG, GRAM Y TEMP - En construcción
              </div>
            </TabsContent>

            <TabsContent value="rotulado" className="space-y-6 mt-6">
              <div className="text-center py-8 text-gray-500">
                Sección ROTULADO - En construcción
              </div>
            </TabsContent>
          </Tabs>

            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleSubmit}
                disabled={loading}
                size="lg"
              >
                <FileDown className="w-4 h-4 mr-2" />
                {loading ? 'Generando...' : 'Generar planilla'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default function FormPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <FormContent />
    </Suspense>
  );
}