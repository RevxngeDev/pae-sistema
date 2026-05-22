"""
Script de prueba: genera un Excel RI con datos de ejemplo y lo guarda en disco.
Uso: python -m scripts.test_generador_ri
"""
from pathlib import Path
from app.services.excel_generator import RIGenerator


def main():
    # Datos de ejemplo simulando lo que vendría del formulario
    form_data = {
        "info_general": {
            "fecha_visita": "2026-05-21",
            "sede_educativa": "Jorge Eliécer Gaitán",
            "num_servicios": 325,
            "atiende_nombre": "María Rodríguez",
            "atiende_cargo": "Rectora",
            "realiza_nombre": "Camilo Durán",
            "realiza_cargo": "Inspector PAE",
        },
        "visita": {
        "opcion_1ra": "1ra visita X",
        "opcion_2da": "2da visita",
        "opcion_3ra": "3 visita",
        },
        "menu": {
            "descripcion_menu": "Pechuga a la plancha, pasta espagueti, monedas de plátano, verduras salteadas, jugo de piña",
            "intercambio_alimento": "N/A",
            "intercambio_motivo": "N/A",
            "intercambio_fecha": "N/A",
            "intercambio_autorizado_por": "N/A",
        },
        "calificaciones": {
            "item_1": "C",
            "item_2": "C",
            "item_3": "C",
            "item_4": "NC",
            "item_5": "C",
            "item_6": "C",
            "item_7": "C",
            "item_8": "N/A",
            "item_9": "C",
            "item_10": "C",
            "item_11": "C",
        },
        "observaciones": {
            "texto": "El servicio se prestó dentro de los horarios establecidos. Se observa cumplimiento adecuado de los protocolos.",
        },
        "firmas": {
            "firma1_nombre": "María Rodríguez",
            "firma1_documento": "1234567890",
            "firma1_cargo": "Rectora",
            "firma2_nombre": "Camilo Durán",
            "firma2_documento": "1098765432",
            "firma2_cargo": "Inspector PAE",
        },
    # ============ NUEVA: datos para hoja 2 ============
    "info_general_despacho": {
        "fecha_visita": "2026-05-21",
        "jornada_manana": "X",
        "jornada_tarde": "",
        "sede_educativa": "Jorge Eliécer Gaitán",
        "acceso_facil": "X",
        "acceso_dificil": "",
        "nombre_operador": "Productora de Alimentos PA",
        "num_contrato": "644/2026",
        "tipo_vehiculo": "Furgón refrigerado",
        "nombre_conductor": "Carlos Mendoza",
        "documento_conductor": "80123456",
        "placa_vehiculo": "TST 057",
        "atiende_nombre": "María Rodríguez",
        "atiende_cargo": "Rectora",
        "realiza_nombre": "Camilo Durán",
        "realiza_cargo": "Inspector PAE",
    },
    "calificaciones_despacho": {
        "item_1": "1",
        "item_2": "1",
        "item_3": "1",
        "item_4": "1",
        "item_5": "1",
        "item_6": "1",
        "item_7": "1",
        "item_8": "1",
        "item_9": "1",
        "item_10": "1",
        "item_11": "1",
        "item_12": "1",
        "item_13": "1",
        "item_14": "0",
        "item_15": "1",
        "item_16": "1",
        "item_17": "1",
        "item_18": "1",
    },
    "observaciones_despacho": {
        "texto": "Vehículo en buen estado. Personal con todos los protocolos de bioseguridad. Temperaturas dentro del rango permitido.",
    },
    "firmas_despacho": {
        "firma1_nombre": "María Rodríguez",
        "firma1_documento": "1234567890",
        "firma1_cargo": "Rectora - Tel: 3101234567",
        "firma2_nombre": "Camilo Durán",
        "firma2_documento": "1098765432",
        "firma2_cargo": "Inspector PAE - Tel: 3209876543",
    },
        
    }

    print("=" * 60)
    print("Generando planilla RI de prueba...")
    print("=" * 60)

    generator = RIGenerator()
    excel_bytes = generator.generar(form_data)

    # Guardar a disco para inspeccionar
    output_path = Path("scripts") / "salida_test_ri.xlsx"
    output_path.parent.mkdir(exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(excel_bytes.getvalue())

    print(f"\n✓ Archivo generado: {output_path.resolve()}")
    print("\nÁbrelo con Excel para verificar que se rellenó correctamente.")


if __name__ == "__main__":
    main()