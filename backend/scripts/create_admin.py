"""
Script para crear un admin inicial.
Uso: python -m scripts.create_admin
"""
import sys
from getpass import getpass

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.user import User


def create_admin():
    db = SessionLocal()
    try:
        print("=" * 50)
        print("Crear administrador")
        print("=" * 50)

        email = input("Email: ").strip()
        if not email:
            print("Email requerido")
            sys.exit(1)

        # Verificar que no exista
        existing = db.query(User).filter(User.email == email).first()
        if existing:
            print(f"Ya existe un usuario con el email {email}")
            sys.exit(1)

        full_name = input("Nombre completo: ").strip()
        password = getpass("Contraseña (mínimo 8 caracteres): ")
        password_confirm = getpass("Confirma contraseña: ")

        if password != password_confirm:
            print("Las contraseñas no coinciden")
            sys.exit(1)

        if len(password) < 8:
            print("La contraseña debe tener al menos 8 caracteres")
            sys.exit(1)

        # Crear el usuario
        new_user = User(
            email=email,
            full_name=full_name,
            password_hash=hash_password(password),
            role="superadmin",
            is_active=True,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        print()
        print("✓ Admin creado exitosamente")
        print(f"  ID: {new_user.id}")
        print(f"  Email: {new_user.email}")
        print(f"  Rol: {new_user.role}")

    finally:
        db.close()


if __name__ == "__main__":
    create_admin()