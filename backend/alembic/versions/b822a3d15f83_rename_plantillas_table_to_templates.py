"""rename plantillas table to templates

Revision ID: b822a3d15f83
Revises: 7e8f38de2136
Create Date: 2026-05-22 16:33:28.159074

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b822a3d15f83'
down_revision: Union[str, None] = '7e8f38de2136'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Rename table
    op.rename_table('plantillas', 'templates')
    
    # Rename indexes
    op.execute('ALTER INDEX ix_plantillas_tipo RENAME TO ix_templates_template_type')
    op.execute('ALTER INDEX ix_plantillas_status RENAME TO ix_templates_status')
    op.execute('ALTER INDEX ix_plantillas_sede_educativa RENAME TO ix_templates_educational_site')
    op.execute('ALTER INDEX ix_plantillas_inspector_id RENAME TO ix_templates_inspector_id')
    op.execute('ALTER INDEX ix_plantillas_fecha_visita RENAME TO ix_templates_visit_date')
    op.execute('ALTER INDEX ix_plantillas_created_at RENAME TO ix_templates_created_at')
    
    # Rename columns
    op.alter_column('templates', 'tipo', new_column_name='template_type')
    op.alter_column('templates', 'archivo_url', new_column_name='file_url')
    op.alter_column('templates', 'archivo_nombre', new_column_name='file_name')
    op.alter_column('templates', 'sede_educativa', new_column_name='educational_site')
    op.alter_column('templates', 'fecha_visita', new_column_name='visit_date')


def downgrade():
    # Revert column names
    op.alter_column('templates', 'visit_date', new_column_name='fecha_visita')
    op.alter_column('templates', 'educational_site', new_column_name='sede_educativa')
    op.alter_column('templates', 'file_name', new_column_name='archivo_nombre')
    op.alter_column('templates', 'file_url', new_column_name='archivo_url')
    op.alter_column('templates', 'template_type', new_column_name='tipo')
    
    # Revert indexes
    op.execute('ALTER INDEX ix_templates_created_at RENAME TO ix_plantillas_created_at')
    op.execute('ALTER INDEX ix_templates_visit_date RENAME TO ix_plantillas_fecha_visita')
    op.execute('ALTER INDEX ix_templates_inspector_id RENAME TO ix_plantillas_inspector_id')
    op.execute('ALTER INDEX ix_templates_educational_site RENAME TO ix_plantillas_sede_educativa')
    op.execute('ALTER INDEX ix_templates_status RENAME TO ix_plantillas_status')
    op.execute('ALTER INDEX ix_templates_template_type RENAME TO ix_plantillas_tipo')
    
    # Revert table name
    op.rename_table('templates', 'plantillas')
