# Sistema de Seguimiento PAE — Puerto Gaitán

Sistema web para la generación automatizada de planillas de seguimiento del Programa de Alimentación Escolar (PAE) del Municipio de Puerto Gaitán, Meta.

## 🎯 Funcionalidad

- **Inspector**: ingresa su código → selecciona tipo de planilla → llena formulario → el sistema genera el Excel y lo envía al admin.
- **Admin**: revisa plantillas, aprueba/rechaza, descarga archivos, gestiona inspectores e historial.

## 🏗️ Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind + shadcn/ui
- **Backend**: FastAPI + SQLAlchemy + openpyxl
- **Base de datos**: PostgreSQL (Supabase en producción)
- **Almacenamiento**: Supabase Storage
- **Deploy**: Vercel + Railway

## 📁 Estructura