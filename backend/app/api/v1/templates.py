"""
REST endpoints for template management.
"""
from uuid import UUID
from typing import Optional

from fastapi import APIRouter, Depends, status, Query, Response, UploadFile, File, Form, HTTPException
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
)
async def generate_ri_template_public(
    inspector_code: str = Query(..., description="Inspector's unique code"),
    form_data: str = Form(...),
    fotos_general_meta: str = Form("{}"),
    fotos_hallazgos_meta: str = Form("{}"),
    # General photos (12)
    foto_general_1: UploadFile = File(None),
    foto_general_2: UploadFile = File(None),
    foto_general_3: UploadFile = File(None),
    foto_general_4: UploadFile = File(None),
    foto_general_5: UploadFile = File(None),
    foto_general_6: UploadFile = File(None),
    foto_general_7: UploadFile = File(None),
    foto_general_8: UploadFile = File(None),
    foto_general_9: UploadFile = File(None),
    foto_general_10: UploadFile = File(None),
    foto_general_11: UploadFile = File(None),
    foto_general_12: UploadFile = File(None),
    # Findings photos (12)
    foto_hallazgos_1: UploadFile = File(None),
    foto_hallazgos_2: UploadFile = File(None),
    foto_hallazgos_3: UploadFile = File(None),
    foto_hallazgos_4: UploadFile = File(None),
    foto_hallazgos_5: UploadFile = File(None),
    foto_hallazgos_6: UploadFile = File(None),
    foto_hallazgos_7: UploadFile = File(None),
    foto_hallazgos_8: UploadFile = File(None),
    foto_hallazgos_9: UploadFile = File(None),
    foto_hallazgos_10: UploadFile = File(None),
    foto_hallazgos_11: UploadFile = File(None),
    foto_hallazgos_12: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    """
    Generate an RI template using inspector code (no auth required).
    Accepts up to 12 photos per sheet.
    """
    import json
    import tempfile
    from pathlib import Path
    from app.services.inspector_service import validar_codigo
    
    # Validate inspector code
    inspector = validar_codigo(db, inspector_code)
    
    # Parse JSON data
    try:
        regular_data = json.loads(form_data)
        photos_general_data = json.loads(fotos_general_meta)
        photos_hallazgos_data = json.loads(fotos_hallazgos_meta)
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid JSON data: {str(e)}"
        )
    
    temp_files = []
    
    async def save_temp_photo(upload_file: UploadFile):
        """Save uploaded file to temp location and return path."""
        if not upload_file or not upload_file.filename:
            return None
        
        suffix = Path(upload_file.filename).suffix or '.jpg'
        temp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        content = await upload_file.read()
        temp.write(content)
        temp.close()
        
        temp_files.append(temp.name)
        return temp.name
    
    # Save all 24 photos (12 general + 12 findings)
    general_photos = [
        foto_general_1, foto_general_2, foto_general_3, foto_general_4,
        foto_general_5, foto_general_6, foto_general_7, foto_general_8,
        foto_general_9, foto_general_10, foto_general_11, foto_general_12,
    ]
    
    hallazgos_photos = [
        foto_hallazgos_1, foto_hallazgos_2, foto_hallazgos_3, foto_hallazgos_4,
        foto_hallazgos_5, foto_hallazgos_6, foto_hallazgos_7, foto_hallazgos_8,
        foto_hallazgos_9, foto_hallazgos_10, foto_hallazgos_11, foto_hallazgos_12,
    ]
    
    # Save general photos
    for idx, photo in enumerate(general_photos, 1):
        photos_general_data[f"foto_{idx}"] = await save_temp_photo(photo)
    
    # Save findings photos
    for idx, photo in enumerate(hallazgos_photos, 1):
        photos_hallazgos_data[f"foto_{idx}"] = await save_temp_photo(photo)
    
    # Combine all data
    regular_data["fotos_general"] = photos_general_data
    regular_data["fotos_hallazgos"] = photos_hallazgos_data
    
    try:
        from app.schemas.template import TemplateRICreate
        template_data = TemplateRICreate(**regular_data)
        
        template, excel_bytes = template_service.create_ri_template(
            db, inspector.id, template_data
        )
        
        headers = {
            "Content-Disposition": f"attachment; filename={template.file_name}"
        }
        
        return Response(
            content=excel_bytes.getvalue(),
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers=headers,
        )
    
    finally:
        # Clean up temp files
        for temp_path in temp_files:
            try:
                Path(temp_path).unlink(missing_ok=True)
            except Exception:
                pass

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

@router.post(
    "/generate-cct",
    status_code=status.HTTP_201_CREATED,
    summary="Generate CCT template (protected, for admin/testing)",
)
def generate_cct_template(
    data: dict,  # We use dict to receive the JSON freely
    inspector_id: UUID = Query(..., description="Inspector ID"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Generate a CCT template (admin/testing endpoint with auth).
    """
    from app.schemas.template import TemplateCCTCreate
    
    template_data = TemplateCCTCreate(**data)
    template, excel_bytes = template_service.create_cct_template(
        db, inspector_id, template_data
    )
    
    headers = {
        "Content-Disposition": f"attachment; filename={template.file_name}"
    }
    
    return Response(
        content=excel_bytes.getvalue(),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers=headers,
    )


@router.post(
    "/generate-cct-public",
    status_code=status.HTTP_201_CREATED,
    summary="Generate CCT template (public endpoint for inspectors)",
)
async def generate_cct_template_public(
    inspector_code: str = Query(..., description="Inspector's unique code"),
    form_data: str = Form(...),
    fotos_general_meta: str = Form("{}"),
    fotos_hallazgos_meta: str = Form("{}"),
    # General photos (12)
    foto_general_1: UploadFile | None = File(None),
    foto_general_2: UploadFile | None = File(None),
    foto_general_3: UploadFile | None = File(None),
    foto_general_4: UploadFile | None = File(None),
    foto_general_5: UploadFile | None = File(None),
    foto_general_6: UploadFile | None = File(None),
    foto_general_7: UploadFile | None = File(None),
    foto_general_8: UploadFile | None = File(None),
    foto_general_9: UploadFile | None = File(None),
    foto_general_10: UploadFile | None = File(None),
    foto_general_11: UploadFile | None = File(None),
    foto_general_12: UploadFile | None = File(None),
    # Findings photos (12)
    foto_hallazgos_1: UploadFile | None = File(None),
    foto_hallazgos_2: UploadFile | None = File(None),
    foto_hallazgos_3: UploadFile | None = File(None),
    foto_hallazgos_4: UploadFile | None = File(None),
    foto_hallazgos_5: UploadFile | None = File(None),
    foto_hallazgos_6: UploadFile | None = File(None),
    foto_hallazgos_7: UploadFile | None = File(None),
    foto_hallazgos_8: UploadFile | None = File(None),
    foto_hallazgos_9: UploadFile | None = File(None),
    foto_hallazgos_10: UploadFile | None = File(None),
    foto_hallazgos_11: UploadFile | None = File(None),
    foto_hallazgos_12: UploadFile | None = File(None),
    db: Session = Depends(get_db),
):
    """
    Generate a CCT template using inspector code (no auth required).
    Accepts up to 12 photos per sheet.
    """
    import json
    import tempfile
    from pathlib import Path
    from app.services.inspector_service import validar_codigo
    from app.schemas.template import TemplateCCTCreate
    
    # Validate inspector code
    inspector = validar_codigo(db, inspector_code)
    
    # Parse JSON data
    try:
        regular_data = json.loads(form_data)
        photos_general_data = json.loads(fotos_general_meta)
        photos_hallazgos_data = json.loads(fotos_hallazgos_meta)
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid JSON data: {str(e)}"
        )
    
    temp_files = []
    
    async def save_temp_photo(upload_file: UploadFile):
        """Save uploaded file to temp location and return path."""
        if not upload_file or not upload_file.filename:
            return None
        
        suffix = Path(upload_file.filename).suffix or '.jpg'
        temp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        content = await upload_file.read()
        temp.write(content)
        temp.close()
        
        temp_files.append(temp.name)
        return temp.name
    
    # Save all 24 photos
    general_photos = [
        foto_general_1, foto_general_2, foto_general_3, foto_general_4,
        foto_general_5, foto_general_6, foto_general_7, foto_general_8,
        foto_general_9, foto_general_10, foto_general_11, foto_general_12,
    ]
    
    hallazgos_photos = [
        foto_hallazgos_1, foto_hallazgos_2, foto_hallazgos_3, foto_hallazgos_4,
        foto_hallazgos_5, foto_hallazgos_6, foto_hallazgos_7, foto_hallazgos_8,
        foto_hallazgos_9, foto_hallazgos_10, foto_hallazgos_11, foto_hallazgos_12,
    ]
    
    for idx, photo in enumerate(general_photos, 1):
        photos_general_data[f"foto_{idx}"] = await save_temp_photo(photo)
    
    for idx, photo in enumerate(hallazgos_photos, 1):
        photos_hallazgos_data[f"foto_{idx}"] = await save_temp_photo(photo)
    
    # Combine all data
    regular_data["fotos_general"] = photos_general_data
    regular_data["fotos_hallazgos"] = photos_hallazgos_data
    
    try:
        template_data = TemplateCCTCreate(**regular_data)
        template, excel_bytes = template_service.create_cct_template(
            db, inspector.id, template_data
        )
        
        headers = {
            "Content-Disposition": f"attachment; filename={template.file_name}"
        }
        
        return Response(
            content=excel_bytes.getvalue(),
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers=headers,
        )
    
    finally:
        # Clean up temp files
        for temp_path in temp_files:
            try:
                Path(temp_path).unlink(missing_ok=True)
            except Exception:
                pass
            
@router.post(
    "/generate-rps",
    status_code=status.HTTP_201_CREATED,
    summary="Generate RPS template (protected, for admin/testing)",
)
def generate_rps_template(
    data: dict,
    inspector_id: UUID = Query(..., description="Inspector ID"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Generate an RPS template (admin/testing endpoint with auth).
    """
    from app.schemas.template import TemplateRPSCreate
    
    template_data = TemplateRPSCreate(**data)
    template, excel_bytes = template_service.create_rps_template(
        db, inspector_id, template_data
    )
    
    headers = {
        "Content-Disposition": f"attachment; filename={template.file_name}"
    }
    
    return Response(
        content=excel_bytes.getvalue(),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers=headers,
    )


@router.post(
    "/generate-rps-public",
    status_code=status.HTTP_201_CREATED,
    summary="Generate RPS template (public endpoint for inspectors)",
)
async def generate_rps_template_public(
    inspector_code: str = Query(..., description="Inspector's unique code"),
    form_data: str = Form(...),
    fotos_general_meta: str = Form("{}"),
    fotos_hallazgos_meta: str = Form("{}"),
    # General photos (12)
    foto_general_1: UploadFile | None = File(None),
    foto_general_2: UploadFile | None = File(None),
    foto_general_3: UploadFile | None = File(None),
    foto_general_4: UploadFile | None = File(None),
    foto_general_5: UploadFile | None = File(None),
    foto_general_6: UploadFile | None = File(None),
    foto_general_7: UploadFile | None = File(None),
    foto_general_8: UploadFile | None = File(None),
    foto_general_9: UploadFile | None = File(None),
    foto_general_10: UploadFile | None = File(None),
    foto_general_11: UploadFile | None = File(None),
    foto_general_12: UploadFile | None = File(None),
    # Findings photos (12)
    foto_hallazgos_1: UploadFile | None = File(None),
    foto_hallazgos_2: UploadFile | None = File(None),
    foto_hallazgos_3: UploadFile | None = File(None),
    foto_hallazgos_4: UploadFile | None = File(None),
    foto_hallazgos_5: UploadFile | None = File(None),
    foto_hallazgos_6: UploadFile | None = File(None),
    foto_hallazgos_7: UploadFile | None = File(None),
    foto_hallazgos_8: UploadFile | None = File(None),
    foto_hallazgos_9: UploadFile | None = File(None),
    foto_hallazgos_10: UploadFile | None = File(None),
    foto_hallazgos_11: UploadFile | None = File(None),
    foto_hallazgos_12: UploadFile | None = File(None),
    db: Session = Depends(get_db),
):
    """
    Generate an RPS template using inspector code (no auth required).
    Accepts up to 12 photos per sheet.
    """
    import json
    import tempfile
    from pathlib import Path
    from app.services.inspector_service import validar_codigo
    from app.schemas.template import TemplateRPSCreate
    
    # Validate inspector code
    inspector = validar_codigo(db, inspector_code)
    
    # Parse JSON data
    try:
        regular_data = json.loads(form_data)
        photos_general_data = json.loads(fotos_general_meta)
        photos_hallazgos_data = json.loads(fotos_hallazgos_meta)
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid JSON data: {str(e)}"
        )
    
    temp_files = []
    
    async def save_temp_photo(upload_file: UploadFile):
        """Save uploaded file to temp location and return path."""
        if not upload_file or not upload_file.filename:
            return None
        
        suffix = Path(upload_file.filename).suffix or '.jpg'
        temp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        content = await upload_file.read()
        temp.write(content)
        temp.close()
        
        temp_files.append(temp.name)
        return temp.name
    
    # Save all 24 photos
    general_photos = [
        foto_general_1, foto_general_2, foto_general_3, foto_general_4,
        foto_general_5, foto_general_6, foto_general_7, foto_general_8,
        foto_general_9, foto_general_10, foto_general_11, foto_general_12,
    ]
    
    hallazgos_photos = [
        foto_hallazgos_1, foto_hallazgos_2, foto_hallazgos_3, foto_hallazgos_4,
        foto_hallazgos_5, foto_hallazgos_6, foto_hallazgos_7, foto_hallazgos_8,
        foto_hallazgos_9, foto_hallazgos_10, foto_hallazgos_11, foto_hallazgos_12,
    ]
    
    for idx, photo in enumerate(general_photos, 1):
        photos_general_data[f"foto_{idx}"] = await save_temp_photo(photo)
    
    for idx, photo in enumerate(hallazgos_photos, 1):
        photos_hallazgos_data[f"foto_{idx}"] = await save_temp_photo(photo)
    
    # Combine all data
    regular_data["fotos_general"] = photos_general_data
    regular_data["fotos_hallazgos"] = photos_hallazgos_data
    
    try:
        template_data = TemplateRPSCreate(**regular_data)
        template, excel_bytes = template_service.create_rps_template(
            db, inspector.id, template_data
        )
        
        headers = {
            "Content-Disposition": f"attachment; filename={template.file_name}"
        }
        
        return Response(
            content=excel_bytes.getvalue(),
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers=headers,
        )
    
    finally:
        # Clean up temp files
        for temp_path in temp_files:
            try:
                Path(temp_path).unlink(missing_ok=True)
            except Exception:
                pass            