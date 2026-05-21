"""
Lógica de negocio para inspectores.
"""
from uuid import UUID
from typing import Optional, List

from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from fastapi import HTTPException, status

from app.models.inspector import Inspector
from app.schemas.inspector import InspectorCreate, InspectorUpdate


def create_inspector(db: Session, data: InspectorCreate) -> Inspector:
    """Crea un nuevo inspector."""
    # Verificar que el código no exista
    existing = db.query(Inspector).filter(Inspector.codigo == data.codigo).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Ya existe un inspector con el código '{data.codigo}'",
        )

    inspector = Inspector(
        codigo=data.codigo,
        nombre_completo=data.nombre_completo,
        is_active=True,
    )
    db.add(inspector)
    try:
        db.commit()
        db.refresh(inspector)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Error de integridad: el código ya existe",
        )

    return inspector


def get_inspector(db: Session, inspector_id: UUID) -> Inspector:
    """Obtiene un inspector por ID, o lanza 404."""
    inspector = db.query(Inspector).filter(Inspector.id == inspector_id).first()
    if not inspector:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inspector no encontrado",
        )
    return inspector


def list_inspectores(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    only_active: bool = False,
    search: Optional[str] = None,
) -> List[Inspector]:
    """Lista inspectores con filtros opcionales."""
    query = db.query(Inspector)

    if only_active:
        query = query.filter(Inspector.is_active == True)  # noqa: E712

    if search:
        # Búsqueda case-insensitive en código o nombre
        from sqlalchemy import or_
        like_pattern = f"%{search}%"
        query = query.filter(
            or_(
                Inspector.codigo.ilike(like_pattern),
                Inspector.nombre_completo.ilike(like_pattern),
            )
        )

    return query.order_by(Inspector.created_at.desc()).offset(skip).limit(limit).all()


def update_inspector(
    db: Session,
    inspector_id: UUID,
    data: InspectorUpdate,
) -> Inspector:
    """Actualiza un inspector. Solo cambia los campos enviados."""
    inspector = get_inspector(db, inspector_id)

    update_data = data.model_dump(exclude_unset=True)

    # Si se cambia el código, verificar que no choque con otro
    if "codigo" in update_data and update_data["codigo"] != inspector.codigo:
        existing = db.query(Inspector).filter(
            Inspector.codigo == update_data["codigo"]
        ).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Ya existe un inspector con el código '{update_data['codigo']}'",
            )

    for key, value in update_data.items():
        setattr(inspector, key, value)

    db.commit()
    db.refresh(inspector)
    return inspector


def deactivate_inspector(db: Session, inspector_id: UUID) -> Inspector:
    """Desactiva un inspector (soft delete)."""
    inspector = get_inspector(db, inspector_id)
    inspector.is_active = False
    db.commit()
    db.refresh(inspector)
    return inspector


def validar_codigo(db: Session, codigo: str) -> Inspector:
    """
    Valida que un código exista y esté activo.
    Devuelve el inspector si es válido, lanza 401/404 si no.
    """
    inspector = db.query(Inspector).filter(Inspector.codigo == codigo).first()

    if not inspector:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Código de inspector no válido",
        )

    if not inspector.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Este código ha sido desactivado. Contacta al administrador.",
        )

    return inspector