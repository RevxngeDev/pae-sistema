"""
Generador base de planillas Excel.
Carga un template y rellena celdas según un mapeo JSON.
openpyxl preserva imágenes automáticamente.
"""
import json
from pathlib import Path
from typing import Any
from io import BytesIO

from openpyxl import load_workbook
from openpyxl.workbook import Workbook


# Directorios base
BASE_DIR = Path(__file__).resolve().parent.parent.parent  # → app/
TEMPLATES_DIR = BASE_DIR / "templates_xlsx"
MAPPING_DIR = Path(__file__).resolve().parent / "mapping"


class ExcelGeneratorBase:
    """
    Generador base de Excel.
    Las subclases solo definen `mapping_file`.
    """

    mapping_file: str = ""

    def __init__(self):
        self.mapping = self._load_mapping()
        self.template_path = TEMPLATES_DIR / self.mapping["template_file"]

        if not self.template_path.exists():
            raise FileNotFoundError(
                f"Template no encontrado: {self.template_path}"
            )

    def _load_mapping(self) -> dict:
        """Carga el archivo JSON de mapeo."""
        mapping_path = MAPPING_DIR / self.mapping_file
        if not mapping_path.exists():
            raise FileNotFoundError(f"Mapping no encontrado: {mapping_path}")

        with open(mapping_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def generar(self, form_data: dict) -> BytesIO:
        """
        Genera el Excel con los datos del formulario.

        Args:
            form_data: diccionario con la data del formulario

        Returns:
            BytesIO con el contenido del archivo Excel
        """
        wb = load_workbook(self.template_path)
        self._rellenar_hojas(wb, form_data)

        output = BytesIO()
        wb.save(output)
        output.seek(0)
        return output

    def _rellenar_hojas(self, wb: Workbook, form_data: dict):
        """Recorre todas las hojas del mapeo y rellena celdas."""
        for sheet_name, sections in self.mapping["sheets"].items():
            if sheet_name not in wb.sheetnames:
                continue
            ws = wb[sheet_name]

            for section_name, fields in sections.items():
                section_data = form_data.get(section_name, {})
                for field_name, cell_ref in fields.items():
                    value = section_data.get(field_name)
                    if value is not None and value != "":
                        self._write_cell(ws, cell_ref, value)

    def _write_cell(self, ws, cell_ref: str, value: Any):
        """Escribe en una celda. En celdas combinadas basta la superior izquierda."""
        try:
            ws[cell_ref] = value
        except AttributeError as e:
            # La celda es parte de un rango combinado pero no es la esquina superior izquierda
            print(f"⚠️  No se pudo escribir en {cell_ref} (celda combinada): {value}")
            # Intentar encontrar la celda raíz del merge
            for merged_range in ws.merged_cells.ranges:
                if cell_ref in merged_range:
                    # Escribir en la celda superior izquierda del rango
                    top_left = merged_range.start_cell
                    print(f"   Usando en su lugar: {top_left.coordinate}")
                    top_left.value = value
                    break