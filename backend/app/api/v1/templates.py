"""
REST endpoints for template management.
"""
from uuid import UUID
from typing import Optional

from fastapi import APIRouter, Depends, status, Query, Response
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.template import (
    TemplateRICreate,
    TemplateCreateResponse,
    TemplateResponse,
    TemplateListItem,
)
from app.services import template_service


router = APIRouter(prefix="/templates", tags=["Templates"])


@router.post(
    "/generate-ri",
    response_model=TemplateCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate RI template",
)
def generate_ri_template(
    data: TemplateRICreate,
    inspector_id: UUID = Query(..., description="Inspector ID who filled the form"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Generate an RI (Ración Industrializada) template.
    Receives form data and returns the generated Excel file.
    """
    template, excel_bytes = template_service.create_ri_template(db, inspector_id, data)
    
    # Return Excel file for download
    headers = {
        "Content-Disposition": f"attachment; filename={template.file_name}"
    }
    
    return Response(
        content=excel_bytes.getvalue(),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers=headers,
    )

@router.post(
    "/generate-ri-public",
    status_code=status.HTTP_201_CREATED,
    summary="Generate RI template (public endpoint for inspectors)",
    description="Public endpoint. Inspector validates with code instead of JWT auth.",
)
def generate_ri_template_public(
    inspector_code: str = Query(..., description="Inspector's unique code"),
    data: TemplateRICreate = ...,
    db: Session = Depends(get_db),
):
    """
    Generate an RI template using inspector code (no auth required).
    This endpoint is used by inspectors in the field.
    """
    # Validate inspector code
    from app.services.inspector_service import validar_codigo
    
    try:
        inspector = validar_codigo(db, inspector_code)
    except HTTPException as e:
        raise e
    
    # Generate template
    template, excel_bytes = template_service.create_ri_template(
        db, 
        inspector.id, 
        data
    )
    
    # Return Excel file for download
    headers = {
        "Content-Disposition": f"attachment; filename={template.file_name}"
    }
    
    return Response(
        content=excel_bytes.getvalue(),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers=headers,
    )    


@router.get(
    "",
    response_model=list[TemplateListItem],
    summary="List templates",
)
def list_templates(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    template_type: Optional[str] = Query(None, description="Filter by type: RI, CCT, RPS"),
    status: Optional[str] = Query(None, description="Filter by status"),
    inspector_id: Optional[UUID] = Query(None, description="Filter by inspector"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List all templates with optional filters."""
    return template_service.list_templates(
        db,
        skip=skip,
        limit=limit,
        template_type=template_type,
        status=status,
        inspector_id=inspector_id,
    )


@router.get(
    "/{template_id}",
    response_model=TemplateResponse,
    summary="Get template details",
)
def get_template(
    template_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get details of a specific template."""
    return template_service.get_template(db, template_id)