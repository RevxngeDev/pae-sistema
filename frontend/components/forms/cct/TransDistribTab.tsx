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

const CALIFICACION_OPTIONS = [
  { value: '', label: 'Seleccionar' },
  { value: '2', label: '2 - Cumple' },
  { value: '1', label: '1 - Cumple parcialmente' },
  { value: '0', label: '0 - No cumple' },
  { value: 'N/A', label: 'N/A - No aplica' },
];

// Items by section
const PERSONAL_ITEMS = [
  { num: 1, label: '1. El personal manipulador y transportador cumple condiciones' },
  { num: 2, label: '2. Cuenta con la dotación completa' },
  { num: 3, label: '3. El personal cumple buenas prácticas de manipulación' },
];

const VEHICULOS_ITEMS = [
  { num: 4, label: '4. Los vehículos cumplen con las condiciones sanitarias' },
  { num: 5, label: '5. El vehículo cuenta con certificación' },
  { num: 6, label: '6. Las canastillas están en buen estado' },
  { num: 9, label: '9. Se realiza monitoreo de temperatura' },
  { num: 10, label: '10. Las temperaturas son adecuadas' },
  { num: 11, label: '11. Se cumple con las cantidades' },
];

const ENTREGA_ITEMS = [
  { num: 12, label: '12. La cantidad de complementos coincide con lo solicitado' },
  { num: 13, label: '13. Los empaques están en buen estado' },
  { num: 14, label: '14. Los rotulados están completos' },
  { num: 15, label: '15. Las fechas de vencimiento son adecuadas' },
  { num: 16, label: '16. Se cumple con horarios de entrega' },
  { num: 17, label: '17. Se cuenta con planilla de entrega' },
  { num: 18, label: '18. El personal cumple protocolos' },
];

const CONSUMO_ITEMS = [
  { num: 19, label: '19. Los beneficiarios reciben el complemento completo' },
  { num: 20, label: '20. Hay supervisión durante el consumo' },
  { num: 21, label: '21. Se respeta el horario de consumo' },
  { num: 22, label: '22. Las condiciones del comedor son adecuadas' },
  { num: 23, label: '23. Los beneficiarios consumen el complemento' },
];

export function TransDistribTab({ formData, updateFormData }: Props) {
  const contenedorNumbers = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-6">
      {/* Info General */}
      <FormSection title="Información General">
        <FormGrid columns={3}>
          <FormField
            label="ETC No. C"
            value={formData.info_general_trans.etc_no_c || ''}
            onChange={(v) => updateFormData('info_general_trans', 'etc_no_c', v)}
          />
          <FormField
            label="Fecha de visita"
            type="date"
            value={formData.info_general_trans.fecha_visita || ''}
            onChange={(v) => updateFormData('info_general_trans', 'fecha_visita', v)}
          />
          <FormField
            label="Sede educativa"
            value={formData.info_general_trans.sede_educativa || ''}
            onChange={(v) => updateFormData('info_general_trans', 'sede_educativa', v)}
          />
        </FormGrid>

        <FormGrid columns={3}>
          <FormField
            label="Operador"
            value={formData.info_general_trans.operador || ''}
            onChange={(v) => updateFormData('info_general_trans', 'operador', v)}
          />
          <FormField
            label="Número de contrato"
            value={formData.info_general_trans.num_contrato || ''}
            onChange={(v) => updateFormData('info_general_trans', 'num_contrato', v)}
          />
          <FormField
            label="Número de servicios"
            type="number"
            value={formData.info_general_trans.num_servicios || ''}
            onChange={(v) => updateFormData('info_general_trans', 'num_servicios', v)}
          />
        </FormGrid>

        <FormGrid columns={3}>
          <FormField
            label="Jornada mañana"
            type="select"
            value={formData.info_general_trans.jornada_manana || ''}
            onChange={(v) => updateFormData('info_general_trans', 'jornada_manana', v)}
            options={X_OPTIONS}
          />
          <FormField
            label="Jornada tarde"
            type="select"
            value={formData.info_general_trans.jornada_tarde || ''}
            onChange={(v) => updateFormData('info_general_trans', 'jornada_tarde', v)}
            options={X_OPTIONS}
          />
          <FormField
            label="Almuerzo"
            type="select"
            value={formData.info_general_trans.almuerzo || ''}
            onChange={(v) => updateFormData('info_general_trans', 'almuerzo', v)}
            options={X_OPTIONS}
          />
        </FormGrid>

        <FormGrid>
          <FormField
            label="Nombre quien recibe visita"
            value={formData.info_general_trans.recibe_visita_nombre || ''}
            onChange={(v) => updateFormData('info_general_trans', 'recibe_visita_nombre', v)}
          />
          <FormField
            label="Cargo quien recibe visita"
            value={formData.info_general_trans.recibe_visita_cargo || ''}
            onChange={(v) => updateFormData('info_general_trans', 'recibe_visita_cargo', v)}
          />
        </FormGrid>

        <FormGrid>
          <FormField
            label="Nombre quien realiza visita"
            value={formData.info_general_trans.realiza_visita_nombre || ''}
            onChange={(v) => updateFormData('info_general_trans', 'realiza_visita_nombre', v)}
          />
          <FormField
            label="Cargo quien realiza visita"
            value={formData.info_general_trans.realiza_visita_cargo || ''}
            onChange={(v) => updateFormData('info_general_trans', 'realiza_visita_cargo', v)}
          />
        </FormGrid>
      </FormSection>

      {/* Menú */}
      <FormSection title="Menú">
        <FormField
          label="Descripción del menú"
          type="textarea"
          value={formData.menu_trans.descripcion_menu}
          onChange={(v) => updateFormData('menu_trans', 'descripcion_menu', v)}
        />
      </FormSection>

      {/* Info Ruta */}
      <FormSection title="Información de la Ruta">
        <FormGrid columns={3}>
          <FormField
            label="Nombre del CDP"
            value={formData.info_ruta.nombre_cdp || ''}
            onChange={(v) => updateFormData('info_ruta', 'nombre_cdp', v)}
          />
          <FormField
            label="Placa del vehículo"
            value={formData.info_ruta.placa_vehiculo || ''}
            onChange={(v) => updateFormData('info_ruta', 'placa_vehiculo', v)}
          />
          <FormField
            label="Número de ruta"
            value={formData.info_ruta.num_ruta || ''}
            onChange={(v) => updateFormData('info_ruta', 'num_ruta', v)}
          />
        </FormGrid>
        <FormGrid>
          <FormField
            label="Número de sedes en ruta"
            type="number"
            value={formData.info_ruta.num_sedes_ruta || ''}
            onChange={(v) => updateFormData('info_ruta', 'num_sedes_ruta', v)}
          />
          <FormField
            label="Hora de salida del CDP"
            value={formData.info_ruta.hora_salida_cdp || ''}
            onChange={(v) => updateFormData('info_ruta', 'hora_salida_cdp', v)}
            placeholder="Ej: 06:30"
          />
        </FormGrid>
      </FormSection>

      {/* Distribución */}
      <FormSection title="Distribución por Contenedor">
        <p className="text-sm text-gray-600 mb-4">
          Registra hasta 5 contenedores. Solo se llenarán los que tengan datos.
        </p>
        {contenedorNumbers.map((num) => (
          <div key={num} className="border rounded-lg p-4 mb-4 bg-white">
            <h4 className="font-medium text-gray-900 mb-3">Contenedor {num}</h4>
            <FormGrid columns={3}>
              <FormField
                label="Hora de llegada"
                value={formData.distribucion[`contenedor_${num}_hora_llegada`] || ''}
                onChange={(v) => updateFormData('distribucion', `contenedor_${num}_hora_llegada`, v)}
                placeholder="Ej: 07:30"
              />
              <FormField
                label="Hora de salida"
                value={formData.distribucion[`contenedor_${num}_hora_salida`] || ''}
                onChange={(v) => updateFormData('distribucion', `contenedor_${num}_hora_salida`, v)}
              />
              <FormField
                label="Cantidad entregados"
                type="number"
                value={formData.distribucion[`contenedor_${num}_cantidad_entregados`] || ''}
                onChange={(v) => updateFormData('distribucion', `contenedor_${num}_cantidad_entregados`, v)}
              />
            </FormGrid>
            <FormGrid>
              <FormField
                label="Temperatura del contenedor"
                value={formData.distribucion[`contenedor_${num}_temp_contenedor`] || ''}
                onChange={(v) => updateFormData('distribucion', `contenedor_${num}_temp_contenedor`, v)}
                placeholder="Ej: 65"
              />
              <FormField
                label="Temperatura del complemento"
                value={formData.distribucion[`contenedor_${num}_temp_complemento`] || ''}
                onChange={(v) => updateFormData('distribucion', `contenedor_${num}_temp_complemento`, v)}
              />
            </FormGrid>
          </div>
        ))}
      </FormSection>

      {/* Calificaciones Personal Manipulador */}
      <FormSection title="Calificaciones - Personal Manipulador">
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <p className="text-sm text-gray-600 mb-2">
            2 = Cumple | 1 = Cumple parcialmente | 0 = No cumple | N/A = No aplica
          </p>
          {PERSONAL_ITEMS.map((item) => (
            <FormField
              key={item.num}
              label={item.label}
              type="select"
              value={formData.calif_personal_manipulador[`item_${item.num}_calificacion`] || ''}
              onChange={(v) => updateFormData('calif_personal_manipulador', `item_${item.num}_calificacion`, v)}
              options={CALIFICACION_OPTIONS}
            />
          ))}
          <FormField
            label="Observaciones"
            type="textarea"
            value={formData.calif_personal_manipulador.observaciones || ''}
            onChange={(v) => updateFormData('calif_personal_manipulador', 'observaciones', v)}
          />
        </div>
      </FormSection>

      {/* Calificaciones Vehículos */}
      <FormSection title="Calificaciones - Vehículos">
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          {VEHICULOS_ITEMS.map((item) => (
            <FormField
              key={item.num}
              label={item.label}
              type="select"
              value={formData.calif_vehiculos[`item_${item.num}_calificacion`] || ''}
              onChange={(v) => updateFormData('calif_vehiculos', `item_${item.num}_calificacion`, v)}
              options={CALIFICACION_OPTIONS}
            />
          ))}
          <FormField
            label="Observaciones"
            type="textarea"
            value={formData.calif_vehiculos.observaciones || ''}
            onChange={(v) => updateFormData('calif_vehiculos', 'observaciones', v)}
          />
        </div>
      </FormSection>

      {/* Calificaciones Entrega */}
      <FormSection title="Calificaciones - Entrega">
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          {ENTREGA_ITEMS.map((item) => (
            <FormField
              key={item.num}
              label={item.label}
              type="select"
              value={formData.calif_entrega[`item_${item.num}_calificacion`] || ''}
              onChange={(v) => updateFormData('calif_entrega', `item_${item.num}_calificacion`, v)}
              options={CALIFICACION_OPTIONS}
            />
          ))}
          <FormField
            label="Observaciones"
            type="textarea"
            value={formData.calif_entrega.observaciones || ''}
            onChange={(v) => updateFormData('calif_entrega', 'observaciones', v)}
          />
        </div>
      </FormSection>

      {/* Calificaciones Consumo */}
      <FormSection title="Calificaciones - Consumo">
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          {CONSUMO_ITEMS.map((item) => (
            <FormField
              key={item.num}
              label={item.label}
              type="select"
              value={formData.calif_consumo[`item_${item.num}_calificacion`] || ''}
              onChange={(v) => updateFormData('calif_consumo', `item_${item.num}_calificacion`, v)}
              options={CALIFICACION_OPTIONS}
            />
          ))}
        </div>
      </FormSection>

      {/* Observaciones generales */}
      <FormSection title="Observaciones Generales">
        <FormField
          label="Observaciones"
          type="textarea"
          value={formData.observaciones_generales_trans.texto}
          onChange={(v) => updateFormData('observaciones_generales_trans', 'texto', v)}
        />
      </FormSection>

      {/* Firmas */}
      <SignatureSection
        sectionKey="firmas_trans"
        data={formData.firmas_trans}
        onChange={updateFormData}
      />
    </div>
  );
}