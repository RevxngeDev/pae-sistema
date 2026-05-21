"""
Modelo de inspectores (personas que llenan las planillas en campo).
"""
import uuid
from sqlalchemy import Column, String, Boolean, DateTime, func
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base


class Inspector(Base):
    __tablename__ = "inspectores"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    codigo = Column(String(20), unique=True, nullable=False, index=True)
    nombre_completo = Column(String(255), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    def __repr__(self):
        return f"<Inspector(codigo={self.codigo}, nombre={self.nombre_completo})>"