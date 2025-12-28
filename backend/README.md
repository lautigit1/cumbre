# CUMBRE - Backend API

Backend de la plataforma de soberanía digital y económica de Mendoza, construido con NestJS, Prisma y PostgreSQL.

## 🚀 Características

- **Arquitectura Clean**: Separación clara de responsabilidades con NestJS
- **TypeScript Estricto**: Tipado fuerte para mayor seguridad
- **Base de Datos**: PostgreSQL 17 con Prisma ORM
- **Autenticación**: JWT con Access y Refresh Tokens
- **Validación**: Zod para validación de DTOs
- **Documentación**: Swagger/OpenAPI 3.0 en español
- **Seguridad**: Argon2 para hashing de contraseñas

## 📋 Requisitos Previos

- Node.js 18+ y npm/yarn
- PostgreSQL 17
- Git

## 🛠️ Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de base de datos.

3. **Ejecutar migraciones de Prisma:**
```bash
npm run prisma:generate
npm run prisma:migrate
```

4. **Iniciar el servidor:**
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📚 Documentación API

Una vez iniciado el servidor, accede a la documentación interactiva en:

```
http://localhost:3000/api/v1/documentacion
```

## 🏗️ Estructura del Proyecto

```
backend/
├── prisma/
│   └── schema.prisma          # Schema de base de datos
├── src/
│   ├── core/                  # Servicios core (Prisma)
│   ├── comun/                 # Código compartido
│   │   ├── decoradores/       # Decoradores personalizados
│   │   ├── filtros/           # Filtros de excepciones
│   │   ├── guards/            # Guards de autenticación/autorización
│   │   ├── interfaces/        # Interfaces compartidas
│   │   └── pipes/             # Pipes de validación
│   ├── modulos/               # Módulos de dominio
│   │   ├── identidad/         # Autenticación y usuarios
│   │   ├── talento/           # Gestión de proyectos
│   │   ├── mercado/           # Activos e inversiones
│   │   └── sistema/           # Métricas y healthcheck
│   ├── app.module.ts          # Módulo raíz
│   └── main.ts                # Punto de entrada
├── .env.example               # Variables de entorno ejemplo
├── package.json               # Dependencias
└── tsconfig.json              # Configuración TypeScript
```

## 🔑 Módulos Principales

### 1. Identidad (`/api/v1/identidad`)
- Registro de usuarios
- Login con JWT
- Gestión de perfiles
- Actualización biométrica
- Refresh tokens

### 2. Talento (`/api/v1/talento`)
- Crear y explorar proyectos
- Sistema de postulaciones
- Gestión de habilidades
- Seguimiento de hitos

### 3. Mercado (`/api/v1/mercado`)
- Digitalización de activos
- Marketplace de inversiones
- Ejecución de transacciones
- Historial financiero

### 4. Sistema (`/api/v1/sistema`)
- Healthcheck
- Métricas del PBI provincial
- Estadísticas del ecosistema
- Top usuarios por reputación

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura
npm run test:cov
```

## 📦 Scripts Disponibles

```bash
npm run build              # Compilar proyecto
npm run start              # Iniciar (producción)
npm run start:dev          # Iniciar con hot-reload
npm run start:debug        # Iniciar con debugger
npm run lint               # Ejecutar linter
npm run format             # Formatear código
npm run prisma:generate    # Generar cliente Prisma
npm run prisma:migrate     # Ejecutar migraciones
npm run prisma:studio      # Abrir Prisma Studio
```

## 🔒 Seguridad

- Las contraseñas se hashean con **Argon2**
- JWT con expiración de 15 minutos (access) y 7 días (refresh)
- Protección contra múltiples intentos de login
- Validación estricta de datos con Zod
- Filtros de excepciones personalizados

## 🌐 Variables de Entorno

Ver `.env.example` para la lista completa de variables requeridas.

## 👥 Contribuir

Este es un proyecto del ecosistema CUMBRE para Mendoza.

## 📄 Licencia

Propietario - Gobierno de Mendoza

---

**Desarrollado con ❤️ para transformar Mendoza**
