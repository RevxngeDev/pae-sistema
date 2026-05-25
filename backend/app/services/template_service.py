"""
Business logic for templates (generated forms).
"""
from uuid import UUID
from datetime import datetime
from typing import Optional
from io import BytesIO

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.template import Template
from app.models.inspector import Inspector
from app.schemas.template import TemplateRICreate
from app.services.excel_generator import RIGenerator


def create_ri_template(
    db: Session,
    inspector_id: UUID,
    data: TemplateRICreate,
) -> tuple[Template, BytesIO]:
    """
    Create a new RI template.
    
    Returns:
        tuple: (Template model instance, Excel file as BytesIO)
    """
    # Verify inspector exists and is active
    inspector = db.query(Inspector).filter(
        Inspector.id == inspector_id,
        Inspector.is_active == True  # noqa: E712
    ).first()
    
    if not inspector:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inspector not found or inactive",
        )
    
    # Generate Excel file
    generator = RIGenerator()
    form_data = data.model_dump()
    excel_bytes = generator.generate(form_data)
    
    # Extract key fields for search
    educational_site = form_data.get("info_general", {}).get("sede_educativa")
    visit_date_str = form_data.get("info_general", {}).get("fecha_visita")
    visit_date = None
    if visit_date_str:
        try:
            visit_date = datetime.strptime(visit_date_str, "%Y-%m-%d").date()
        except (ValueError, TypeError):
            pass
    
    # Generate file name
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_name = f"RI_{inspector.codigo}_{timestamp}.xlsx"
    
    # Create database record
    template = Template(
        template_type="RI",
        inspector_id=inspector_id,
        form_data=form_data,
        file_name=file_name,
        status="pending",
        educational_site=educational_site,
        visit_date=visit_date,
    )
    
    db.add(template)
    db.commit()
    db.refresh(template)
    
    return template, excel_bytes


def get_template(db: Session, template_id: UUID) -> Template:
    """Get a template by ID."""
    template = db.query(Template).filter(Template.id == template_id).first()
    if not template:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Template not found",
        )
    return template


def list_templates(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    template_type: Optional[str] = None,
    status: Optional[str] = None,
    inspector_id: Optional[UUID] = None,
):
    """List templates with optional filters."""
    query = db.query(Template)
    
    if template_type:
        query = query.filter(Template.template_type == template_type)
    
    if status:
        query = query.filter(Template.status == status)
    
    if inspector_id:
        query = query.filter(Template.inspector_id == inspector_id)
    
    return query.order_by(Template.created_at.desc()).offset(skip).limit(limit).all()

def create_cct_template(
    db: Session,
    inspector_id: UUID,
    data,
) -> tuple:
    """
    Create a new CCT template.
    
    Returns:
        tuple: (Template model instance, Excel file as BytesIO)
    """
    from app.services.excel_generator import CCTGenerator
    
    # Verify inspector exists and is active
    inspector = db.query(Inspector).filter(
        Inspector.id == inspector_id,
        Inspector.is_active == True  # noqa: E712
    ).first()
    
    if not inspector:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inspector not found or inactive",
        )
    
    # Generate Excel file
    generator = CCTGenerator()
    form_data = data.model_dump()
    excel_bytes = generator.generate(form_data)
    
    # Extract key fields for search
    educational_site = form_data.get("info_general", {}).get("sede_educativa")
    visit_date_str = form_data.get("info_general", {}).get("fecha_visita")
    visit_date = None
    if visit_date_str:
        try:
            visit_date = datetime.strptime(visit_date_str, "%Y-%m-%d").date()
        except (ValueError, TypeError):
            pass
    
    # Generate file name
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_name = f"CCT_{inspector.codigo}_{timestamp}.xlsx"
    
    # Create database record
    template = Template(
        template_type="CCT",
        inspector_id=inspector_id,
        form_data=form_data,
        file_name=file_name,
        status="pending",
        educational_site=educational_site,
        visit_date=visit_date,
    )
    
    db.add(template)
    db.commit()
    db.refresh(template)
    
    return template, excel_bytes

def create_rps_template(
    db: Session,
    inspector_id: UUID,
    data,
) -> tuple:
    """
    Create a new RPS template.
    
    Returns:
        tuple: (Template model instance, Excel file as BytesIO)
    """
    from app.services.excel_generator import RPSGenerator
    
    # Verify inspector exists and is active
    inspector = db.query(Inspector).filter(
        Inspector.id == inspector_id,
        Inspector.is_active == True  # noqa: E712
    ).first()
    
    if not inspector:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inspector not found or inactive",
        )
    
    # Generate Excel file
    generator = RPSGenerator()
    form_data = data.model_dump()
    excel_bytes = generator.generate(form_data)
    
    # Extract key fields for search
    educational_site = form_data.get("info_general", {}).get("sede_educativa")
    visit_date_str = form_data.get("info_general", {}).get("fecha_visita")
    visit_date = None
    if visit_date_str:
        try:
            visit_date = datetime.strptime(visit_date_str, "%Y-%m-%d").date()
        except (ValueError, TypeError):
            pass
    
    # Generate file name
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_name = f"RPS_{inspector.codigo}_{timestamp}.xlsx"
    
    # Create database record
    template = Template(
        template_type="RPS",
        inspector_id=inspector_id,
        form_data=form_data,
        file_name=file_name,
        status="pending",
        educational_site=educational_site,
        visit_date=visit_date,
    )
    
    db.add(template)
    db.commit()
    db.refresh(template)
    
    return template, excel_bytes