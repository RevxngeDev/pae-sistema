"""
Generador de planilla RI (Ración Industrializada).
"""
from app.services.excel_generator.base import ExcelGeneratorBase


class RIGenerator(ExcelGeneratorBase):
    """Generador para planillas RI."""

    mapping_file = "ri.json"