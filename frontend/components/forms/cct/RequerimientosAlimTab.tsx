import { FormField } from '../FormField';
import { FormGrid } from '../FormGrid';
import { FormSection } from '../FormSection';
import { RatingField } from '../RatingField';
import { SignatureSection } from '../SignatureSection';
import { CCTFormData, CCTUpdateFunction } from '@/lib/types/cct';

interface Props {
  formData: CCTFormData;
  updateFormData: CCTUpdateFunction;
}

const X_OPTIONS = [
  { value: '', label: 'Sin marcar' },
  { value: 'X', label: 'Marcado (X)' },
];

const CALIFICACIONES_ITEMS = [
  '1. El menú servido corresponde al menú contratado y programado',
  '2. Se conservan las minutas de ciclo de menú',
  '3. El complemento cumple con los gramajes establecidos',
  '4. El complemento es acorde a las características sensoriales',
  '5. Los puntos de servido son adecuados e higiénicos',
  '6. Los manipuladores cuentan con dotación completa',
  '7. Los utensilios de servido son adecuados e higiénicos',
  '8. El refrigerador/nevera cumple con las condiciones',
  '9. El complemento fue consumido por los beneficiarios',
  '10. Se cumple con el horario de servido establecido',
  '11. El operador cuenta con planilla de control diario',
  '12. Las condiciones de almacenamiento son adecuadas',
  '13. Se respeta la fecha de vencimiento',
  '14. Los productos cumplen con el rotulado',
  '15. Se cumplen los procedimientos de higiene',
];

export function RequerimientosAlimTab({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      {/* Info General */}
      <FormSection title="Información General">
        <FormGrid columns={3}>
          <FormField
            label="ETC No. C"
            value={formData.info_general_req.etc_no_c || ''}
            onChange={(v) => updateFormData('info_general_req', 'etc_no_c', v)}
          />
          <FormField
            label="Fecha de visita"
            type="date"
            value={formData.info_general_req.fecha_visita || ''}
            onChange={(v) => updateFormData('info_general_req', 'fecha_visita', v)}
          />
          <FormField
            label="Sede educativa"
            value={formData.info_general_req.sede_educativa || ''}
            onChange={(v) => updateFormData('info_general_req', 'sede_educativa', v)}
          />
        </FormGrid>

        <FormGrid columns={3}>
          <FormField
            label="Operador"
            value={formData.info_general_req.operador || ''}
            onChange={(v) => updateFormData('info_general_req', 'operador', v)}
          />
          <FormField
            label="Número de contrato"
            value={formData.info_general_req.num_contrato || ''}
            onChange={(v) => updateFormData('info_general_req', 'num_contrato', v)}
          />
          <FormField
            label="Número de servicios"
            type="number"
            value={formData.info_general_req.num_servicios || ''}
            onChange={(v) => updateFormData('info_general_req', 'num_servicios', v)}
          />
        </FormGrid>

        <FormGrid columns={3}>
          <FormField
            label="1ra visita"
            type="select"
            value={formData.info_general_req.visita_1ra || ''}
            onChange={(v) => updateFormData('info_general_req', 'visita_1ra', v)}
            options={X_OPTIONS}
          />
          <FormField
            label="2da visita"
            type="select"
            value={formData.info_general_req.visita_2da || ''}
            onChange={(v) => updateFormData('info_general_req', 'visita_2da', v)}
            options={X_OPTIONS}
          />
          <FormField
            label="3ra visita"
            type="select"
            value={formData.info_general_req.visita_3ra || ''}
            onChange={(v) => updateFormData('info_general_req', 'visita_3ra', v)}
            options={X_OPTIONS}
          />
        </FormGrid>

        <FormGrid>
          <FormField
            label="Nombre quien atiende"
            value={formData.info_general_req.atiende_nombre || ''}
            onChange={(v) => updateFormData('info_general_req', 'atiende_nombre', v)}
          />
          <FormField
            label="Cargo quien atiende"
            value={formData.info_general_req.atiende_cargo || ''}
            onChange={(v) => updateFormData('info_general_req', 'atiende_cargo', v)}
          />
        </FormGrid>

        <FormGrid>
          <FormField
            label="Nombre quien realiza"
            value={formData.info_general_req.realiza_nombre || ''}
            onChange={(v) => updateFormData('info_general_req', 'realiza_nombre', v)}
          />
          <FormField
            label="Cargo quien realiza"
            value={formData.info_general_req.realiza_cargo || ''}
            onChange={(v) => updateFormData('info_general_req', 'realiza_cargo', v)}
          />
        </FormGrid>
      </FormSection>

      {/* Menú */}
      <FormSection title="Menú del Día">
        <FormField
          label="Descripción del menú"
          type="textarea"
          value={formData.menu_req.descripcion_menu}
          onChange={(v) => updateFormData('menu_req', 'descripcion_menu', v)}
        />
      </FormSection>

      {/* Intercambios */}
      <FormSection title="Intercambio de Alimentos (si aplica)">
        <div className="bg-blue-50 p-4 rounded-lg space-y-3">
          <FormGrid>
            <FormField
              label="Alimento intercambiado"
              value={formData.intercambios_req.alimento}
              onChange={(v) => updateFormData('intercambios_req', 'alimento', v)}
              placeholder="N/A si no aplica"
            />
            <FormField
              label="Motivo del intercambio"
              value={formData.intercambios_req.motivo}
              onChange={(v) => updateFormData('intercambios_req', 'motivo', v)}
            />
          </FormGrid>
          <FormGrid>
            <FormField
              label="Fecha del intercambio"
              type="date"
              value={formData.intercambios_req.fecha}
              onChange={(v) => updateFormData('intercambios_req', 'fecha', v)}
            />
            <FormField
              label="Autorizado por"
              value={formData.intercambios_req.autorizado_por}
              onChange={(v) => updateFormData('intercambios_req', 'autorizado_por', v)}
            />
          </FormGrid>
        </div>
      </FormSection>

      {/* Calificaciones */}
      <FormSection title="Calificaciones de Cumplimiento">
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <p className="text-sm text-gray-600 mb-2">
            C = Cumple | NC = No Cumple | N/A = No Aplica
          </p>
          {CALIFICACIONES_ITEMS.map((label, idx) => (
            <RatingField
              key={idx}
              label={label}
              value={formData.calificaciones_req[`item_${idx + 1}`] || ''}
              onChange={(v) => updateFormData('calificaciones_req', `item_${idx + 1}`, v)}
            />
          ))}
        </div>
      </FormSection>

      {/* Observaciones */}
      <FormSection title="Observaciones">
        <FormField
          label="Observaciones generales"
          type="textarea"
          value={formData.observaciones_req.texto}
          onChange={(v) => updateFormData('observaciones_req', 'texto', v)}
        />
      </FormSection>

      {/* Firmas */}
      <SignatureSection
        sectionKey="firmas_req"
        data={formData.firmas_req}
        onChange={updateFormData}
      />
    </div>
  );
}