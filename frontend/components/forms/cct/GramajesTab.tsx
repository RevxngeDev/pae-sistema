import { FormField } from '../FormField';
import { FormGrid } from '../FormGrid';
import { FormSection } from '../FormSection';
import { CCTFormData, CCTUpdateFunction } from '@/lib/types/cct';

interface Props {
  formData: CCTFormData;
  updateFormData: CCTUpdateFunction;
}

const X_OPTIONS = [
  { value: '', label: 'Sin marcar' },
  { value: 'X', label: 'Marcado (X)' },
];

export function GramajesTab({ formData, updateFormData }: Props) {
  const filaNumbers = [1, 2, 3, 4, 5, 6];
  const alimentoNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="space-y-6">
      {/* Info General */}
      <FormSection title="Información General">
        <FormGrid columns={3}>
          <FormField
            label="Institución educativa"
            value={formData.info_general_gramajes.institucion_educativa || ''}
            onChange={(v) => updateFormData('info_general_gramajes', 'institucion_educativa', v)}
          />
          <FormField
            label="ETC"
            value={formData.info_general_gramajes.etc || ''}
            onChange={(v) => updateFormData('info_general_gramajes', 'etc', v)}
          />
          <FormField
            label="Ciudad/Municipio"
            value={formData.info_general_gramajes.ciudad_municipio || ''}
            onChange={(v) => updateFormData('info_general_gramajes', 'ciudad_municipio', v)}
          />
        </FormGrid>

        <FormGrid columns={3}>
          <FormField
            label="Dirección"
            value={formData.info_general_gramajes.direccion || ''}
            onChange={(v) => updateFormData('info_general_gramajes', 'direccion', v)}
          />
          <FormField
            label="Fecha de visita"
            type="date"
            value={formData.info_general_gramajes.fecha_visita || ''}
            onChange={(v) => updateFormData('info_general_gramajes', 'fecha_visita', v)}
          />
          <FormField
            label="Hora de inicio"
            value={formData.info_general_gramajes.hora_inicio || ''}
            onChange={(v) => updateFormData('info_general_gramajes', 'hora_inicio', v)}
            placeholder="Ej: 08:00"
          />
        </FormGrid>

        <FormGrid columns={3}>
          <FormField
            label="Operador"
            value={formData.info_general_gramajes.operador || ''}
            onChange={(v) => updateFormData('info_general_gramajes', 'operador', v)}
          />
          <FormField
            label="Número de contrato"
            value={formData.info_general_gramajes.num_contrato || ''}
            onChange={(v) => updateFormData('info_general_gramajes', 'num_contrato', v)}
          />
          <FormField
            label="Hora de terminación"
            value={formData.info_general_gramajes.hora_terminacion || ''}
            onChange={(v) => updateFormData('info_general_gramajes', 'hora_terminacion', v)}
          />
        </FormGrid>
      </FormSection>

      {/* Instrumento de medición */}
      <FormSection title="Instrumento de Medición">
        <FormGrid columns={3}>
          <FormField
            label="Balanza"
            type="select"
            value={formData.instrumento.balanza || ''}
            onChange={(v) => updateFormData('instrumento', 'balanza', v)}
            options={X_OPTIONS}
          />
          <FormField
            label="Gramera"
            type="select"
            value={formData.instrumento.gramera || ''}
            onChange={(v) => updateFormData('instrumento', 'gramera', v)}
            options={X_OPTIONS}
          />
          <FormField
            label="Marca"
            value={formData.instrumento.marca || ''}
            onChange={(v) => updateFormData('instrumento', 'marca', v)}
          />
        </FormGrid>
        <FormGrid columns={3}>
          <FormField
            label="Fecha última calibración"
            type="date"
            value={formData.instrumento.fecha_ultima_calibracion || ''}
            onChange={(v) => updateFormData('instrumento', 'fecha_ultima_calibracion', v)}
          />
          <FormField
            label="Núm. menú programado"
            value={formData.instrumento.num_menu_programado || ''}
            onChange={(v) => updateFormData('instrumento', 'num_menu_programado', v)}
          />
          <FormField
            label="Núm. menú entregado"
            value={formData.instrumento.num_menu_entregado || ''}
            onChange={(v) => updateFormData('instrumento', 'num_menu_entregado', v)}
          />
        </FormGrid>
      </FormSection>

      {/* Intercambios */}
      <FormSection title="Intercambios">
        <div className="bg-blue-50 p-4 rounded-lg space-y-3">
          <p className="text-sm font-medium text-gray-700 mb-2">¿Presentaron intercambios?</p>
          <FormGrid columns={3}>
            <FormField
              label="Sí"
              type="select"
              value={formData.intercambios_gramajes.presentaron_intercambios_si || ''}
              onChange={(v) => updateFormData('intercambios_gramajes', 'presentaron_intercambios_si', v)}
              options={X_OPTIONS}
            />
            <FormField
              label="No"
              type="select"
              value={formData.intercambios_gramajes.presentaron_intercambios_no || ''}
              onChange={(v) => updateFormData('intercambios_gramajes', 'presentaron_intercambios_no', v)}
              options={X_OPTIONS}
            />
            <FormField
              label="N/A"
              type="select"
              value={formData.intercambios_gramajes.presentaron_intercambios_na || ''}
              onChange={(v) => updateFormData('intercambios_gramajes', 'presentaron_intercambios_na', v)}
              options={X_OPTIONS}
            />
          </FormGrid>

          <p className="text-sm font-medium text-gray-700 mb-2 mt-4">¿Presentaron soporte?</p>
          <FormGrid columns={3}>
            <FormField
              label="Sí"
              type="select"
              value={formData.intercambios_gramajes.presentaron_soporte_si || ''}
              onChange={(v) => updateFormData('intercambios_gramajes', 'presentaron_soporte_si', v)}
              options={X_OPTIONS}
            />
            <FormField
              label="No"
              type="select"
              value={formData.intercambios_gramajes.presentaron_soporte_no || ''}
              onChange={(v) => updateFormData('intercambios_gramajes', 'presentaron_soporte_no', v)}
              options={X_OPTIONS}
            />
            <FormField
              label="N/A"
              type="select"
              value={formData.intercambios_gramajes.presentaron_soporte_na || ''}
              onChange={(v) => updateFormData('intercambios_gramajes', 'presentaron_soporte_na', v)}
              options={X_OPTIONS}
            />
          </FormGrid>
        </div>
      </FormSection>

      {/* Alimentos programados */}
      <FormSection title="Alimentos Programados">
        <p className="text-sm text-gray-600 mb-4">
          Marca con X los alimentos que estaban programados.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {alimentoNumbers.map((num) => (
            <FormField
              key={num}
              label={`Alimento ${num}`}
              type="select"
              value={formData.alimentos_programados[`alimento_${num}`] || ''}
              onChange={(v) => updateFormData('alimentos_programados', `alimento_${num}`, v)}
              options={X_OPTIONS}
            />
          ))}
        </div>
      </FormSection>

      {/* Alimentos verificados */}
      <FormSection title="Alimentos Verificados">
        <p className="text-sm text-gray-600 mb-4">
          Marca con X los alimentos que se verificaron.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {alimentoNumbers.map((num) => (
            <FormField
              key={num}
              label={`Alimento ${num}`}
              type="select"
              value={formData.alimentos_verificados[`alimento_${num}`] || ''}
              onChange={(v) => updateFormData('alimentos_verificados', `alimento_${num}`, v)}
              options={X_OPTIONS}
            />
          ))}
        </div>
      </FormSection>

      {/* Tabla de gramajes */}
      <FormSection title="Tabla de Gramajes">
        <p className="text-sm text-gray-600 mb-4">
          Registra hasta 6 filas de componentes. Cada fila tiene 3 grupos de edad: Primaria, Cuarto y Quinto, Secundaria.
        </p>
        {filaNumbers.map((num) => (
          <div key={num} className="border rounded-lg p-4 mb-4 bg-white">
            <h4 className="font-medium text-gray-900 mb-3">Fila {num}</h4>
            
            <FormGrid>
              <FormField
                label="Componente"
                value={formData.gramajes_tabla[`fila_${num}_componente`] || ''}
                onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_componente`, v)}
                placeholder="Ej: Cereal"
              />
              <FormField
                label="Preparación"
                value={formData.gramajes_tabla[`fila_${num}_preparacion`] || ''}
                onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_preparacion`, v)}
                placeholder="Ej: Arroz blanco"
              />
            </FormGrid>

            {/* Primaria */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Primaria</p>
              <FormGrid columns={3}>
                <FormField
                  label="Muestra 1"
                  value={formData.gramajes_tabla[`fila_${num}_primaria_muestra1`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_primaria_muestra1`, v)}
                />
                <FormField
                  label="Muestra 2"
                  value={formData.gramajes_tabla[`fila_${num}_primaria_muestra2`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_primaria_muestra2`, v)}
                />
                <FormField
                  label="Muestra 3"
                  value={formData.gramajes_tabla[`fila_${num}_primaria_muestra3`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_primaria_muestra3`, v)}
                />
              </FormGrid>
              <FormGrid>
                <FormField
                  label="Peso esperado"
                  value={formData.gramajes_tabla[`fila_${num}_primaria_peso_esperado`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_primaria_peso_esperado`, v)}
                />
                <FormField
                  label="Concepto"
                  value={formData.gramajes_tabla[`fila_${num}_primaria_concepto`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_primaria_concepto`, v)}
                  placeholder="Cumple/No cumple"
                />
              </FormGrid>
            </div>

            {/* Cuarto y Quinto */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Cuarto y Quinto</p>
              <FormGrid columns={3}>
                <FormField
                  label="Muestra 1"
                  value={formData.gramajes_tabla[`fila_${num}_cuartoyquinto_muestra1`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_cuartoyquinto_muestra1`, v)}
                />
                <FormField
                  label="Muestra 2"
                  value={formData.gramajes_tabla[`fila_${num}_cuartoyquinto_muestra2`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_cuartoyquinto_muestra2`, v)}
                />
                <FormField
                  label="Muestra 3"
                  value={formData.gramajes_tabla[`fila_${num}_cuartoyquinto_muestra3`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_cuartoyquinto_muestra3`, v)}
                />
              </FormGrid>
              <FormGrid>
                <FormField
                  label="Peso esperado"
                  value={formData.gramajes_tabla[`fila_${num}_cuartoyquinto_peso_esperado`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_cuartoyquinto_peso_esperado`, v)}
                />
                <FormField
                  label="Concepto"
                  value={formData.gramajes_tabla[`fila_${num}_cuartoyquinto_concepto`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_cuartoyquinto_concepto`, v)}
                  placeholder="Cumple/No cumple"
                />
              </FormGrid>
            </div>

            {/* Secundaria */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Secundaria</p>
              <FormGrid columns={3}>
                <FormField
                  label="Muestra 1"
                  value={formData.gramajes_tabla[`fila_${num}_secundaria_muestra1`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_secundaria_muestra1`, v)}
                />
                <FormField
                  label="Muestra 2"
                  value={formData.gramajes_tabla[`fila_${num}_secundaria_muestra2`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_secundaria_muestra2`, v)}
                />
                <FormField
                  label="Muestra 3"
                  value={formData.gramajes_tabla[`fila_${num}_secundaria_muestra3`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_secundaria_muestra3`, v)}
                />
              </FormGrid>
              <FormGrid>
                <FormField
                  label="Peso esperado"
                  value={formData.gramajes_tabla[`fila_${num}_secundaria_peso_esperado`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_secundaria_peso_esperado`, v)}
                />
                <FormField
                  label="Concepto"
                  value={formData.gramajes_tabla[`fila_${num}_secundaria_concepto`] || ''}
                  onChange={(v) => updateFormData('gramajes_tabla', `fila_${num}_secundaria_concepto`, v)}
                  placeholder="Cumple/No cumple"
                />
              </FormGrid>
            </div>
          </div>
        ))}
      </FormSection>

      {/* Observaciones */}
      <FormSection title="Observaciones">
        <FormField
          label="Observaciones generales"
          type="textarea"
          value={formData.observaciones_gramajes.texto}
          onChange={(v) => updateFormData('observaciones_gramajes', 'texto', v)}
        />
      </FormSection>

      {/* Cambios al menú */}
      <FormSection title="Cambios al Menú">
        <div className="bg-yellow-50 p-4 rounded-lg space-y-3">
          <p className="text-sm font-medium text-gray-700 mb-2">¿Se realizaron cambios?</p>
          <FormGrid>
            <FormField
              label="Sí"
              type="select"
              value={formData.cambios_menu.cambios_si || ''}
              onChange={(v) => updateFormData('cambios_menu', 'cambios_si', v)}
              options={X_OPTIONS}
            />
            <FormField
              label="No"
              type="select"
              value={formData.cambios_menu.cambios_no || ''}
              onChange={(v) => updateFormData('cambios_menu', 'cambios_no', v)}
              options={X_OPTIONS}
            />
          </FormGrid>

          <p className="text-sm font-medium text-gray-700 mb-2 mt-4">¿Estaban aprobados?</p>
          <FormGrid>
            <FormField
              label="Sí"
              type="select"
              value={formData.cambios_menu.aprobados_si || ''}
              onChange={(v) => updateFormData('cambios_menu', 'aprobados_si', v)}
              options={X_OPTIONS}
            />
            <FormField
              label="No"
              type="select"
              value={formData.cambios_menu.aprobados_no || ''}
              onChange={(v) => updateFormData('cambios_menu', 'aprobados_no', v)}
              options={X_OPTIONS}
            />
          </FormGrid>
        </div>
      </FormSection>
    </div>
  );
}