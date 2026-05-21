"""
Modelo de plantillas (planillas generadas por inspectores).
"""
import uuid
from sqlalchemy import Column, String, Date, DateTime, Text, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship

from app.core.database import Base


class Plantilla(Base):
    __tablename__ = "plantillas"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    # Tipo de planilla: RI, CCT o RPS
    tipo = Column(String(10), nullable=False, index=True)

    # Inspector que la creó
    inspector_id = Column(
        UUID(as_uuid=True),
        ForeignKey("inspectores.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    # Datos del formulario (estructura flexible)
    form_data = Column(JSONB, nullable=False)

    # Archivo Excel generado
    archivo_url = Column(String(500), nullable=True)
    archivo_nombre = Column(String(255), nullable=True)

    # Estado de revisión
    status = Column(
        String(20),
        nullable=False,
        default="pendiente",
        index=True,
    )

    # Campos extraídos para facilitar búsqueda
    sede_educativa = Column(String(255), nullable=True, index=True)
    fecha_visita = Column(Date, nullable=True, index=True)

    # Revisión por parte del admin
    admin_notes = Column(Text, nullable=True)
    reviewed_by = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )
    reviewed_at = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
        index=True,
    )

    # Relaciones (para acceder al inspector y al admin revisor desde Python)
    inspector = relationship("Inspector", backref="plantillas")
    reviewer = relationship("User", backref="reviewed_plantillas")

    def __repr__(self):
        return f"<Plantilla(tipo={self.tipo}, status={self.status})>"