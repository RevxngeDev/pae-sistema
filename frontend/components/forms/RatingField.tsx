import { FormField } from './FormField';

interface RatingFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'C_NC' | '0_1';
}

export function RatingField({ label, value, onChange, type = 'C_NC' }: RatingFieldProps) {
  const options = type === 'C_NC' 
    ? [
        { value: '', label: 'Seleccionar' },
        { value: 'C', label: 'C - Cumple' },
        { value: 'NC', label: 'NC - No Cumple' },
        { value: 'N/A', label: 'N/A - No Aplica' },
      ]
    : [
        { value: '', label: 'Seleccionar' },
        { value: '1', label: '1 - Cumple' },
        { value: '0', label: '0 - No Cumple' },
        { value: 'N/A', label: 'N/A - No Aplica' }, // ← AGREGADO
      ];

  return (
    <FormField
      label={label}
      type="select"
      value={value}
      onChange={onChange}
      options={options}
    />
  );
}