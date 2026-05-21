"""
Esquemas Pydantic para autenticación.
"""
from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    """Datos que envía el cliente para iniciar sesión."""
    email: EmailStr
    password: str = Field(..., min_length=8)


class TokenResponse(BaseModel):
    """Respuesta del backend con el token JWT."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int  # segundos