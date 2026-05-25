import { FormField } from './FormField';
import { FormGrid } from './FormGrid';
import { FormSection } from './FormSection';
import { PhotoUploader } from './PhotoUploader';

interface PhotosTabProps {
  title: string;
  description: string;
  sectionKey: string;
  data: any;
  updateFormData: (section: string, field: string, value: string) => void;
  updatePhoto: (section: any, field: string, file: File | null) => void;
}

export function PhotosTab({ 
  title, 
  description, 
  sectionKey, 
  data, 
  updateFormData, 
  updatePhoto 
}: PhotosTabProps) {
  const photoNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <FormSection title="Información General">
        <FormGrid columns={3}>
          <FormField
            label="Sede educativa"
            value={data.sede_educativa}
            onChange={(v) => updateFormData(sectionKey, 'sede_educativa', v)}
            placeholder="Nombre de la sede"
          />
          <FormField
            label="Fecha"
            type="date"
            value={data.fecha}
            onChange={(v) => updateFormData(sectionKey, 'fecha', v)}
          />
          <FormField
            label="Período"
            value={data.periodo}
            onChange={(v) => updateFormData(sectionKey, 'periodo', v)}
            placeholder="Ej: Mayo 2026"
          />
        </FormGrid>
      </FormSection>

      <FormSection title={title}>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <div className="grid md:grid-cols-2 gap-6">
          {photoNumbers.map((num) => (
            <div key={num} className="border rounded-lg p-4 bg-white space-y-3">
              <h4 className="font-medium text-gray-900">Fotografía {num}</h4>
              <PhotoUploader
                label="Imagen"
                file={data[`foto_${num}`] || null}
                onChange={(file) => updatePhoto(sectionKey, `foto_${num}`, file)}
              />
              <FormField
                label="Descripción"
                type="textarea"
                value={data[`descripcion_${num}`] || ''}
                onChange={(v) => updateFormData(sectionKey, `descripcion_${num}`, v)}
                placeholder="Describe qué muestra la fotografía"
              />
            </div>
          ))}
        </div>
      </FormSection>
    </div>
  );
}