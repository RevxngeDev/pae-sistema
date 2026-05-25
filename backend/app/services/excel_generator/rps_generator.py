"""
RPS template generator (Ración Preparada en Sitio).
Inherits from ExcelGeneratorBase and only defines the mapping file.
"""
from app.services.excel_generator.base import ExcelGeneratorBase


class RPSGenerator(ExcelGeneratorBase):
    """Generator for RPS templates."""
    mapping_file = "rps.json"