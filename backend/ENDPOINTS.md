# 📋 Resumen de Endpoints - CUMBRE API

Base URL: `http://localhost:3000/api/v1`

---

## 🔐 Módulo de Identidad

Base: `/identidad`

### Endpoints Públicos (sin autenticación)

#### POST `/identidad/registro`
Crear una nueva cuenta de usuario.

**Body:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@ejemplo.com",
  "clave": "MiClave123!",
  "legajoUtn": "12345",
  "tipoUsuario": "ESTUDIANTE"
}
```

**Response 201:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": "uuid",
    "nombre": "Juan",
    "apellido": "Pérez",
    "correo": "juan@ejemplo.com",
    "tipoUsuario": "ESTUDIANTE",
    "reputacion": 0
  }
}
```

---

#### POST `/identidad/ingreso`
Iniciar sesión.

**Body:**
```json
{
  "correo": "juan@ejemplo.com",
  "clave": "MiClave123!"
}
```

**Response 200:** (igual que registro)

---

#### POST `/identidad/refrescar-token`
Obtener un nuevo access token usando el refresh token.

**Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### Endpoints Protegidos (requieren Bearer Token)

#### GET `/identidad/perfil`
Obtener información del usuario autenticado.

**Headers:** `Authorization: Bearer {access_token}`

**Response 200:**
```json
{
  "id": "uuid",
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@ejemplo.com",
  "legajoUtn": "12345",
  "tipoUsuario": "ESTUDIANTE",
  "reputacion": 85,
  "creado_en": "2024-01-15T10:30:00Z",
  "ultima_sesion": "2024-12-27T14:20:00Z",
  "habilidades": [...],
  "proyectos_creados": [...],
  "inversiones": [...]
}
```

---

#### PATCH `/identidad/perfil`
Actualizar información del perfil.

**Body:**
```json
{
  "nombre": "Juan Carlos",
  "apellido": "Pérez García",
  "legajoUtn": "54321"
}
```

---

#### PATCH `/identidad/actualizar-biometria`
Actualizar patrones biométricos del usuario.

**Body:**
```json
{
  "patrones_biometricos": {
    "velocidad_escritura": 145,
    "patrones_mouse": {...},
    "horarios_conexion": [...]
  }
}
```

---

#### POST `/identidad/cerrar-sesion`
Cerrar sesión (invalida el refresh token).

**Response 200:**
```json
{
  "mensaje": "Sesión cerrada correctamente"
}
```

---

## 💼 Módulo de Talento

Base: `/talento`

### Proyectos

#### POST `/talento/proyectos/crear`
Crear un nuevo proyecto.

**Body:**
```json
{
  "titulo": "Desarrollo de App de Turismo",
  "descripcion": "Aplicación móvil para turismo en Mendoza...",
  "requisitos": "React Native, APIs REST, diseño responsivo",
  "presupuesto": 150000,
  "ubicacion": "Mendoza",
  "modalidad": "Remoto",
  "duracion_estimada": 90,
  "fecha_inicio": "2024-02-01T00:00:00Z",
  "habilidades_requeridas": [
    {
      "habilidad_id": "uuid-habilidad",
      "nivel_requerido": "AVANZADO"
    }
  ]
}
```

---

#### GET `/talento/proyectos/explorar`
Listar proyectos con filtros.

**Query Params:**
- `pagina` (número, default: 1)
- `limite` (número, default: 20)
- `estado` (BORRADOR | PUBLICADO | EN_PROGRESO | COMPLETADO | CANCELADO)
- `modalidad` (Presencial | Remoto | Híbrido)
- `ubicacion` (texto)
- `presupuesto_min` (número)
- `presupuesto_max` (número)
- `habilidad_id` (uuid)
- `busqueda` (texto)
- `orden` (reciente | antiguo | presupuesto_asc | presupuesto_desc)

**Ejemplo:**
```
GET /talento/proyectos/explorar?pagina=1&limite=10&estado=PUBLICADO&modalidad=Remoto
```

**Response 200:**
```json
{
  "datos": [
    {
      "id": "uuid",
      "titulo": "Desarrollo de App...",
      "descripcion": "...",
      "estado": "PUBLICADO",
      "presupuesto": 150000,
      "creador": {...},
      "habilidades_requeridas": [...],
      "_count": {
        "postulaciones": 5
      }
    }
  ],
  "paginacion": {
    "total": 25,
    "pagina": 1,
    "limite": 10,
    "totalPaginas": 3,
    "tieneSiguiente": true,
    "tieneAnterior": false
  }
}
```

---

#### GET `/talento/proyectos/:id`
Obtener detalles de un proyecto específico.

**Response 200:**
```json
{
  "id": "uuid",
  "titulo": "...",
  "descripcion": "...",
  "requisitos": "...",
  "presupuesto": 150000,
  "estado": "PUBLICADO",
  "creador": {...},
  "habilidades_requeridas": [...],
  "postulaciones": [...],
  "hitos": [...]
}
```

---

#### PATCH `/talento/proyectos/:id`
Actualizar un proyecto (solo el creador).

**Body:** (campos opcionales)
```json
{
  "titulo": "Nuevo título",
  "descripcion": "Nueva descripción",
  "estado": "EN_PROGRESO"
}
```

---

#### DELETE `/talento/proyectos/:id`
Eliminar un proyecto (solo el creador).

---

### Postulaciones

#### POST `/talento/postularse/:proyectoId`
Postularse a un proyecto.

**Body:**
```json
{
  "propuesta": "Tengo 3 años de experiencia en React y JavaScript. He desarrollado aplicaciones similares...",
  "tarifa_propuesta": 140000
}
```

---

#### GET `/talento/mis-postulaciones`
Listar mis postulaciones.

**Response 200:**
```json
[
  {
    "id": "uuid",
    "estado": "PENDIENTE",
    "propuesta": "...",
    "tarifa_propuesta": 140000,
    "proyecto": {
      "id": "uuid",
      "titulo": "...",
      "estado": "PUBLICADO",
      "creador": {...}
    },
    "creado_en": "2024-12-20T10:00:00Z"
  }
]
```

---

#### PATCH `/talento/postulaciones/:id`
Actualizar estado de una postulación (solo creador del proyecto).

**Body:**
```json
{
  "estado": "ACEPTADA"
}
```

---

### Hitos

#### POST `/talento/proyectos/:proyectoId/hitos`
Crear un hito para un proyecto.

**Body:**
```json
{
  "titulo": "Diseño de interfaz completado",
  "descripcion": "Mockups y prototipos aprobados"
}
```

---

#### PATCH `/talento/hitos/completar/:id`
Marcar un hito como completado.

**Body:**
```json
{
  "completado": true
}
```

---

## 💰 Módulo de Mercado de Activos

Base: `/mercado`

### Activos

#### POST `/mercado/activos/digitalizar`
Digitalizar un activo físico.

**Body:**
```json
{
  "nombre": "Bodega Digital Tech Hub",
  "descripcion": "Bodega histórica en Maipú...",
  "tipo": "INMUEBLE",
  "valor_total": 5000000,
  "valor_tokenizado": 2000000,
  "precio_por_token": 10000,
  "tokens_totales": 200,
  "ubicacion": "Maipú, Mendoza",
  "imagenes": ["https://ejemplo.com/img1.jpg"],
  "documentos": ["https://ejemplo.com/doc1.pdf"],
  "rentabilidad_estimada": 12,
  "plazo_meses": 24
}
```

---

#### GET `/mercado/activos/disponibles`
Marketplace de activos disponibles.

**Query Params:**
- `pagina`, `limite`
- `tipo` (INMUEBLE | PROYECTO_TECNOLOGICO | EMPRESA | INFRAESTRUCTURA | OTRO)
- `estado` (DISPONIBLE | EN_FINANCIACION | FINANCIADO | INACTIVO)
- `precio_min`, `precio_max`
- `rentabilidad_min`
- `ubicacion`
- `busqueda`
- `orden` (reciente | antiguo | precio_asc | precio_desc | rentabilidad)

**Response 200:**
```json
{
  "datos": [
    {
      "id": "uuid",
      "nombre": "Bodega Digital Tech Hub",
      "tipo": "INMUEBLE",
      "precio_por_token": 10000,
      "tokens_totales": 200,
      "tokens_vendidos": 50,
      "progreso_financiacion": 25,
      "tokens_disponibles": 150,
      "rentabilidad_estimada": 12,
      "creador": {...}
    }
  ],
  "paginacion": {...}
}
```

---

#### GET `/mercado/activos/:id`
Detalles de un activo específico.

---

#### PATCH `/mercado/activos/:id`
Actualizar un activo (solo el creador).

---

#### DELETE `/mercado/activos/:id`
Eliminar un activo sin inversiones (solo el creador).

---

### Inversiones

#### POST `/mercado/activos/:activoId/invertir`
Invertir en un activo.

**Body:**
```json
{
  "cantidad_tokens": 10
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "cantidad_tokens": 10,
  "monto_invertido": 100000,
  "activo": {
    "nombre": "Bodega Digital Tech Hub",
    "tipo": "INMUEBLE",
    "precio_por_token": 10000
  },
  "inversor": {...},
  "creado_en": "2024-12-27T15:00:00Z"
}
```

---

#### GET `/mercado/mis-inversiones`
Listar mis inversiones.

---

### Transacciones

#### POST `/mercado/transacciones/ejecutar`
Ejecutar una transacción.

**Body:**
```json
{
  "tipo": "TRANSFERENCIA",
  "monto": 50000,
  "descripcion": "Pago por proyecto completado",
  "destinatario_id": "uuid-destinatario",
  "metadata": {
    "proyecto_id": "uuid-proyecto"
  }
}
```

**Tipos de transacción:**
- `INVERSION`
- `RETIRO`
- `TRANSFERENCIA`
- `RECOMPENSA`
- `PAGO_PROYECTO`

---

#### GET `/mercado/transacciones/historial`
Historial de transacciones del usuario.

**Response 200:**
```json
[
  {
    "id": "uuid",
    "tipo": "INVERSION",
    "estado": "COMPLETADA",
    "monto": 100000,
    "descripcion": "Inversión en Bodega...",
    "remitente": {...},
    "destinatario": {...},
    "creado_en": "2024-12-27T15:00:00Z"
  }
]
```

---

## 📊 Módulo de Sistema

Base: `/sistema`

#### GET `/sistema/salud` 🔓 (público)
Healthcheck del sistema.

**Response 200:**
```json
{
  "estado": "saludable",
  "timestamp": "2024-12-27T15:30:00Z",
  "servicios": {
    "base_de_datos": "operativo",
    "api": "operativo"
  },
  "version": "1.0.0"
}
```

---

#### GET `/sistema/metricas/pbi-provincial` 🔒 (solo admin)
Métricas agregadas del ecosistema.

**Response 200:**
```json
{
  "timestamp": "2024-12-27T15:30:00Z",
  "resumen_general": {
    "total_usuarios": 1250,
    "usuarios_activos_mes": 890,
    "total_proyectos": 342,
    "proyectos_activos": 187,
    "total_activos_digitalizados": 45,
    "total_inversiones": 523
  },
  "economia_digital": {
    "valor_total_activos": 125000000,
    "valor_tokenizado": 45000000,
    "monto_total_invertido": 28500000,
    "transacciones_ultimo_mes": 1240,
    "volumen_pbi_provincial_estimado": 153500000
  },
  "distribucion": {
    "activos_por_tipo": [...],
    "reputacion_por_tipo_usuario": [...],
    "transacciones_por_tipo": [...]
  }
}
```

---

#### GET `/sistema/metricas/estadisticas` 🔒 (solo admin)
Estadísticas detalladas del ecosistema.

---

#### GET `/sistema/metricas/top-usuarios`
Top usuarios por reputación.

**Query Params:**
- `limite` (número, default: 10)

**Response 200:**
```json
{
  "timestamp": "2024-12-27T15:30:00Z",
  "top_usuarios": [
    {
      "id": "uuid",
      "nombre": "Juan Pérez",
      "tipo": "PROFESIONAL",
      "reputacion": 98,
      "proyectos_creados": 15,
      "inversiones_realizadas": 23,
      "postulaciones": 42
    }
  ]
}
```

---

## 🔒 Autenticación

Para endpoints protegidos, incluye el header:

```
Authorization: Bearer {tu_access_token}
```

El access token se obtiene al registrarse o iniciar sesión.

---

## ⚠️ Códigos de Error

### Formato de Error
```json
{
  "codigo": "VALIDACION_FALLIDA",
  "mensaje": "Los datos proporcionados no son válidos",
  "detalles": {
    "errores": [
      {
        "campo": "correo",
        "mensaje": "El correo electrónico no es válido"
      }
    ]
  },
  "timestamp": "2024-12-27T15:30:00Z",
  "ruta": "/api/v1/identidad/registro"
}
```

### Códigos Comunes
- `DUPLICADO`: Ya existe un registro con esos datos
- `NO_ENCONTRADO`: Recurso no encontrado
- `VALIDACION_FALLIDA`: Datos de entrada inválidos
- `HTTP_401`: No autenticado
- `HTTP_403`: No autorizado (sin permisos)
- `HTTP_404`: Endpoint no existe
- `ERROR_INTERNO`: Error inesperado del servidor

---

## 📚 Documentación Interactiva

Para explorar todos los endpoints de forma interactiva:

**Swagger UI:** http://localhost:3000/api/v1/documentacion

¡Prueba los endpoints directamente desde el navegador!

---

**Desarrollado con ❤️ para CUMBRE - Mendoza**
