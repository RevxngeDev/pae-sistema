"""
Configuración de Alembic.
Carga la URL de BD desde .env y los modelos desde la app.
"""
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

# Importar settings y Base
from app.core.config import settings
from app.core.database import Base

# Importar TODOS los modelos para que Alembic los detecte
from app.models import User, Inspector, Plantilla  # noqa: F401


# Configuración de Alembic
config = context.config

# Inyectar la URL de BD desde el .env
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# Configurar logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Metadata de los modelos (lo que Alembic compara contra la BD)
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Migraciones en modo offline (genera SQL sin conectarse)."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Migraciones en modo online (conectándose a la BD)."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()