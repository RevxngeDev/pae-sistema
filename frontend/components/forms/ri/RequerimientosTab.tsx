import { FormField } from '../FormField';
import { FormGrid } from '../FormGrid';
import { FormSection } from '../FormSection';
import { RatingField } from '../RatingField';
import { SignatureSection } from '../SignatureSection';
import { RIFormData, UpdateFunction } from '@/lib/types/form';

interface Props {
  formData: RIFormData;
  updateFormData: UpdateFunction;
}

const CALIFICACIONES_ITEMS = [
  '1. El menu del dia es acorde a lo establecido en el ciclo de menus y minuta patron adoptada.',
  '2. El ciclo de menú se ejecuta bajo las especificaciones técnicas definidas.',
  '3. El menú entregado según el tipo de complemento corresponde a lo programado y aprobado. ',
  '4. En caso de presentarse intercambios, estos se realizan de acuerdo al componente, a la frecuencia y cuentan con documento soporte de aprobación.',
  '5. Los alimentos preparados cumplen con las características organolépticas propias de la preparación  o alimentos que hacen parte del menú servido.',
  '6. El  menú entregado a los estudiantes tiene aspecto atractivo y buena presentación.',
  '7. Se cumple con los horarios de distribución establecidos para el servicio  y no se generan retrasos durante el suministro.',
  '8. En el ciclo de minutas incluye alimentos y/o preparaciones propias del territorio',
  '9. En la sede de entrega, el operador promocionan practicas adecuadas de habitos alimentarios en los estudiantes beneficiarios.',
  '10. La aceptabilidad de los alimentos  es adecuada.',
  '11. El desperdicio de alimentos es bajo.',
];

export function RequerimientosTab({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      {/* Info General */}
      <FormSection title="Información General">
        <FormGrid columns={3}>
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
          />
          <FormField
            label="Cargo quien atiende"
            value={formData.info_general.atiende_cargo}
            onChange={(v) => updateFormData('info_general', 'atiende_cargo', v)}
          />
        </FormGrid>

        <FormGrid>
          <FormField
            label="Nombre quien realiza"
            value={formData.info_general.realiza_nombre}
            onChange={(v) => updateFormData('info_general', 'realiza_nombre', v)}
          />
          <FormField
            label="Cargo quien realiza"
            value={formData.info_general.realiza_cargo}
            onChange={(v) => updateFormData('info_general', 'realiza_cargo', v)}
          />
        </FormGrid>
      </FormSection>

      {/* Tipo de Visita */}
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

      {/* Menú */}
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
              value={formData.calificaciones[`item_${idx + 1}`] || ''}
              onChange={(v) => updateFormData('calificaciones', `item_${idx + 1}`, v)}
            />
          ))}
        </div>
      </FormSection>

      {/* Observaciones */}
      <FormSection title="Observaciones">
        <FormField
          label="Observaciones generales"
          type="textarea"
          value={formData.observaciones.texto}
          onChange={(v) => updateFormData('observaciones', 'texto', v)}
          placeholder="Escribe cualquier observación relevante"
        />
      </FormSection>

      {/* Firmas */}
      <SignatureSection
        sectionKey="firmas"
        data={formData.firmas}
        onChange={updateFormData}
      />
    </div>
  );
}