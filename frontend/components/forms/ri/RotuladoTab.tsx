import { FormField } from '../FormField';
import { FormGrid } from '../FormGrid';
import { FormSection } from '../FormSection';
import { SignatureSection } from '../SignatureSection';
import { RIFormData, UpdateFunction } from '@/lib/types/form';

interface Props {
  formData: RIFormData;
  updateFormData: UpdateFunction;
}

// Campos de datos básicos del producto (texto normal)
const RES5109_DATA_FIELDS = [
  { key: 'nombre', label: 'Nombre del producto' },
  { key: 'fecha_fab', label: 'Fecha fabricación', type: 'date' as const },
  { key: 'fecha_venc', label: 'Fecha vencimiento', type: 'date' as const },
  { key: 'lote', label: 'Lote' },
];

// Campos de verificación (se marcan con X o vacío)
const RES5109_CHECK_FIELDS = [
  { key: 'nombre_alimento', label: 'Nombre del alimento' },
  { key: 'lista_ingredientes', label: 'Lista ingredientes' },
  { key: 'lote_verif', label: 'Lote verificado' },
  { key: 'contenido_neto', label: 'Contenido neto' },
  { key: 'fabricante_dir', label: 'Fabricante y dirección' },
  { key: 'instruc_conserv', label: 'Instrucciones conservación' },
  { key: 'fecha_venc_verif', label: 'Fecha vencimiento verificada' },
  { key: 'instruc_uso', label: 'Instrucciones de uso' },
  { key: 'registro_sanitario', label: 'Registro sanitario' },
  { key: 'empaque_primario', label: 'Empaque primario' },
  { key: 'tabla_nutricional', label: 'Tabla nutricional' },
];

const RES333_DATA_FIELDS = [
  { key: 'nombre', label: 'Nombre del producto' },
  { key: 'fecha_fab', label: 'Fecha fabricación', type: 'date' as const },
  { key: 'fecha_venc', label: 'Fecha vencimiento', type: 'date' as const },
  { key: 'lote', label: 'Lote' },
];

const RES333_CHECK_FIELDS = [
  { key: 'decl_nutrientes', label: 'Declaración nutrientes' },
  { key: 'tamano_porciones', label: 'Tamaño porciones' },
  { key: 'medidas_caseras', label: 'Medidas caseras' },
  { key: 'num_porciones', label: 'Número de porciones' },
  { key: 'equiv_medidas', label: 'Equivalencias medidas' },
];

const X_OPTIONS = [
  { value: '', label: 'Sin marcar' },
  { value: 'X', label: 'Marcado (X)' },
];

const CUMPLIMIENTO_OPTIONS = [
  { value: '', label: 'Seleccionar' },
  { value: 'C', label: 'C - Cumple' },
  { value: 'NC', label: 'NC - No Cumple' },
  { value: 'N/A', label: 'N/A - No Aplica' },
];

export function RotuladoTab({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      <FormSection title="Información General">
        <FormGrid columns={3}>
          <FormField
            label="Fecha de visita"
            type="date"
            value={formData.info_general_rotulado.fecha_visita || ''}
            onChange={(v) => updateFormData('info_general_rotulado', 'fecha_visita', v)}
          />
          <FormField
            label="Jornada mañana"
            type="select"
            value={formData.info_general_rotulado.jornada_manana || ''}
            onChange={(v) => updateFormData('info_general_rotulado', 'jornada_manana', v)}
            options={X_OPTIONS}
          />
          <FormField
            label="Jornada tarde"
            type="select"
            value={formData.info_general_rotulado.jornada_tarde || ''}
            onChange={(v) => updateFormData('info_general_rotulado', 'jornada_tarde', v)}
            options={X_OPTIONS}
          />
        </FormGrid>
      </FormSection>

      {/* Res 5109 */}
      <FormSection title="Productos - Resolución 5109/2005">
        <p className="text-sm text-gray-600 mb-4">
          Registra hasta 2 productos. Deja en blanco los que no apliquen.
        </p>
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <div key={num} className="border rounded-lg p-4 mb-4 bg-white space-y-4">
            <h4 className="font-medium text-gray-900">Producto {num}</h4>
            
            {/* Datos básicos */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Información del producto</p>
              <FormGrid columns={2}>
                {RES5109_DATA_FIELDS.map((field) => (
                  <FormField
                    key={field.key}
                    label={field.label}
                    type={field.type || 'text'}
                    value={formData.productos_res5109[`producto_${num}_${field.key}`] || ''}
                    onChange={(v) => updateFormData('productos_res5109', `producto_${num}_${field.key}`, v)}
                  />
                ))}
              </FormGrid>
            </div>

            {/* Verificación con X */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Verificación de rotulado (marcar con X si cumple)</p>
              <FormGrid columns={3}>
                {RES5109_CHECK_FIELDS.map((field) => (
                  <FormField
                    key={field.key}
                    label={field.label}
                    type="select"
                    value={formData.productos_res5109[`producto_${num}_${field.key}`] || ''}
                    onChange={(v) => updateFormData('productos_res5109', `producto_${num}_${field.key}`, v)}
                    options={X_OPTIONS}
                  />
                ))}
              </FormGrid>
            </div>

            {/* Cumplimiento general */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Cumplimiento general</p>
              <FormField
                label="Cumplimiento (C/NC/N/A)"
                type="select"
                value={formData.productos_res5109[`producto_${num}_cumplimiento`] || ''}
                onChange={(v) => updateFormData('productos_res5109', `producto_${num}_cumplimiento`, v)}
                options={CUMPLIMIENTO_OPTIONS}
              />
            </div>
          </div>
        ))}
      </FormSection>

      {/* Res 333 */}
      <FormSection title="Productos - Resolución 333/2011">
        <p className="text-sm text-gray-600 mb-4">
          Registra hasta 2 productos. Deja en blanco los que no apliquen.
        </p>
        {[1, 2].map((num) => (
          <div key={num} className="border rounded-lg p-4 mb-4 bg-white space-y-4">
            <h4 className="font-medium text-gray-900">Producto {num}</h4>
            
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Información del producto</p>
              <FormGrid columns={2}>
                {RES333_DATA_FIELDS.map((field) => (
                  <FormField
                    key={field.key}
                    label={field.label}
                    type={field.type || 'text'}
                    value={formData.productos_res333[`producto_${num}_${field.key}`] || ''}
                    onChange={(v) => updateFormData('productos_res333', `producto_${num}_${field.key}`, v)}
                  />
                ))}
              </FormGrid>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Verificación de rotulado (marcar con X si cumple)</p>
              <FormGrid columns={3}>
                {RES333_CHECK_FIELDS.map((field) => (
                  <FormField
                    key={field.key}
                    label={field.label}
                    type="select"
                    value={formData.productos_res333[`producto_${num}_${field.key}`] || ''}
                    onChange={(v) => updateFormData('productos_res333', `producto_${num}_${field.key}`, v)}
                    options={X_OPTIONS}
                  />
                ))}
              </FormGrid>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Cumplimiento general</p>
              <FormField
                label="Cumplimiento (C/NC/N/A)"
                type="select"
                value={formData.productos_res333[`producto_${num}_cumplimiento`] || ''}
                onChange={(v) => updateFormData('productos_res333', `producto_${num}_cumplimiento`, v)}
                options={CUMPLIMIENTO_OPTIONS}
              />
            </div>
          </div>
        ))}
      </FormSection>

      <FormSection title="Observaciones">
        <FormField
          label="Observaciones"
          type="textarea"
          value={formData.observaciones_rotulado.texto || ''}
          onChange={(v) => updateFormData('observaciones_rotulado', 'texto', v)}
        />
      </FormSection>

      <SignatureSection
        sectionKey="firmas_rotulado"
        data={formData.firmas_rotulado}
        onChange={updateFormData}
      />
    </div>
  );
}