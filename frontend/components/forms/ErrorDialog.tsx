'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorDialogProps {
  message: string;
  onClose: () => void;
}

export function ErrorDialog({ message, onClose }: ErrorDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-red-100 rounded-full p-3">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Error al generar la planilla
              </h3>
              <p className="text-gray-600 text-sm">
                {message}
              </p>
            </div>

            <Button onClick={onClose} className="w-full">
              Cerrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}