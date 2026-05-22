'use client';

import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SuccessDialogProps {
  filename: string;
  onClose: () => void;
  onNewForm: () => void;
}

export function SuccessDialog({ filename, onClose, onNewForm }: SuccessDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ¡Planilla generada con éxito!
              </h3>
              <p className="text-gray-600 text-sm">
                Tu planilla ha sido guardada y descargada como:
              </p>
              <p className="font-mono text-sm bg-gray-100 rounded px-2 py-1 mt-2 break-all">
                {filename}
              </p>
            </div>

            <div className="flex gap-3 w-full pt-2">
              <Button 
                onClick={onClose} 
                variant="outline" 
                className="flex-1"
              >
                Cerrar
              </Button>
              <Button 
                onClick={onNewForm}
                className="flex-1"
              >
                Nueva planilla
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}