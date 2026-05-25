"""
Pydantic schemas for templates (generated forms).
"""
from datetime import date, datetime
from uuid import UUID
from typing import Optional, List, Dict, Any

from pydantic import BaseModel, Field, ConfigDict


# ========================================
# Input schemas (what API receives)
# ========================================

class TemplateRICreate(BaseModel):
    """Data to generate an RI template."""
    
    # General info (sheet 1)
    info_general: Dict[str, Any] = Field(..., description="General info from sheet 1")
    visita: Dict[str, Any] = Field(..., description="Visit type selection")
    menu: Dict[str, Any] = Field(..., description="Menu information")
    calificaciones: Dict[str, Any] = Field(..., description="Quality ratings")
    observaciones: Dict[str, Any] = Field(..., description="Observations")
    firmas: Dict[str, Any] = Field(..., description="Signatures")
    
    # Dispatch info (sheet 2)
    info_general_despacho: Dict[str, Any] = Field(..., description="Dispatch general info")
    calificaciones_despacho: Dict[str, Any] = Field(..., description="Dispatch ratings")
    componentes: Dict[str, Any] = Field(..., description="Food components table")
    observaciones_despacho: Dict[str, Any] = Field(..., description="Dispatch observations")
    firmas_despacho: Dict[str, Any] = Field(..., description="Dispatch signatures")
    
    # Verification info (sheet 3)
    info_general_verificacion: Dict[str, Any] = Field(..., description="Verification general info")
    productos: Dict[str, Any] = Field(..., description="Products verification table")
    observaciones_verificacion: Dict[str, Any] = Field(..., description="Verification observations")
    firmas_verificacion: Dict[str, Any] = Field(..., description="Verification signatures")
    
    # Labeling info (sheet 4)
    info_general_rotulado: Dict[str, Any] = Field(..., description="Labeling general info")
    productos_res5109: Dict[str, Any] = Field(..., description="Products table Res 5109")
    productos_res333: Dict[str, Any] = Field(..., description="Products table Res 333")
    observaciones_rotulado: Dict[str, Any] = Field(..., description="Labeling observations")
    firmas_rotulado: Dict[str, Any] = Field(..., description="Labeling signatures")
    
    # Photos (sheets 5-6) - optional for now
    fotos_general: Optional[Dict[str, Any]] = Field(None, description="General photos")
    fotos_hallazgos: Optional[Dict[str, Any]] = Field(None, description="Findings photos")


# ========================================
# Output schemas (what API returns)
# ========================================

class TemplateResponse(BaseModel):
    """Complete template data (admin view)."""
    id: UUID
    template_type: str
    inspector_id: UUID
    status: str
    educational_site: Optional[str]
    visit_date: Optional[date]
    file_url: Optional[str]
    file_name: Optional[str]
    admin_notes: Optional[str]
    reviewed_by: Optional[UUID]
    reviewed_at: Optional[datetime]
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class TemplateCreateResponse(BaseModel):
    """Response after creating a template."""
    id: UUID
    template_type: str
    status: str
    file_name: str
    message: str
    download_url: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)


class TemplateListItem(BaseModel):
    """Simplified template for listings."""
    id: UUID
    template_type: str
    educational_site: Optional[str]
    visit_date: Optional[date]
    status: str
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
    
# ========================================
# CCT schemas
# ========================================

class TemplateCCTCreate(BaseModel):
    """Data to generate a CCT template."""
    
    # Sheet 1: TEMP - ORG
    info_general: Dict[str, Any] = Field(..., description="General info sheet 1")
    preparaciones: Dict[str, Any] = Field(..., description="Preparations table")
    indicador: Dict[str, Any] = Field(default_factory=dict, description="Compliance indicator")
    observaciones: Dict[str, Any] = Field(default_factory=dict, description="Observations")
    firmas: Dict[str, Any] = Field(..., description="Signatures")
    
    # Sheet 2: TRANS Y DISTRIB
    info_general_trans: Dict[str, Any] = Field(..., description="Transport general info")
    menu_trans: Dict[str, Any] = Field(default_factory=dict, description="Menu description")
    info_ruta: Dict[str, Any] = Field(default_factory=dict, description="Route info")
    distribucion: Dict[str, Any] = Field(default_factory=dict, description="Distribution table")
    calif_personal_manipulador: Dict[str, Any] = Field(default_factory=dict, description="Personal ratings")
    calif_vehiculos: Dict[str, Any] = Field(default_factory=dict, description="Vehicle ratings")
    calif_entrega: Dict[str, Any] = Field(default_factory=dict, description="Delivery ratings")
    calif_consumo: Dict[str, Any] = Field(default_factory=dict, description="Consumption ratings")
    observaciones_generales_trans: Dict[str, Any] = Field(default_factory=dict, description="General observations")
    firmas_trans: Dict[str, Any] = Field(..., description="Transport signatures")
    
    # Sheet 3: REQUERIMIENTOS ALIM Y NUTR
    info_general_req: Dict[str, Any] = Field(..., description="Requirements general info")
    menu_req: Dict[str, Any] = Field(default_factory=dict, description="Menu description")
    intercambios_req: Dict[str, Any] = Field(default_factory=dict, description="Food exchanges")
    calificaciones_req: Dict[str, Any] = Field(default_factory=dict, description="Quality ratings")
    observaciones_req: Dict[str, Any] = Field(default_factory=dict, description="Observations")
    firmas_req: Dict[str, Any] = Field(..., description="Requirements signatures")
    
    # Sheet 4: GRAMAJES
    info_general_gramajes: Dict[str, Any] = Field(..., description="Gramajes general info")
    instrumento: Dict[str, Any] = Field(default_factory=dict, description="Measurement instrument")
    intercambios_gramajes: Dict[str, Any] = Field(default_factory=dict, description="Exchange info")
    alimentos_programados: Dict[str, Any] = Field(default_factory=dict, description="Programmed foods")
    alimentos_verificados: Dict[str, Any] = Field(default_factory=dict, description="Verified foods")
    gramajes_tabla: Dict[str, Any] = Field(default_factory=dict, description="Gramajes table")
    observaciones_gramajes: Dict[str, Any] = Field(default_factory=dict, description="Observations")
    cambios_menu: Dict[str, Any] = Field(default_factory=dict, description="Menu changes")
    
    # Sheets 5-6: Photos (reusing same structure as RI)
    fotos_general: Optional[Dict[str, Any]] = Field(None, description="General photos")
    fotos_hallazgos: Optional[Dict[str, Any]] = Field(None, description="Findings photos")
    
# ========================================
# RPS schemas
# ========================================

class TemplateRPSCreate(BaseModel):
    """Data to generate an RPS template."""
    
    # Sheet 1: ALIM Y NUTRI RPS
    info_general: Dict[str, Any] = Field(..., description="General info")
    menu: Dict[str, Any] = Field(default_factory=dict, description="Menu")
    intercambios: Dict[str, Any] = Field(default_factory=dict, description="Food exchanges")
    calificaciones: Dict[str, Any] = Field(default_factory=dict, description="Quality ratings")
    observaciones: Dict[str, Any] = Field(default_factory=dict, description="Observations")
    firmas: Dict[str, Any] = Field(..., description="Signatures")
    
    # Sheet 2: MATERIA PRIMA RPS
    info_general_mp: Dict[str, Any] = Field(..., description="MP general info")
    menu_mp_dia1: Dict[str, Any] = Field(default_factory=dict, description="Day 1 menu")
    materia_prima_dia1: Dict[str, Any] = Field(default_factory=dict, description="Day 1 raw materials")
    menu_mp_dia2: Dict[str, Any] = Field(default_factory=dict, description="Day 2 menu")
    materia_prima_dia2: Dict[str, Any] = Field(default_factory=dict, description="Day 2 raw materials")
    observaciones_mp: Dict[str, Any] = Field(default_factory=dict, description="MP observations")
    firmas_mp: Dict[str, Any] = Field(..., description="MP signatures")
    
    # Sheet 3: TEMPERAURAS Y ORGANOL (typo intentional, matches template)
    info_general_temp: Dict[str, Any] = Field(..., description="Temp general info")
    preparaciones: Dict[str, Any] = Field(default_factory=dict, description="Preparations")
    indicador_temp: Dict[str, Any] = Field(default_factory=dict, description="Compliance indicator")
    observaciones_temp: Dict[str, Any] = Field(default_factory=dict, description="Observations")
    firmas_temp: Dict[str, Any] = Field(..., description="Temp signatures")
    
    # Sheet 4: CONDICIONES DE OPERACIÓN
    info_general_cond: Dict[str, Any] = Field(..., description="Conditions general info")
    calif_edificaciones: Dict[str, Any] = Field(default_factory=dict, description="Buildings ratings")
    calif_limpieza: Dict[str, Any] = Field(default_factory=dict, description="Cleaning ratings")
    calif_plagas: Dict[str, Any] = Field(default_factory=dict, description="Pest control ratings")
    calif_residuos: Dict[str, Any] = Field(default_factory=dict, description="Waste management ratings")
    calif_agua: Dict[str, Any] = Field(default_factory=dict, description="Water supply ratings")
    calif_personal: Dict[str, Any] = Field(default_factory=dict, description="Personnel ratings")
    calif_distribucion: Dict[str, Any] = Field(default_factory=dict, description="Distribution ratings")
    calif_almacenamiento: Dict[str, Any] = Field(default_factory=dict, description="Storage ratings")
    calif_preparacion: Dict[str, Any] = Field(default_factory=dict, description="Preparation ratings")
    calif_calidad: Dict[str, Any] = Field(default_factory=dict, description="Quality assurance ratings")
    observaciones_generales_cond: Dict[str, Any] = Field(default_factory=dict, description="General observations")
    firmas_cond: Dict[str, Any] = Field(..., description="Conditions signatures")
    
    # Sheet 5: GRAMAJES RPS
    info_general_gramajes: Dict[str, Any] = Field(..., description="Gramajes general info")
    instrumento: Dict[str, Any] = Field(default_factory=dict, description="Measurement instrument")
    intercambios_gramajes: Dict[str, Any] = Field(default_factory=dict, description="Exchange info")
    alimentos_programados: Dict[str, Any] = Field(default_factory=dict, description="Programmed foods")
    alimentos_verificados: Dict[str, Any] = Field(default_factory=dict, description="Verified foods")
    gramajes_tabla: Dict[str, Any] = Field(default_factory=dict, description="Gramajes table")
    observaciones_gramajes: Dict[str, Any] = Field(default_factory=dict, description="Observations")
    cambios_menu: Dict[str, Any] = Field(default_factory=dict, description="Menu changes")
    
    # Sheets 6-7: Photos
    fotos_general: Optional[Dict[str, Any]] = Field(None, description="General photos")
    fotos_hallazgos: Optional[Dict[str, Any]] = Field(None, description="Findings photos")    