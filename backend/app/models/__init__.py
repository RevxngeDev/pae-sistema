"""
Registro central de modelos.
Importar aquí todos los modelos para que Alembic los detecte.
"""
from app.models.user import User
from app.models.inspector import Inspector
from app.models.template import Template

__all__ = ["User", "Inspector", "Template"]