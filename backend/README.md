#  ShopZone - Backend API (Django REST Framework)

Este es el núcleo de servicios para ShopZone, un marketplace de moda y tecnología. La API proporciona un sistema de seguridad robusto, gestión de productos con permisos dinámicos e integración social. API backend con Django REST Framework + JWT + PostgreSQL.

Incluye soporte CORS con django-cors-headers para integración con frontend Angular.

## Características Principales
- Seguridad JWT: Autenticación basada en JSON Web Tokens (SimpleJWT).
- Google OAuth2 (RF-02): Login social integrado con dj-rest-auth y allauth.
- Registro Inteligente (RF-03): Validación de email duplicado con mensajes de negocio personalizados.
- Catálogo Público (RF-01): Lista de productos accesible para invitados (ReadOnly).
- Checkout Protegido (RF-01): Acción de compra restringida mediante permisos dinámicos a nivel de ViewSet.
- Poblamiento de Datos: Script seed.py para carga masiva de productos de prueba.

## Requisitos

- Python 3.13+ (o superior)
- PostgreSQL
- Virtual environment (recomendado)
- django-cors-headers (se instala automáticamente con requirements.txt)

## Instalación rápida

1.  **Clonar el Repositorio**
    ```bash
    git clone https://github.com/MilagrosCabrera23/ShopZone---Full-Stack.git
    cd ShopZone/backend
    ```

2.  **Crear y Activar un Entorno Virtual**
    ```bash
    python -m venv venv
    # En Windows
    venv\Scripts\activate
    # En macOS/Linux
    source venv/bin/activate
    ```

3.  **Instalar Dependencias**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configurar la Base de Datos**
    Abre `backend/settings.py` y ajusta la configuración de `DATABASES` para que coincida con tus credenciales de PostgreSQL.

5.  **Aplicar Migraciones**
    ```bash
    python manage.py migrate
    ```

6.  **Poblar la Base de Datos (Opcional)**
    ```bash
    python manage.py seed_data
    ```
    La contraseña para todos los usuarios de prueba es `password123`.

7.  **Iniciar el Servidor**
    ```bash
    python manage.py runserver
    ```
    El servidor estará disponible en `http://127.0.0.1:8000`.

## Endpoints de la API

A continuación se listan los endpoints principales. Todos están prefijados con `/api/`.

### Autenticación

*   `POST /register/`: Registro de un nuevo usuario.
*   `POST /login/`: Inicio de sesión con email y contraseña. Devuelve tokens de acceso y refresco.
*   `POST /token/refresh/`: Obtiene un nuevo token de acceso usando un token de refresco.
*   `GET /auth/google/login/`: Inicia el flujo de autenticación con Google (redirección).

### Gestión de Cuentas

*   `POST /password-reset/`: Solicita un reseteo de contraseña.
*   `POST /password-reset/confirm/`: Confirma el reseteo con un OTP y una nueva contraseña.
*   `GET /profile/`: Obtiene los datos del usuario autenticado.

### Productos

*   `GET /products/`: Lista todos los productos. (Acceso público)
*   `GET /products/{id}/`: Obtiene los detalles de un producto. (Acceso público)
*   `POST /products/{id}/checkout/`: Realiza una compra simulada del producto. (Requiere autenticación)

### Autenticación en APIs protegidas

Enviar header:

```
Authorization: Bearer <access token>
```

## Pruebas (tests)

```powershell
python manage.py test
```

## Notas de seguridad

- La contraseña se guarda como hash seguro (PBKDF2 por defecto).
- La app también usa `django-encrypted-model-fields` para campos sensibles.
- El backend permite solicitudes CORS desde Angular (`localhost:4200`) usando django-cors-headers.

## Estructura de carpetas

- `manage.py` — comandos Django
- `backend/` — configuración del proyecto
- `accounts/` — app con auth/registro/login
- `accounts/tests.py` — tests automáticos

## Para Angular

1) Registrar
2) Loguear y guardar `access`
3) Enviar `Authorization: Bearer <access>` en cada request
