"""
Test script for CCT template generator.
Generates a sample CCT Excel file with example data.
"""
import sys
from pathlib import Path

# Add backend root to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.services.excel_generator import CCTGenerator


def main():
    print("=" * 70)
    print("CCT Template Generator - Test")
    print("=" * 70)
    
    form_data = {
        # ============ SHEET 1: TEMP - ORG ============
        "info_general": {
            "etc_no_c": "Puerto Gaitán",
            "fecha_visita": "2026-05-22",
            "sede_educativa": "Augusto Cespedes/Jorge Eliecer Gaitán",
            "jornada_manana": "X",
            "jornada_tarde": "",
            "almuerzo": "",
            "operador": "Productora de Alimentos PA",
            "num_servicios": "325"
        },
        "preparaciones": {
            # Preparación 1: Arroz con pollo
            "preparacion_1_nombre": "Arroz con pollo",
            "preparacion_1_apariencia_cumple": "X",
            "preparacion_1_apariencia_no_cumple": "",
            "preparacion_1_sabor_cumple": "X",
            "preparacion_1_sabor_no_cumple": "",
            "preparacion_1_olor_cumple": "X",
            "preparacion_1_olor_no_cumple": "",
            "preparacion_1_textura_cumple": "X",
            "preparacion_1_textura_no_cumple": "",
            "preparacion_1_temp_coccion_grados": "75",
            "preparacion_1_temp_coccion_cumple": "X",
            "preparacion_1_temp_coccion_no_cumple": "",
            "preparacion_1_temp_dist_ini_grados": "70",
            "preparacion_1_temp_dist_ini_cumple": "X",
            "preparacion_1_temp_dist_ini_no_cumple": "",
            "preparacion_1_temp_dist_fin_grados": "65",
            "preparacion_1_temp_dist_fin_cumple": "X",
            "preparacion_1_temp_dist_fin_no_cumple": "",
            "preparacion_1_cumplimiento_general": "C",
            # Preparación 2: Ensalada
            "preparacion_2_nombre": "Ensalada mixta",
            "preparacion_2_apariencia_cumple": "X",
            "preparacion_2_apariencia_no_cumple": "",
            "preparacion_2_sabor_cumple": "X",
            "preparacion_2_sabor_no_cumple": "",
            "preparacion_2_olor_cumple": "X",
            "preparacion_2_olor_no_cumple": "",
            "preparacion_2_textura_cumple": "X",
            "preparacion_2_textura_no_cumple": "",
            "preparacion_2_temp_coccion_grados": "N/A",
            "preparacion_2_temp_coccion_cumple": "",
            "preparacion_2_temp_coccion_no_cumple": "",
            "preparacion_2_temp_dist_ini_grados": "8",
            "preparacion_2_temp_dist_ini_cumple": "X",
            "preparacion_2_temp_dist_ini_no_cumple": "",
            "preparacion_2_temp_dist_fin_grados": "10",
            "preparacion_2_temp_dist_fin_cumple": "X",
            "preparacion_2_temp_dist_fin_no_cumple": "",
            "preparacion_2_cumplimiento_general": "C",
        },
        "indicador": {
            "porcentaje_cumplimiento": "100%"
        },
        "observaciones": {
            "texto": "Todas las preparaciones cumplen con los estándares de calidad."
        },
        "firmas": {
            "firma1_nombre": "Johana Orjuela",
            "firma1_documento": "1234567890",
            "firma1_cargo": "Coordinadora de campo",
            "firma2_nombre": "Adriana Castañeda",
            "firma2_documento": "1115950530",
            "firma2_cargo": "Supervisora",
        },
        
        # ============ SHEET 2: TRANS Y DISTRIB ============
        "info_general_trans": {
            "etc_no_c": "Puerto Gaitán",
            "fecha_visita": "2026-05-22",
            "sede_educativa": "Jorge Eliecer Gaitán",
            "operador": "Productora de Alimentos PA",
            "num_contrato": "644/2026",
            "num_servicios": "325",
            "jornada_manana": "X",
            "jornada_tarde": "",
            "almuerzo": "",
            "recibe_visita_nombre": "Johana Orjuela",
            "recibe_visita_cargo": "Coordinadora",
            "realiza_visita_nombre": "Adriana Castañeda",
            "realiza_visita_cargo": "Supervisora",
        },
        "menu_trans": {
            "descripcion_menu": "Arroz con pollo, ensalada mixta, jugo de frutas, postre"
        },
        "info_ruta": {
            "nombre_cdp": "CDP Puerto Gaitán",
            "placa_vehiculo": "ABC123",
            "num_ruta": "R-01",
            "num_sedes_ruta": "5",
            "hora_salida_cdp": "06:30",
        },
        "distribucion": {
            "contenedor_1_hora_llegada": "07:30",
            "contenedor_1_hora_salida": "07:45",
            "contenedor_1_temp_contenedor": "65",
            "contenedor_1_temp_complemento": "62",
            "contenedor_1_cantidad_entregados": "150",
            "contenedor_2_hora_llegada": "07:30",
            "contenedor_2_hora_salida": "07:45",
            "contenedor_2_temp_contenedor": "8",
            "contenedor_2_temp_complemento": "10",
            "contenedor_2_cantidad_entregados": "175",
        },
        "calif_personal_manipulador": {
            "item_1_calificacion": "2",
            "item_2_calificacion": "2",
            "item_3_calificacion": "2",
            "observaciones": "Personal con dotación completa.",
        },
        "calif_vehiculos": {
            "item_4_calificacion": "2",
            "item_5_calificacion": "2",
            "item_6_calificacion": "2",
            "item_9_calificacion": "2",
            "item_10_calificacion": "2",
            "item_11_calificacion": "1",
            "observaciones": "Vehículo en buen estado.",
        },
        "calif_entrega": {
            "item_12_calificacion": "2",
            "item_13_calificacion": "2",
            "item_14_calificacion": "2",
            "item_15_calificacion": "2",
            "item_16_calificacion": "2",
            "item_17_calificacion": "2",
            "item_18_calificacion": "2",
            "observaciones": "Entrega correcta.",
        },
        "calif_consumo": {
            "item_19_calificacion": "2",
            "item_20_calificacion": "2",
            "item_21_calificacion": "2",
            "item_22_calificacion": "2",
            "item_23_calificacion": "2",
        },
        "observaciones_generales_trans": {
            "texto": "Distribución realizada sin novedad."
        },
        "firmas_trans": {
            "firma1_nombre": "Johana Orjuela",
            "firma1_documento": "1234567890",
            "firma1_cargo": "Coordinadora",
            "firma2_nombre": "Adriana Castañeda",
            "firma2_documento": "1115950530",
            "firma2_cargo": "Supervisora",
        },
        
        # ============ SHEET 3: REQUERIMIENTOS ALIM Y NUTR ============
        "info_general_req": {
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
        "menu_req": {
            "descripcion_menu": "Arroz con pollo, ensalada mixta, jugo de frutas, postre"
        },
        "intercambios_req": {
            "alimento": "N/A",
            "motivo": "N/A",
            "fecha": "N/A",
            "autorizado_por": "N/A",
        },
        "calificaciones_req": {
            "item_1": "C",
            "item_2": "C",
            "item_3": "C",
            "item_4": "C",
            "item_5": "C",
            "item_6": "C",
            "item_7": "C",
            "item_8": "N/A",
            "item_9": "C",
            "item_10": "C",
            "item_11": "C",
            "item_12": "C",
            "item_13": "C",
            "item_14": "C",
            "item_15": "C",
        },
        "observaciones_req": {
            "texto": "Cumplimiento total de requerimientos."
        },
        "firmas_req": {
            "firma1_nombre": "Johana Orjuela",
            "firma1_documento": "1234567890",
            "firma1_cargo": "Coordinadora",
            "firma2_nombre": "Adriana Castañeda",
            "firma2_documento": "1115950530",
            "firma2_cargo": "Supervisora",
        },
        
        # ============ SHEET 4: GRAMAJES ============
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
            "gramera": "",
            "marca": "Soehnle",
            "fecha_ultima_calibracion": "2026-04-15",
            "num_menu_programado": "Menú 1",
            "num_menu_entregado": "Menú 1",
        },
        "intercambios_gramajes": {
            "presentaron_intercambios_si": "",
            "presentaron_intercambios_no": "X",
            "presentaron_intercambios_na": "",
            "presentaron_soporte_si": "",
            "presentaron_soporte_no": "",
            "presentaron_soporte_na": "X",
        },
        "alimentos_programados": {
            "alimento_1": "X",
            "alimento_2": "X",
            "alimento_3": "X",
            "alimento_4": "X",
        },
        "alimentos_verificados": {
            "alimento_1": "X",
            "alimento_2": "X",
            "alimento_3": "X",
            "alimento_4": "X",
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
            "fila_2_componente": "Proteína",
            "fila_2_preparacion": "Pechuga de pollo",
            "fila_2_primaria_muestra1": "60",
            "fila_2_primaria_muestra2": "58",
            "fila_2_primaria_muestra3": "62",
            "fila_2_primaria_peso_esperado": "60",
            "fila_2_primaria_concepto": "1",
            "fila_2_cuartoyquinto_muestra1": "70",
            "fila_2_cuartoyquinto_muestra2": "72",
            "fila_2_cuartoyquinto_muestra3": "68",
            "fila_2_cuartoyquinto_peso_esperado": "70",
            "fila_2_cuartoyquinto_concepto": "1",
            "fila_2_secundaria_muestra1": "80",
            "fila_2_secundaria_muestra2": "82",
            "fila_2_secundaria_muestra3": "78",
            "fila_2_secundaria_peso_esperado": "80",
            "fila_2_secundaria_concepto": "1",
        },
        "observaciones_gramajes": {
            "texto": "Todos los gramajes cumplen con los pesos esperados."
        },
        "cambios_menu": {
            "cambios_si": "",
            "cambios_no": "X",
            "aprobados_si": "",
            "aprobados_no": "",
        },
    }
    
    # Generate Excel
    print("\n🔄 Generating CCT Excel...")
    generator = CCTGenerator()
    excel_bytes = generator.generate(form_data)
    
    # Save to file
    output_path = Path(__file__).resolve().parent / "test_output_cct.xlsx"
    with open(output_path, "wb") as f:
        f.write(excel_bytes.getvalue())
    
    print(f"\n✅ Excel generated successfully!")
    print(f"📂 Saved to: {output_path}")
    print(f"📊 Size: {output_path.stat().st_size / 1024:.2f} KB")
    print("\n💡 Open the file to verify all 4 sheets are filled correctly.")


if __name__ == "__main__":
    main()