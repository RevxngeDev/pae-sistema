'use client';

import { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface PhotoUploaderProps {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
}

export function PhotoUploader({ label, file, onChange }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      alert('Solo se permiten archivos de imagen (JPG, PNG, etc.)');
      return;
    }

    // Validate size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar los 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);

    onChange(selectedFile);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Click para subir imagen
          </p>
          <p className="text-xs text-gray-400 mt-1">
            JPG, PNG (máx. 5MB)
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-white">
          {preview && (
            <div className="relative">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-48 object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="absolute top-2 right-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
          <div className="p-3 flex items-center gap-2 bg-gray-50">
            <ImageIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate flex-1">
              {file.name}
            </span>
            <span className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(0)} KB
            </span>
          </div>
        </div>
      )}
    </div>
  );
}