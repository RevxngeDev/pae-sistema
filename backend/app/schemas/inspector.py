"""
Esquemas Pydantic para inspectores.
"""
from datetime import datetime
from uuid import UUID
from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


# ========================================
# Esquemas de entrada (lo que recibe la API)
# ========================================

class InspectorCreate(BaseModel):
    """Datos para crear un inspector."""
    codigo: str = Field(..., min_length=3, max_length=20, examples=["INSP-001"])
    nombre_completo: str = Field(..., min_length=2, max_length=255)


class InspectorUpdate(BaseModel):
    """Datos para actualizar un inspector (campos opcionales)."""
    codigo: Optional[str] = Field(None, min_length=3, max_length=20)
    nombre_completo: Optional[str] = Field(None, min_length=2, max_length=255)
    is_active: Optional[bool] = None


class ValidarCodigoRequest(BaseModel):
    """Body para validar el código del inspector (endpoint público)."""
    codigo: str = Field(..., min_length=3, max_length=20)


# ========================================
# Esquemas de salida (lo que devuelve la API)
# ========================================

class InspectorResponse(BaseModel):
    """Datos completos de un inspector (vista admin)."""
    id: UUID
    codigo: str
    nombre_completo: str
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class InspectorPublic(BaseModel):
    """Datos públicos del inspector (sin info sensible, para el flujo del inspector)."""
    id: UUID
    codigo: str
    nombre_completo: str

    model_config = ConfigDict(from_attributes=True)