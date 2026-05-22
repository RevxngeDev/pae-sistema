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

const DESPACHO_ITEMS = [
  '1. El personal que distribuye los complementos  en las sedes educativas presenta la documentación vigente para la manipulación de alimentos ',
  '2. El personal que distribuye los complementos en las sedes educativas aplica las Buenas Practicas de Manufactura y están dotados con los elementos de protección requeridos.',
  '3. Las canastillas utilizadas para el transporte de los componente  se encuentran debidamente identificadas y se observan en buen estado de limpieza y desinfección.',
  '4. El vehículo transportador de complementos se encuentra en buen estado, y cumple con las condiciones higiénicas sanitarias establecidas por la normatividad vigente.',
  '5. El vehículo transportador de complementos presenta concepto sanitario favorable de acuerdo a los alimentos transportados.',
  '6. El vehículo transportador es de uso exclusivo para el transporte de los complementos alimentarios y, los productos dentro de los vehículos son transportados en recipientes o canastillas de material sanitario.',
  '7. Durante el recibo, los componentes del complemento cumplen con los rangos establecidos de temperatura en la normatividad sanitaria vigente; (Temperaturas de refrigeración no mayores 4°C +/- 2) (Bebidas y derivados lácteos). (Si aplica)',
  '8. El personal del operador cuenta con equipo de protección de bioseguridad',
  '9. El rotulado del empaque primario cumplen con las condiciones estipuladas en la normatividad vigente',
  '10. El cierre de los empaques primarios y empaque secundario (si aplica) se encuentran en perfecto estado.',
  '11. Se evita el riesgo de contaminación cruzada durante la entrega de los componentes del suministro, en las sedes educativas.',
  '12. Los componentes del complemento cumplen con las características organolépticas (color, olor, sabor y textura).',
  '13. Los componentes del complemento garantizan las condiciones de inocuidad (sin fecha caducada, presunto moho u hongo, abombamiento, etc.)',
  '14. Los componentes ensamblados no presentan daño mecánico (afectados por la máquina o proceso de ensamble), deteriorando su apariencia. ',
  '15. El operador entrega la cantidad total de complementos alimentarios programados.',
  '16. El operador realiza la entrega de todos los componentes del refrigerio escolar de acuerdo al menú programado.',
  '17. El operador cumple con los horarios establecidos de entrega de los complementos, de acuerdo con las necesidades del colegio.',
  '18. Los empaques plásticos de los alimentos entregados son clasificados como residuos inorgánicos y son dispuestos en canecas.',
];

const COMPONENTE_FIELDS = [
  { key: 'nombre', label: 'Nombre del producto' },
  { key: 'proveedor', label: 'Proveedor' },
  { key: 'fecha_fab', label: 'Fecha fabricación', type: 'date' as const },
  { key: 'lote', label: 'Lote' },
  { key: 'fecha_venc', label: 'Fecha vencimiento', type: 'date' as const },
  { key: 'color', label: 'Color' },
  { key: 'olor', label: 'Olor' },
  { key: 'sabor', label: 'Sabor' },
  { key: 'textura', label: 'Textura' },
  { key: 'temp', label: 'Temperatura' },
];

export function DespachoTab({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      {/* Info General Despacho */}
      <FormSection title="Información General del Despacho">
        <FormGrid columns={3}>
          <FormField
            label="Fecha de visita"
            type="date"
            value={formData.info_general_despacho.fecha_visita || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'fecha_visita', v)}
          />
          <FormField
            label="Jornada mañana"
            type="select"
            value={formData.info_general_despacho.jornada_manana || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'jornada_manana', v)}
            options={[
              { value: '', label: 'Sin marcar' },
              { value: 'X', label: 'Marcado (X)' },
            ]}
          />
          <FormField
            label="Jornada tarde"
            type="select"
            value={formData.info_general_despacho.jornada_tarde || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'jornada_tarde', v)}
            options={[
              { value: '', label: 'Sin marcar' },
              { value: 'X', label: 'Marcado (X)' },
            ]}
          />
        </FormGrid>

        <FormGrid>
          <FormField
            label="Sede educativa"
            value={formData.info_general_despacho.sede_educativa || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'sede_educativa', v)}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField
              label="Acceso fácil"
              type="select"
              value={formData.info_general_despacho.acceso_facil || ''}
              onChange={(v) => updateFormData('info_general_despacho', 'acceso_facil', v)}
              options={[
                { value: '', label: 'Sin marcar' },
                { value: 'X', label: 'Marcado (X)' },
              ]}
            />
            <FormField
              label="Acceso difícil"
              type="select"
              value={formData.info_general_despacho.acceso_dificil || ''}
              onChange={(v) => updateFormData('info_general_despacho', 'acceso_dificil', v)}
              options={[
                { value: '', label: 'Sin marcar' },
                { value: 'X', label: 'Marcado (X)' },
              ]}
            />
          </div>
        </FormGrid>

        <FormGrid>
          <FormField
            label="Nombre del operador"
            value={formData.info_general_despacho.nombre_operador || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'nombre_operador', v)}
          />
          <FormField
            label="Número de contrato"
            value={formData.info_general_despacho.num_contrato || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'num_contrato', v)}
          />
        </FormGrid>

        <FormGrid columns={3}>
          <FormField
            label="Tipo de vehículo"
            value={formData.info_general_despacho.tipo_vehiculo || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'tipo_vehiculo', v)}
          />
          <FormField
            label="Nombre conductor"
            value={formData.info_general_despacho.nombre_conductor || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'nombre_conductor', v)}
          />
          <FormField
            label="Documento conductor"
            value={formData.info_general_despacho.documento_conductor || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'documento_conductor', v)}
          />
        </FormGrid>

        <FormGrid columns={3}>
          <FormField
            label="Placa vehículo"
            value={formData.info_general_despacho.placa_vehiculo || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'placa_vehiculo', v)}
          />
          <FormField
            label="Nombre quien atiende"
            value={formData.info_general_despacho.atiende_nombre || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'atiende_nombre', v)}
          />
          <FormField
            label="Cargo quien atiende"
            value={formData.info_general_despacho.atiende_cargo || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'atiende_cargo', v)}
          />
        </FormGrid>

        <FormGrid>
          <FormField
            label="Nombre quien realiza"
            value={formData.info_general_despacho.realiza_nombre || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'realiza_nombre', v)}
          />
          <FormField
            label="Cargo quien realiza"
            value={formData.info_general_despacho.realiza_cargo || ''}
            onChange={(v) => updateFormData('info_general_despacho', 'realiza_cargo', v)}
          />
        </FormGrid>
      </FormSection>

       {/* Calificaciones */}
        <FormSection title="Calificaciones del Despacho">
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <p className="text-sm text-gray-600 mb-2">0 = No Cumple | 1 = Cumple | N/A = No Aplica</p>
            {DESPACHO_ITEMS.map((label, idx) => (
            <RatingField
                key={idx}
                label={label}
                type="0_1"
                value={formData.calificaciones_despacho[`item_${idx + 1}`] || ''}
                onChange={(v) => updateFormData('calificaciones_despacho', `item_${idx + 1}`, v)}
            />
            ))}
            
            {/* Puntajes */}
            <div className="border-t pt-4 mt-4">
            <FormGrid>
                <FormField
                label="Puntaje esperado"
                type="number"
                value={formData.calificaciones_despacho.puntaje_esperado || ''}
                onChange={(v) => updateFormData('calificaciones_despacho', 'puntaje_esperado', v)}
                placeholder="Ej: 18"
                />
                <FormField
                label="Puntaje obtenido"
                type="number"
                value={formData.calificaciones_despacho.puntaje_obtenido || ''}
                onChange={(v) => updateFormData('calificaciones_despacho', 'puntaje_obtenido', v)}
                placeholder="Ej: 17"
                />
            </FormGrid>
            </div>
        </div>
        </FormSection>

      {/* Componentes - 5 productos */}
      <FormSection title="Componentes Alimenticios">
        <p className="text-sm text-gray-600 mb-4">
          Registra hasta 5 componentes. Deja en blanco los que no apliquen.
        </p>
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="border rounded-lg p-4 mb-4 bg-white">
            <h4 className="font-medium text-gray-900 mb-3">Componente {num}</h4>
            <FormGrid columns={2}>
              {COMPONENTE_FIELDS.map((field) => (
                <FormField
                  key={field.key}
                  label={field.label}
                  type={field.type || 'text'}
                  value={formData.componentes[`componente_${num}_${field.key}`] || ''}
                  onChange={(v) => updateFormData('componentes', `componente_${num}_${field.key}`, v)}
                />
              ))}
            </FormGrid>
          </div>
        ))}
      </FormSection>

      {/* Observaciones */}
      <FormSection title="Observaciones del Despacho">
        <FormField
          label="Observaciones"
          type="textarea"
          value={formData.observaciones_despacho.texto || ''}
          onChange={(v) => updateFormData('observaciones_despacho', 'texto', v)}
        />
      </FormSection>

      {/* Firmas */}
      <SignatureSection
        sectionKey="firmas_despacho"
        data={formData.firmas_despacho}
        onChange={updateFormData}
      />
    </div>
  );
}