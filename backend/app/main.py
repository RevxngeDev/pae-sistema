"""
Punto de entrada del backend FastAPI.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings


app = FastAPI(
    title="PAE Puerto Gaitán API",
    description="API para el sistema de seguimiento del Programa de Alimentación Escolar",
    version="0.1.0",
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Registrar todos los routers de la API
app.include_router(api_router)


@app.get("/")
def root():
    return {
        "app": "PAE Puerto Gaitán API",
        "version": "0.1.0",
        "environment": settings.ENVIRONMENT,
        "status": "ok",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}