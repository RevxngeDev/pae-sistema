'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { inspectorApi } from '@/lib/api';

export default function CodeValidationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateType = searchParams.get('tipo') || 'RI';

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inspector, setInspector] = useState<any>(null);

  const handleValidate = async () => {
    const trimmedCode = code.trim();
    
    if (!trimmedCode) {
      setError('Por favor ingresa tu código');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await inspectorApi.validateCode(trimmedCode);
      setInspector(data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Código no válido');
      } else if (err.response?.status === 403) {
        setError('Este código ha sido desactivado. Contacta al administrador.');
      } else {
        setError('Error al validar el código. Intenta de nuevo.');
      }
      setInspector(null);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    const formRoute = templateType === 'CCT' ? 'form-cct' : 'form';
    router.push(`/inspector/${formRoute}?tipo=${templateType}&codigo=${code.trim()}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-md mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Validar código de inspector</CardTitle>
            <CardDescription>
              Planilla: <strong>{templateType}</strong>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {!inspector ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="code">Código de inspector</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Ej: INSP-001"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <Button 
                  onClick={handleValidate} 
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Validando...' : 'Validar código'}
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Código válido</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Inspector:</p>
                  <p className="font-medium text-gray-900">{inspector.nombre_completo}</p>
                  <p className="text-sm text-gray-600 mt-2">Código: {inspector.codigo}</p>
                </div>

                <Button onClick={handleContinue} className="w-full">
                  Continuar al formulario
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}