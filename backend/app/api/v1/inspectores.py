"""
Endpoints REST para gestión de inspectores.
"""
from uuid import UUID
from typing import Optional, List

from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.inspector import (
    InspectorCreate,
    InspectorUpdate,
    InspectorResponse,
    InspectorPublic,
    ValidarCodigoRequest,
)
from app.services import inspector_service


router = APIRouter(prefix="/inspectores", tags=["Inspectores"])


# ========================================
# Endpoints protegidos (solo admin)
# ========================================

@router.post(
    "",
    response_model=InspectorResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Crear un nuevo inspector",
)
def create_inspector(
    data: InspectorCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Crea un nuevo inspector con un código único."""
    return inspector_service.create_inspector(db, data)


@router.get(
    "",
    response_model=List[InspectorResponse],
    summary="Listar inspectores",
)
def list_inspectores(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    only_active: bool = Query(False, description="Solo inspectores activos"),
    search: Optional[str] = Query(None, description="Buscar por código o nombre"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Lista inspectores con filtros opcionales y paginación."""
    return inspector_service.list_inspectores(
        db,
        skip=skip,
        limit=limit,
        only_active=only_active,
        search=search,
    )


@router.get(
    "/{inspector_id}",
    response_model=InspectorResponse,
    summary="Ver detalles de un inspector",
)
def get_inspector(
    inspector_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Obtiene un inspector por su ID."""
    return inspector_service.get_inspector(db, inspector_id)


@router.patch(
    "/{inspector_id}",
    response_model=InspectorResponse,
    summary="Actualizar un inspector",
)
def update_inspector(
    inspector_id: UUID,
    data: InspectorUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Actualiza los campos enviados de un inspector."""
    return inspector_service.update_inspector(db, inspector_id, data)


@router.delete(
    "/{inspector_id}",
    response_model=InspectorResponse,
    summary="Desactivar un inspector",
)
def deactivate_inspector(
    inspector_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Desactiva un inspector (soft delete). El registro se conserva."""
    return inspector_service.deactivate_inspector(db, inspector_id)


# ========================================
# Endpoint público (usado por inspectores)
# ========================================

@router.post(
    "/validar-codigo",
    response_model=InspectorPublic,
    summary="Validar código de inspector",
    description="Endpoint público. Verifica si un código es válido y devuelve el inspector.",
)
def validar_codigo(
    data: ValidarCodigoRequest,
    db: Session = Depends(get_db),
):
    """Valida que un código exista y esté activo."""
    return inspector_service.validar_codigo(db, data.codigo)