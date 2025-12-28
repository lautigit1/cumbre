# 🚀 Guía de Inicio Rápido - CUMBRE Backend

## 📝 Pasos para Poner en Marcha el Proyecto

### 1. Instalar Dependencias

```powershell
cd backend
npm install
```

Esto instalará todas las dependencias listadas en `package.json`.

### 2. Configurar Base de Datos

#### Opción A: PostgreSQL Local

1. Instala PostgreSQL 17 desde: https://www.postgresql.org/download/
2. Crea una base de datos:

```sql
CREATE DATABASE cumbre_db;
CREATE USER cumbre_user WITH PASSWORD 'tu_contraseña_segura';
GRANT ALL PRIVILEGES ON DATABASE cumbre_db TO cumbre_user;
```

#### Opción B: PostgreSQL con Docker

```powershell
docker run --name cumbre-postgres `
  -e POSTGRES_PASSWORD=cumbre2024 `
  -e POSTGRES_USER=cumbre_user `
  -e POSTGRES_DB=cumbre_db `
  -p 5432:5432 `
  -d postgres:17
```

### 3. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura tus variables:

```powershell
Copy-Item .env.example .env
```

Edita `.env` con tu editor favorito y actualiza al menos:

```env
DATABASE_URL="postgresql://cumbre_user:tu_contraseña@localhost:5432/cumbre_db?schema=public"
JWT_SECRET="genera-un-secreto-super-seguro-aqui"
JWT_REFRESH_SECRET="genera-otro-secreto-diferente-aqui"
```

**Importante:** En producción, usa secretos seguros generados aleatoriamente.

### 4. Ejecutar Migraciones de Prisma

```powershell
# Generar el cliente de Prisma
npm run prisma:generate

# Crear las tablas en la base de datos
npm run prisma:migrate
```

Cuando te pida un nombre para la migración, puedes usar: `init`

### 5. (Opcional) Poblar con Datos de Ejemplo

```powershell
npm run prisma:seed
```

Esto creará usuarios, proyectos, activos e inversiones de ejemplo.

### 6. Iniciar el Servidor

```powershell
# Modo desarrollo (con hot-reload)
npm run start:dev
```

El servidor estará disponible en:
- API: http://localhost:3000/api/v1
- Documentación: http://localhost:3000/api/v1/documentacion

### 7. Probar la API

#### Con la Documentación Swagger

1. Abre http://localhost:3000/api/v1/documentacion
2. Haz clic en "Try it out" en cualquier endpoint
3. Para endpoints protegidos:
   - Primero registra un usuario en `/identidad/registro`
   - Luego inicia sesión en `/identidad/ingreso`
   - Copia el `access_token`
   - Haz clic en el botón "Authorize" 🔒 (arriba a la derecha)
   - Pega el token y haz clic en "Authorize"

#### Con cURL (PowerShell)

```powershell
# 1. Registrar un usuario
$body = @{
    nombre = "Juan"
    apellido = "Pérez"
    correo = "juan@ejemplo.com"
    clave = "MiClave123!"
    tipoUsuario = "ESTUDIANTE"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/identidad/registro" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"

$token = $response.access_token

# 2. Obtener perfil (autenticado)
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/v1/identidad/perfil" `
    -Method Get `
    -Headers $headers
```

#### Con Postman

1. Importa la colección desde Swagger:
   - URL: http://localhost:3000/api/v1/documentacion-json
2. Configura una variable de entorno `baseUrl` = `http://localhost:3000/api/v1`
3. Usa el token en Authorization > Bearer Token

## 🔍 Comandos Útiles

### Prisma

```powershell
# Ver la base de datos con interfaz visual
npm run prisma:studio

# Crear una nueva migración después de cambios en schema.prisma
npm run prisma:migrate

# Resetear la base de datos (⚠️ Elimina todos los datos)
npx prisma migrate reset
```

### Desarrollo

```powershell
# Iniciar en modo debug
npm run start:debug

# Ver logs en tiempo real
npm run start:dev

# Formatear código
npm run format

# Ejecutar linter
npm run lint
```

### Testing

```powershell
# Tests unitarios
npm run test

# Tests con watch mode
npm run test:watch

# Cobertura de tests
npm run test:cov
```

### Producción

```powershell
# Compilar el proyecto
npm run build

# Iniciar en modo producción
npm run start:prod
```

## 🎯 Endpoints Principales

### Identidad
- `POST /api/v1/identidad/registro` - Registrar usuario
- `POST /api/v1/identidad/ingreso` - Iniciar sesión
- `GET /api/v1/identidad/perfil` - Ver perfil (requiere autenticación)

### Talento
- `POST /api/v1/talento/proyectos/crear` - Crear proyecto
- `GET /api/v1/talento/proyectos/explorar` - Listar proyectos
- `POST /api/v1/talento/postularse/:proyectoId` - Postular a proyecto

### Mercado
- `POST /api/v1/mercado/activos/digitalizar` - Digitalizar activo
- `GET /api/v1/mercado/activos/disponibles` - Ver activos disponibles
- `POST /api/v1/mercado/activos/:activoId/invertir` - Invertir en activo

### Sistema
- `GET /api/v1/sistema/salud` - Healthcheck (público)
- `GET /api/v1/sistema/metricas/pbi-provincial` - Métricas (admin)

## 🐛 Solución de Problemas

### Error: "Can't reach database server"

**Solución:** Verifica que PostgreSQL esté corriendo:

```powershell
# Si usas Docker
docker ps

# Si usas instalación local
Get-Service -Name postgresql*
```

### Error: "Environment variable not found: DATABASE_URL"

**Solución:** Asegúrate de tener el archivo `.env` en la raíz del proyecto backend.

### Error: "Module not found"

**Solución:** Reinstala las dependencias:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Puerto 3000 en uso

**Solución:** Cambia el puerto en `.env`:

```env
PORT=3001
```

## 📚 Recursos Adicionales

- [Documentación de NestJS](https://docs.nestjs.com)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de Zod](https://zod.dev)
- [Guía de JWT](https://jwt.io/introduction)

## 🆘 Soporte

Si encuentras problemas, revisa:
1. Los logs del servidor en la terminal
2. La documentación de Swagger para ver el formato esperado
3. Las variables de entorno en `.env`

---

**¡Listo para transformar Mendoza! 🏔️**
