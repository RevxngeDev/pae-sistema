import { FormField } from './FormField';
import { FormSection } from './FormSection';
import { SignatureData, UpdateFunction } from '@/lib/types/form';

interface SignatureSectionProps {
  title?: string;
  sectionKey: string;
  data: SignatureData;
  onChange: UpdateFunction;
}

export function SignatureSection({ 
  title = "Firmas",
  sectionKey, 
  data, 
  onChange 
}: SignatureSectionProps) {
  return (
    <FormSection title={title}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <p className="font-medium text-gray-900 mb-3">Firma 1</p>
          <FormField
            label="Nombre completo"
            value={data.firma1_nombre}
            onChange={(v) => onChange(sectionKey, 'firma1_nombre', v)}
            placeholder="Nombre completo"
          />
          <FormField
            label="Documento"
            value={data.firma1_documento}
            onChange={(v) => onChange(sectionKey, 'firma1_documento', v)}
            placeholder="Número de documento"
          />
          <FormField
            label="Cargo"
            value={data.firma1_cargo}
            onChange={(v) => onChange(sectionKey, 'firma1_cargo', v)}
            placeholder="Cargo"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <p className="font-medium text-gray-900 mb-3">Firma 2</p>
          <FormField
            label="Nombre completo"
            value={data.firma2_nombre}
            onChange={(v) => onChange(sectionKey, 'firma2_nombre', v)}
            placeholder="Nombre completo"
          />
          <FormField
            label="Documento"
            value={data.firma2_documento}
            onChange={(v) => onChange(sectionKey, 'firma2_documento', v)}
            placeholder="Número de documento"
          />
          <FormField
            label="Cargo"
            value={data.firma2_cargo}
            onChange={(v) => onChange(sectionKey, 'firma2_cargo', v)}
            placeholder="Cargo"
          />
        </div>
      </div>
    </FormSection>
  );
}