"""
Endpoints de autenticación.
"""
from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.security import verify_password, create_access_token
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse


router = APIRouter(prefix="/auth", tags=["Autenticación"])


@router.post("/login", response_model=TokenResponse)
def login_json(
    credentials: LoginRequest,
    db: Session = Depends(get_db),
):
    """
    Login con JSON (para el frontend).
    Recibe email y password, devuelve un token JWT.
    """
    return _authenticate_and_token(db, credentials.email, credentials.password)


@router.post("/login/oauth", response_model=TokenResponse, include_in_schema=True)
def login_oauth(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    Login compatible con el estándar OAuth2 (form-data).
    Usa este endpoint si quieres autenticarte desde el botón Authorize de Swagger.
    El campo 'username' debe ser el email.
    """
    return _authenticate_and_token(db, form_data.username, form_data.password)


def _authenticate_and_token(db: Session, email: str, password: str) -> TokenResponse:
    """Lógica compartida: valida credenciales y genera token."""
    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cuenta desactivada",
        )

    expires_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=expires_delta,
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )