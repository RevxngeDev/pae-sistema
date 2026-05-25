"""
Test script for RPS template generator.
Generates a sample RPS Excel file with example data.
"""
import sys
from pathlib import Path

# Add backend root to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.services.excel_generator import RPSGenerator


def main():
    print("=" * 70)
    print("RPS Template Generator - Test")
    print("=" * 70)
    
    form_data = {
        # ============ SHEET 1: ALIM Y NUTRI RPS ============
        "info_general": {
            "etc_no_c": "Puerto Gaitán",
            "fecha_visita": "2026-05-22",
            "sede_educativa": "Jorge Eliecer Gaitán",
            "operador": "Productora de Alimentos PA",
            "num_contrato": "644/2026",
            "num_servicios": "325",
            "visita_1ra": "X",
            "visita_2da": "",
            "visita_3ra": "",
            "atiende_nombre": "Johana Orjuela",
            "atiende_cargo": "Coordinadora de campo",
            "realiza_nombre": "Adriana Castañeda",
            "realiza_cargo": "Supervisora",
        },
        "menu": {
            "descripcion_menu": "Arroz, pollo guisado, ensalada, jugo de mora, postre"
        },
        "intercambios": {
            "alimento": "N/A",
            "motivo": "N/A",
            "fecha": "N/A",
            "autorizado_por": "N/A",
        },
        "calificaciones": {
            "item_1": "C", "item_2": "C", "item_3": "C", "item_4": "C", "item_5": "C",
            "item_6": "C", "item_7": "C", "item_8": "C", "item_9": "C", "item_10": "C",
            "item_11": "C", "item_12": "C", "item_13": "C", "item_14": "C", "item_15": "C",
        },
        "observaciones": {
            "texto": "Cumplimiento total."
        },
        "firmas": {
            "firma1_nombre": "Johana Orjuela",
            "firma1_documento": "1234567890",
            "firma1_cargo": "Coordinadora",
            "firma2_nombre": "Adriana Castañeda",
            "firma2_documento": "1115950530",
            "firma2_cargo": "Supervisora",
        },
        
        # ============ SHEET 2: MATERIA PRIMA RPS ============
        "info_general_mp": {
            "entidad_territorial": "Puerto Gaitán",
            "fecha_visita": "2026-05-22",
            "sede_educativa": "Jorge Eliecer Gaitán",
            "tipo_complemento": "RPS",
            "jornada_manana": "X",
            "jornada_tarde": "",
            "almuerzo": "",
            "operador": "Productora de Alimentos PA",
            "num_servicios": "325",
        },
        "menu_mp_dia1": {
            "descripcion_menu": "Día 1: Arroz, pollo guisado, ensalada, jugo de mora"
        },
        "materia_prima_dia1": {
            "fila_1_materia_prima": "Arroz blanco",
            "fila_1_proveedor": "Distribuidora del Llano",
            "fila_1_lote": "L20260501",
            "fila_1_fecha_venc": "2027-05-01",
            "fila_1_unidad_medida": "kg",
            "fila_1_temperatura": "Ambiente",
            "fila_1_cantidad_esperada": "50",
            "fila_1_cantidad_encontrada": "50",
            "fila_1_cantidad_faltante": "0",
            "fila_1_color": "X",
            "fila_1_olor": "X",
            "fila_1_textura": "X",
            "fila_1_cumplimiento": "C",
            "fila_2_materia_prima": "Pechuga de pollo",
            "fila_2_proveedor": "Avícola del Norte",
            "fila_2_lote": "L20260520-01",
            "fila_2_fecha_venc": "2026-05-30",
            "fila_2_unidad_medida": "kg",
            "fila_2_temperatura": "4°C",
            "fila_2_cantidad_esperada": "30",
            "fila_2_cantidad_encontrada": "30",
            "fila_2_cantidad_faltante": "0",
            "fila_2_color": "X",
            "fila_2_olor": "X",
            "fila_2_textura": "X",
            "fila_2_cumplimiento": "C",
        },
        "menu_mp_dia2": {
            "fecha_dia_siguiente": "2026-05-23",
            "descripcion_menu": "Día 2: Pasta con salsa, carne molida, ensalada, jugo"
        },
        "materia_prima_dia2": {
            "fila_1_materia_prima": "Pasta espagueti",
            "fila_1_proveedor": "Pastas del Valle",
            "fila_1_lote": "L20260515",
            "fila_1_fecha_venc": "2027-05-15",
            "fila_1_unidad_medida": "kg",
            "fila_1_temperatura": "Ambiente",
            "fila_1_cantidad_esperada": "25",
            "fila_1_cantidad_encontrada": "25",
            "fila_1_cantidad_faltante": "0",
            "fila_1_color": "X",
            "fila_1_olor": "X",
            "fila_1_textura": "X",
            "fila_1_cumplimiento": "C",
        },
        "observaciones_mp": {
            "texto": "Todas las materias primas cumplen con los requisitos."
        },
        "firmas_mp": {
            "firma1_nombre": "Johana Orjuela",
            "firma1_documento": "1234567890",
            "firma1_cargo": "Coordinadora",
            "firma2_nombre": "Adriana Castañeda",
            "firma2_documento": "1115950530",
            "firma2_cargo": "Supervisora",
        },
        
        # ============ SHEET 3: TEMPERAURAS Y ORGANOL ============
        "info_general_temp": {
            "etc_no_c": "Puerto Gaitán",
            "fecha_visita": "2026-05-22",
            "sede_educativa": "Jorge Eliecer Gaitán",
            "tipo_complemento": "RPS",
            "jornada_manana": "X",
            "operador": "Productora de Alimentos PA",
            "num_servicios": "325",
        },
        "preparaciones": {
            "preparacion_1_nombre": "Arroz con pollo",
            "preparacion_1_apariencia_cumple": "X",
            "preparacion_1_sabor_cumple": "X",
            "preparacion_1_olor_cumple": "X",
            "preparacion_1_textura_cumple": "X",
            "preparacion_1_temp_coccion_grados": "75",
            "preparacion_1_temp_coccion_cumple": "X",
            "preparacion_1_temp_dist_ini_grados": "70",
            "preparacion_1_temp_dist_ini_cumple": "X",
            "preparacion_1_temp_dist_fin_grados": "65",
            "preparacion_1_temp_dist_fin_cumple": "X",
            "preparacion_1_cumplimiento_general": "C",
        },
        "indicador_temp": {
            "porcentaje_cumplimiento": "100%"
        },
        "observaciones_temp": {
            "texto": "Todas las temperaturas dentro del rango."
        },
        "firmas_temp": {
            "firma1_nombre": "Johana Orjuela",
            "firma1_documento": "1234567890",
            "firma1_cargo": "Coordinadora",
            "firma2_nombre": "Adriana Castañeda",
            "firma2_documento": "1115950530",
            "firma2_cargo": "Supervisora",
        },
        
        # ============ SHEET 4: CONDICIONES DE OPERACIÓN ============
        "info_general_cond": {
            "operador": "Productora de Alimentos PA",
            "etc_no_c": "Puerto Gaitán",
            "ciudad_municipio": "Meta",
            "fecha_visita": "2026-05-22",
            "sede_educativa": "Jorge Eliecer Gaitán",
            "num_servicios": "325",
            "hora_inicial": "08:00",
            "hora_final": "10:00",
            "modalidad_rps": "RPS",
            "num_contrato": "644/2026",
            "visita_1ra": "X",
            "visita_2da": "",
            "visita_3ra": "",
            "visita_4ta": "",
            "jornada_manana": "X",
            "jornada_tarde": "",
            "almuerzo": "",
            "atiende_nombre": "Johana Orjuela",
            "atiende_cargo": "Coordinadora",
            "realiza_nombre": "Adriana Castañeda",
            "realiza_cargo": "Supervisora",
        },
        "calif_edificaciones": {
            "item_1": "2", "item_2": "2", "item_3": "2", "item_4": "2", "item_5": "2",
            "observaciones": "Instalaciones en buen estado.",
        },
        "calif_limpieza": {
            "item_6": "2", "item_7": "2", "item_8": "2", "item_9": "2", "item_10": "2",
            "observaciones": "Limpieza adecuada.",
        },
        "calif_plagas": {
            "item_11": "2", "item_12": "2",
        },
        "calif_residuos": {
            "item_13": "2", "item_14": "2", "item_15": "2", "item_16": "2", "item_17": "2",
            "observaciones": "Manejo correcto.",
        },
        "calif_agua": {
            "item_18": "2", "item_19": "2",
            "observaciones": "Agua potable disponible.",
        },
        "calif_personal": {
            "item_20": "2", "item_21": "2", "item_22": "2",
            "observaciones": "Personal con dotación completa.",
        },
        "calif_distribucion": {
            "item_23": "2", "item_24": "2", "item_25": "2",
            "item_26": "2", "item_27": "2", "item_28": "2",
            "observaciones": "Distribución correcta.",
        },
        "calif_almacenamiento": {
            "item_29": "2", "item_30": "2", "item_31": "2", "item_32": "2",
            "item_33": "2", "item_34": "2", "item_35": "2",
            "observaciones": "Almacenamiento adecuado.",
        },
        "calif_preparacion": {
            "item_36": "2", "item_37": "2", "item_38": "2", "item_39": "2",
            "item_40": "2", "item_41": "2", "item_42": "2", "item_43": "2", "item_44": "2",
            "observaciones": "Preparación correcta.",
        },
        "calif_calidad": {
            "item_45": "2", "item_46": "2",
            "observaciones": "Calidad asegurada.",
        },
        "observaciones_generales_cond": {
            "texto": "Cumplimiento general satisfactorio."
        },
        "firmas_cond": {
            "firma1_nombre": "Johana Orjuela",
            "firma1_documento": "1234567890",
            "firma1_cargo": "Coordinadora",
            "firma2_nombre": "Adriana Castañeda",
            "firma2_documento": "1115950530",
            "firma2_cargo": "Supervisora",
        },
        
        # ============ SHEET 5: GRAMAJES RPS ============
        "info_general_gramajes": {
            "institucion_educativa": "Augusto Cespedes",
            "etc": "Puerto Gaitán",
            "ciudad_municipio": "Meta",
            "direccion": "Calle 5 #10-20",
            "fecha_visita": "2026-05-22",
            "hora_inicio": "08:00",
            "operador": "Productora de Alimentos PA",
            "num_contrato": "644/2026",
            "hora_terminacion": "09:30",
        },
        "instrumento": {
            "balanza": "X",
            "marca": "Soehnle",
            "fecha_ultima_calibracion": "2026-04-15",
            "num_menu_programado": "Menú 1",
            "num_menu_entregado": "Menú 1",
        },
        "intercambios_gramajes": {
            "presentaron_intercambios_no": "X",
            "presentaron_soporte_na": "X",
        },
        "alimentos_programados": {
            "alimento_1": "X",
            "alimento_2": "X",
        },
        "alimentos_verificados": {
            "alimento_1": "X",
            "alimento_2": "X",
        },
        "gramajes_tabla": {
            "fila_1_componente": "Cereal",
            "fila_1_preparacion": "Arroz blanco",
            "fila_1_primaria_muestra1": "120",
            "fila_1_primaria_muestra2": "118",
            "fila_1_primaria_muestra3": "122",
            "fila_1_primaria_peso_esperado": "120",
            "fila_1_primaria_concepto": "1",
            "fila_1_cuartoyquinto_muestra1": "140",
            "fila_1_cuartoyquinto_muestra2": "142",
            "fila_1_cuartoyquinto_muestra3": "138",
            "fila_1_cuartoyquinto_peso_esperado": "140",
            "fila_1_cuartoyquinto_concepto": "1",
            "fila_1_secundaria_muestra1": "160",
            "fila_1_secundaria_muestra2": "158",
            "fila_1_secundaria_muestra3": "162",
            "fila_1_secundaria_peso_esperado": "160",
            "fila_1_secundaria_concepto": "1",
        },
        "observaciones_gramajes": {
            "texto": "Gramajes correctos."
        },
        "cambios_menu": {
            "cambios_no": "X",
        },
    }
    
    # Generate Excel
    print("\n🔄 Generating RPS Excel...")
    generator = RPSGenerator()
    excel_bytes = generator.generate(form_data)
    
    # Save to file
    output_path = Path(__file__).resolve().parent / "test_output_rps.xlsx"
    with open(output_path, "wb") as f:
        f.write(excel_bytes.getvalue())
    
    print(f"\n✅ Excel generated successfully!")
    print(f"📂 Saved to: {output_path}")
    print(f"📊 Size: {output_path.stat().st_size / 1024:.2f} KB")
    print("\n💡 Open the file to verify all 5 main sheets are filled correctly.")


if __name__ == "__main__":
    main()