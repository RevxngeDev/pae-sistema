"""
CCT template generator (Complemento de Comida Caliente Transportada).
Inherits from ExcelGeneratorBase and only defines the mapping file.
"""
from app.services.excel_generator.base import ExcelGeneratorBase


class CCTGenerator(ExcelGeneratorBase):
    """Generator for CCT templates."""
    mapping_file = "cct.json"