import { FormField } from '../FormField';
import { FormGrid } from '../FormGrid';
import { FormSection } from '../FormSection';
import { SignatureSection } from '../SignatureSection';
import { RIFormData, UpdateFunction } from '@/lib/types/form';

interface Props {
  formData: RIFormData;
  updateFormData: UpdateFunction;
}

const PRODUCTO_FIELDS = [
  { key: 'fecha_recibido', label: 'Fecha recibido', type: 'date' as const },
  { key: 'nombre', label: 'Nombre del producto' },
  { key: 'proveedor', label: 'Proveedor' },
  { key: 'fabricante', label: 'Fabricante' },
  { key: 'marca', label: 'Marca' },
  { key: 'fecha_venc', label: 'Fecha vencimiento', type: 'date' as const },
  { key: 'lote', label: 'Lote' },
  { key: 'fecha_suministro', label: 'Fecha suministro', type: 'date' as const },
  { key: 'textura', label: 'Textura' },
  { key: 'color', label: 'Color' },
  { key: 'olor', label: 'Olor' },
  { key: 'sabor', label: 'Sabor' },
  { key: 'apariencia', label: 'Apariencia' },
  { key: 'peso_declarado', label: 'Peso declarado' },
  { key: 'peso_verificado', label: 'Peso verificado' },
  { key: 'cumplimiento_peso', label: 'Cumplimiento peso (C/NC)' },
  { key: 'recep_mp_dia', label: 'Recepción MP - Día' },
  { key: 'recep_mp_temp', label: 'Recepción MP - Temp' },
  { key: 'recep_mp_cumpl', label: 'Recepción MP - Cumpl' },
  { key: 'almac_mp_dia', label: 'Almacenamiento MP - Día' },
  { key: 'almac_mp_temp', label: 'Almacenamiento MP - Temp' },
  { key: 'almac_mp_cumpl', label: 'Almacenamiento MP - Cumpl' },
  { key: 'ensamble_dia', label: 'Ensamble - Día' },
  { key: 'ensamble_temp', label: 'Ensamble - Temp' },
  { key: 'ensamble_cumpl', label: 'Ensamble - Cumpl' },
  { key: 'despacho_dia', label: 'Despacho - Día' },
  { key: 'despacho_temp', label: 'Despacho - Temp' },
  { key: 'despacho_cumpl', label: 'Despacho - Cumpl' },
];

export function VerificacionTab({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      <FormSection title="Información General">
        <FormGrid columns={3}>
          <FormField
            label="Fecha de visita"
            type="date"
            value={formData.info_general_verificacion.fecha_visita || ''}
            onChange={(v) => updateFormData('info_general_verificacion', 'fecha_visita', v)}
          />
          <FormField
            label="Jornada mañana"
            type="select"
            value={formData.info_general_verificacion.jornada_manana || ''}
            onChange={(v) => updateFormData('info_general_verificacion', 'jornada_manana', v)}
            options={[
              { value: '', label: 'Sin marcar' },
              { value: 'X', label: 'Marcado (X)' },
            ]}
          />
          <FormField
            label="Jornada tarde"
            type="select"
            value={formData.info_general_verificacion.jornada_tarde || ''}
            onChange={(v) => updateFormData('info_general_verificacion', 'jornada_tarde', v)}
            options={[
              { value: '', label: 'Sin marcar' },
              { value: 'X', label: 'Marcado (X)' },
            ]}
          />
        </FormGrid>
        <FormField
          label="Número de servicios"
          type="number"
          value={formData.info_general_verificacion.num_servicios || ''}
          onChange={(v) => updateFormData('info_general_verificacion', 'num_servicios', v)}
        />
      </FormSection>

      <FormSection title="Productos">
        <p className="text-sm text-gray-600 mb-4">
          Registra hasta 2 productos. Deja en blanco los que no apliquen.
        </p>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <div key={num} className="border rounded-lg p-4 mb-4 bg-white">
            <h4 className="font-medium text-gray-900 mb-3">Producto {num}</h4>
            <FormGrid columns={2}>
              {PRODUCTO_FIELDS.map((field) => (
                <FormField
                  key={field.key}
                  label={field.label}
                  type={field.type || 'text'}
                  value={formData.productos[`producto_${num}_${field.key}`] || ''}
                  onChange={(v) => updateFormData('productos', `producto_${num}_${field.key}`, v)}
                />
              ))}
            </FormGrid>
          </div>
        ))}
      </FormSection>

      <FormSection title="Observaciones">
        <FormField
          label="Observaciones organolépticas"
          type="textarea"
          value={formData.observaciones_verificacion.obs_organolep || ''}
          onChange={(v) => updateFormData('observaciones_verificacion', 'obs_organolep', v)}
        />
        <FormField
          label="Observaciones gramajes y temperaturas"
          type="textarea"
          value={formData.observaciones_verificacion.obs_gramajes_temp || ''}
          onChange={(v) => updateFormData('observaciones_verificacion', 'obs_gramajes_temp', v)}
        />
      </FormSection>

      <SignatureSection
        sectionKey="firmas_verificacion"
        data={formData.firmas_verificacion}
        onChange={updateFormData}
      />
    </div>
  );
}