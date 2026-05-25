import { FormField } from '../FormField';
import { FormGrid } from '../FormGrid';
import { FormSection } from '../FormSection';
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

const CUMPLE_OPTIONS = [
  { value: '', label: 'Seleccionar' },
  { value: 'C', label: 'C - Cumple' },
  { value: 'NC', label: 'NC - No Cumple' },
  { value: 'N/A', label: 'N/A - No Aplica' },
];

export function TempOrgTab({ formData, updateFormData }: Props) {
  const preparacionNumbers = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Info General */}
      <FormSection title="Información General">
        <FormGrid columns={3}>
          <FormField
            label="ETC No. C"
            value={formData.info_general.etc_no_c}
            onChange={(v) => updateFormData('info_general', 'etc_no_c', v)}
            placeholder="Ej: Puerto Gaitán"
          />
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
        </FormGrid>

        <FormGrid columns={3}>
          <FormField
            label="Jornada mañana"
            type="select"
            value={formData.info_general.jornada_manana}
            onChange={(v) => updateFormData('info_general', 'jornada_manana', v)}
            options={X_OPTIONS}
          />
          <FormField
            label="Jornada tarde"
            type="select"
            value={formData.info_general.jornada_tarde}
            onChange={(v) => updateFormData('info_general', 'jornada_tarde', v)}
            options={X_OPTIONS}
          />
          <FormField
            label="Almuerzo"
            type="select"
            value={formData.info_general.almuerzo}
            onChange={(v) => updateFormData('info_general', 'almuerzo', v)}
            options={X_OPTIONS}
          />
        </FormGrid>

        <FormGrid>
          <FormField
            label="Operador"
            value={formData.info_general.operador}
            onChange={(v) => updateFormData('info_general', 'operador', v)}
            placeholder="Nombre del operador"
          />
          <FormField
            label="Número de servicios"
            type="number"
            value={formData.info_general.num_servicios}
            onChange={(v) => updateFormData('info_general', 'num_servicios', v)}
            placeholder="Ej: 325"
          />
        </FormGrid>
      </FormSection>

      {/* Preparaciones */}
      <FormSection title="Preparaciones">
        <p className="text-sm text-gray-600 mb-4">
          Registra hasta 8 preparaciones. Solo se llenarán las que tengan datos.
        </p>
        {preparacionNumbers.map((num) => (
          <div key={num} className="border rounded-lg p-4 mb-4 bg-white">
            <h4 className="font-medium text-gray-900 mb-3">Preparación {num}</h4>
            
            <FormField
              label="Nombre de la preparación"
              value={formData.preparaciones[`preparacion_${num}_nombre`] || ''}
              onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_nombre`, v)}
              placeholder="Ej: Arroz con pollo"
            />

            {/* Características organolépticas */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Características organolépticas</p>
              <FormGrid columns={4}>
                <FormField
                  label="Apariencia - Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_apariencia_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_apariencia_cumple`, v)}
                  options={X_OPTIONS}
                />
                <FormField
                  label="Apariencia - No Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_apariencia_no_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_apariencia_no_cumple`, v)}
                  options={X_OPTIONS}
                />
                <FormField
                  label="Sabor - Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_sabor_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_sabor_cumple`, v)}
                  options={X_OPTIONS}
                />
                <FormField
                  label="Sabor - No Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_sabor_no_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_sabor_no_cumple`, v)}
                  options={X_OPTIONS}
                />
              </FormGrid>
              <FormGrid columns={4}>
                <FormField
                  label="Olor - Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_olor_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_olor_cumple`, v)}
                  options={X_OPTIONS}
                />
                <FormField
                  label="Olor - No Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_olor_no_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_olor_no_cumple`, v)}
                  options={X_OPTIONS}
                />
                <FormField
                  label="Textura - Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_textura_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_textura_cumple`, v)}
                  options={X_OPTIONS}
                />
                <FormField
                  label="Textura - No Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_textura_no_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_textura_no_cumple`, v)}
                  options={X_OPTIONS}
                />
              </FormGrid>
            </div>

            {/* Temperatura de cocción */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Temperatura de cocción</p>
              <FormGrid columns={3}>
                <FormField
                  label="Grados"
                  value={formData.preparaciones[`preparacion_${num}_temp_coccion_grados`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_temp_coccion_grados`, v)}
                  placeholder="Ej: 75"
                />
                <FormField
                  label="Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_temp_coccion_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_temp_coccion_cumple`, v)}
                  options={X_OPTIONS}
                />
                <FormField
                  label="No Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_temp_coccion_no_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_temp_coccion_no_cumple`, v)}
                  options={X_OPTIONS}
                />
              </FormGrid>
            </div>

            {/* Temperatura distribución inicial */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Temperatura distribución inicial</p>
              <FormGrid columns={3}>
                <FormField
                  label="Grados"
                  value={formData.preparaciones[`preparacion_${num}_temp_dist_ini_grados`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_temp_dist_ini_grados`, v)}
                />
                <FormField
                  label="Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_temp_dist_ini_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_temp_dist_ini_cumple`, v)}
                  options={X_OPTIONS}
                />
                <FormField
                  label="No Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_temp_dist_ini_no_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_temp_dist_ini_no_cumple`, v)}
                  options={X_OPTIONS}
                />
              </FormGrid>
            </div>

            {/* Temperatura distribución final */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Temperatura distribución final</p>
              <FormGrid columns={3}>
                <FormField
                  label="Grados"
                  value={formData.preparaciones[`preparacion_${num}_temp_dist_fin_grados`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_temp_dist_fin_grados`, v)}
                />
                <FormField
                  label="Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_temp_dist_fin_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_temp_dist_fin_cumple`, v)}
                  options={X_OPTIONS}
                />
                <FormField
                  label="No Cumple"
                  type="select"
                  value={formData.preparaciones[`preparacion_${num}_temp_dist_fin_no_cumple`] || ''}
                  onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_temp_dist_fin_no_cumple`, v)}
                  options={X_OPTIONS}
                />
              </FormGrid>
            </div>

            {/* Cumplimiento general */}
            <div className="mt-4">
              <FormField
                label="Cumplimiento general"
                type="select"
                value={formData.preparaciones[`preparacion_${num}_cumplimiento_general`] || ''}
                onChange={(v) => updateFormData('preparaciones', `preparacion_${num}_cumplimiento_general`, v)}
                options={CUMPLE_OPTIONS}
              />
            </div>
          </div>
        ))}
      </FormSection>

      {/* Indicador */}
      <FormSection title="Indicador de Cumplimiento">
        <FormField
          label="Porcentaje de cumplimiento"
          value={formData.indicador.porcentaje_cumplimiento}
          onChange={(v) => updateFormData('indicador', 'porcentaje_cumplimiento', v)}
          placeholder="Ej: 95%"
        />
      </FormSection>

      {/* Observaciones */}
      <FormSection title="Observaciones">
        <FormField
          label="Observaciones generales"
          type="textarea"
          value={formData.observaciones.texto}
          onChange={(v) => updateFormData('observaciones', 'texto', v)}
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