import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema PAE Puerto Gaitán
          </h1>
          <p className="text-lg text-gray-600">
            Sistema de inspección y generación de planillas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="w-12 h-12 text-blue-600 mb-2" />
              <CardTitle>RI - Ración Industrializada</CardTitle>
              <CardDescription>
                Formulario de seguimiento para ración industrializada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/inspector/code?tipo=RI">
                <Button className="w-full">Llenar planilla RI</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="w-12 h-12 text-blue-600 mb-2" />
              <CardTitle>CCT - Complementos</CardTitle>
              <CardDescription>
                Formulario de complementos alimentarios calientes transportados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/inspector/code?tipo=CCT">
                <Button className="w-full">Llenar planilla CCT</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow opacity-50">
            <CardHeader>
              <FileText className="w-12 h-12 text-gray-400 mb-2" />
              <CardTitle>RPS - Preparados en sitio</CardTitle>
              <CardDescription>
                Formulario de alimentos preparados en sitio (Próximamente)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled>Próximamente</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}