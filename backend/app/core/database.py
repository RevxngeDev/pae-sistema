"""
Configuración de SQLAlchemy.
Provee la conexión a la base de datos y la sesión.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from app.core.config import settings


# Engine: la conexión a PostgreSQL
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # Verifica la conexión antes de usarla
    echo=settings.DEBUG,  # Imprime las queries SQL en modo debug
)

# Factory de sesiones (cada request creará una sesión)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base que heredarán todos los modelos
Base = declarative_base()


# Dependency para FastAPI: obtener una sesión por cada request
def get_db():
    """
    Dependency que provee una sesión de BD por cada request.
    Se asegura de cerrar la sesión al terminar.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()