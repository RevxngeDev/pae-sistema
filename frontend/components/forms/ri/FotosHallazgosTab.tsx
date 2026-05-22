import { FormField } from '../FormField';
import { FormGrid } from '../FormGrid';
import { FormSection } from '../FormSection';
import { PhotoUploader } from '../PhotoUploader';
import { RIFormData } from '@/lib/types/form';

interface Props {
  formData: RIFormData;
  updateFormData: (section: string, field: string, value: string) => void;
  updatePhoto: (section: 'fotos_general' | 'fotos_hallazgos', field: string, file: File | null) => void;
}

export function FotosHallazgosTab({ formData, updateFormData, updatePhoto }: Props) {
  const photoNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <FormSection title="Información General">
        <FormGrid columns={3}>
          <FormField
            label="Sede educativa"
            value={formData.fotos_hallazgos.sede_educativa}
            onChange={(v) => updateFormData('fotos_hallazgos', 'sede_educativa', v)}
            placeholder="Nombre de la sede"
          />
          <FormField
            label="Fecha"
            type="date"
            value={formData.fotos_hallazgos.fecha}
            onChange={(v) => updateFormData('fotos_hallazgos', 'fecha', v)}
          />
          <FormField
            label="Período"
            value={formData.fotos_hallazgos.periodo}
            onChange={(v) => updateFormData('fotos_hallazgos', 'periodo', v)}
            placeholder="Ej: Mayo 2026"
          />
        </FormGrid>
      </FormSection>

      <FormSection title="Fotografías de Hallazgos">
        <p className="text-sm text-gray-600 mb-4">
          Sube hasta 12 fotografías de hallazgos con sus descripciones. Solo se enviarán las que tengan imagen cargada.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {photoNumbers.map((num) => {
            const fotoKey = `foto_${num}` as keyof typeof formData.fotos_hallazgos;
            const descKey = `descripcion_${num}` as keyof typeof formData.fotos_hallazgos;
            
            return (
              <div key={num} className="border rounded-lg p-4 bg-white space-y-3">
                <h4 className="font-medium text-gray-900">Fotografía {num}</h4>
                <PhotoUploader
                  label="Imagen"
                  file={(formData.fotos_hallazgos[fotoKey] as File | null) || null}
                  onChange={(file) => updatePhoto('fotos_hallazgos', `foto_${num}`, file)}
                />
                <FormField
                  label="Descripción"
                  type="textarea"
                  value={(formData.fotos_hallazgos[descKey] as string) || ''}
                  onChange={(v) => updateFormData('fotos_hallazgos', `descripcion_${num}`, v)}
                  placeholder="Describe el hallazgo"
                />
              </div>
            );
          })}
        </div>
      </FormSection>
    </div>
  );
}