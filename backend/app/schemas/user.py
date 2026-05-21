"""
Esquemas Pydantic para usuarios (admins).
"""
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class UserBase(BaseModel):
    """Campos base compartidos."""
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=255)


class UserCreate(UserBase):
    """Datos para crear un usuario (con password en texto plano)."""
    password: str = Field(..., min_length=8, max_length=100)
    role: str = "admin"


class UserResponse(UserBase):
    """Datos que devuelve la API (sin password ni hash)."""
    id: UUID
    role: str
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)