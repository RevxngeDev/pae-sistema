"""
Router principal que agrupa todos los endpoints de la v1 de la API.
"""
from fastapi import APIRouter

from app.api.v1 import auth

from app.api.v1 import auth, inspectores


api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth.router)
api_router.include_router(inspectores.router)