import random
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from accounts.models import Products

# Contraseñas para los usuarios de prueba
PASSWORD = "password123"

# Datos de prueba
USERS = [
    {"username": "juanperez", "email": "juan.perez@example.com", "is_staff": False},
    {"username": "anamartinez", "email": "ana.martinez@example.com", "is_staff": False},
    {"username": "admin_shop", "email": "admin@shopzone.com", "is_staff": True},
]

PRODUCTS = [
    {"name": "Zapatillas Urbanas", "description": "Zapatillas cómodas para el día a día.", "price": 85.50},
    {"name": "Camiseta de Algodón", "description": "Camiseta suave de algodón orgánico.", "price": 25.00},
    {"name": "Smartwatch Z-100", "description": "Reloj inteligente con monitor de actividad.", "price": 199.99},
    {"name": "Auriculares Inalámbricos", "description": "Sonido de alta fidelidad, cancelación de ruido.", "price": 150.00},
    {"name": "Mochila para Laptop", "description": "Mochila resistente al agua con compartimento acolchado.", "price": 60.00},
    {"name": "Gafas de Sol Polarizadas", "description": "Protección UV con estilo moderno.", "price": 45.00},
    {"name": "Cargador Portátil", "description": "Batería externa de alta capacidad para tus dispositivos.", "price": 30.00},
    {"name": "Silla Ergonómica", "description": "Silla de oficina con soporte lumbar ajustable.", "price": 120.00},
    {"name": "Cámara de Seguridad WiFi","description": "Cámara de vigilancia con visión nocturna y audio bidireccional.","price": 80.00
    }
]

class Command(BaseCommand):
    help = 'Crea datos de prueba (usuarios y productos) para la base de datos.'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS("Iniciando la creación de datos de prueba..."))

        # --- Creación de Productos ---
        self.stdout.write("Creando productos...")
        for product_data in PRODUCTS:
            product, created = Products.objects.get_or_create(
                name=product_data["name"],
                defaults={
                    "description": product_data["description"],
                    "price": product_data["price"],
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"  ✓ Producto '{product.name}' creado."))
            else:
                self.stdout.write(self.style.WARNING(f"  - Producto '{product.name}' ya existía."))

        # --- Creación de Usuarios ---
        self.stdout.write("\nCreando usuarios...")
        for user_data in USERS:
            try:
                user = User.objects.get(username=user_data["username"])
                self.stdout.write(self.style.WARNING(f"  - Usuario '{user.username}' ya existía."))
            except User.DoesNotExist:
                user = User.objects.create_user(
                    username=user_data["username"],
                    email=user_data["email"],
                    password=PASSWORD
                )
                if user_data["is_staff"]:
                    user.is_staff = True
                    user.is_superuser = True
                    user.save()
                    self.stdout.write(self.style.SUCCESS(f"  ✓ Administrador '{user.username}' creado."))
                else:
                    self.stdout.write(self.style.SUCCESS(f"  ✓ Usuario '{user.username}' creado."))
        
        self.stdout.write(self.style.SUCCESS("\n¡Proceso completado! La base de datos ha sido poblada."))
        self.stdout.write(self.style.NOTICE(f"La contraseña para todos los usuarios es: '{PASSWORD}'"))

