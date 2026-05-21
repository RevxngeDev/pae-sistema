"""
Configuración global del backend.
Carga variables de entorno desde el archivo .env
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Base de datos
    DATABASE_URL: str

    # Seguridad
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Entorno
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Configuración de cómo cargar el .env
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )


# Instancia única que usaremos en todo el proyecto
settings = Settings()