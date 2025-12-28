# 🏗️ Arquitectura del Backend CUMBRE

## Visión General

El backend de CUMBRE está construido siguiendo los principios de **Clean Architecture** y **Domain-Driven Design (DDD)**, con una estructura modular que separa claramente las responsabilidades y facilita el mantenimiento y escalabilidad del sistema.

## Stack Tecnológico

### Core
- **NestJS 11.x**: Framework progresivo de Node.js con TypeScript
- **TypeScript 5.6**: Tipado estático estricto
- **Node.js 18+**: Runtime de JavaScript

### Base de Datos
- **PostgreSQL 17**: Base de datos relacional robusta
- **Prisma 6.x**: ORM moderno con type-safety completo

### Autenticación & Seguridad
- **Passport.js**: Middleware de autenticación flexible
- **JWT**: JSON Web Tokens para autenticación stateless
- **Argon2**: Algoritmo de hashing resistente a ataques GPU

### Validación
- **Zod**: Schema validation con inferencia de tipos
- **Class-validator**: Validación de DTOs (backup)

### Documentación
- **Swagger/OpenAPI 3.0**: Documentación interactiva de la API

## Principios de Diseño Aplicados

### SOLID

#### Single Responsibility Principle (SRP)
Cada servicio tiene una única responsabilidad:
- `IdentidadService`: Solo gestión de usuarios y autenticación
- `TalentoService`: Solo gestión de proyectos y postulaciones
- `MercadoService`: Solo gestión de activos e inversiones

#### Open/Closed Principle (OCP)
La arquitectura está abierta para extensión pero cerrada para modificación:
- Los guards, pipes y filters pueden extenderse sin modificar el código base
- Los módulos pueden añadirse sin afectar los existentes

#### Liskov Substitution Principle (LSP)
Las implementaciones pueden ser sustituidas por sus abstracciones:
- `PrismaService` implementa las operaciones de base de datos
- Puede ser reemplazado por otra implementación sin cambiar los servicios

#### Interface Segregation Principle (ISP)
Interfaces específicas y cohesivas:
- `PayloadJwt`: Solo los datos necesarios para el token
- `RespuestaPaginada<T>`: Estructura genérica reutilizable

#### Dependency Inversion Principle (DIP)
Dependencias hacia abstracciones, no implementaciones concretas:
- Los servicios dependen de `PrismaService`, no de Prisma Client directamente
- Los controladores dependen de servicios, no de la lógica de negocio

### Clean Architecture

```
┌─────────────────────────────────────────────────┐
│                  Controllers                    │  ← Capa de Presentación
│  (HTTP/REST - Manejo de requests/responses)     │
├─────────────────────────────────────────────────┤
│                   Services                      │  ← Capa de Aplicación
│  (Lógica de negocio, orquestación)             │
├─────────────────────────────────────────────────┤
│               Prisma Service                    │  ← Capa de Infraestructura
│  (Acceso a datos, persistencia)                │
├─────────────────────────────────────────────────┤
│                  PostgreSQL                     │  ← Base de Datos
└─────────────────────────────────────────────────┘
```

## Estructura de Carpetas

```
backend/
├── prisma/
│   ├── schema.prisma          # Modelo de datos completo
│   └── seed.ts                # Datos iniciales
├── src/
│   ├── core/                  # Servicios fundamentales
│   │   └── prisma/           
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   ├── comun/                 # Código compartido
│   │   ├── decoradores/       # @UsuarioActual, @Publico, @Roles
│   │   ├── filtros/           # Manejo global de errores
│   │   ├── guards/            # Autenticación y autorización
│   │   ├── interfaces/        # Tipos compartidos
│   │   └── pipes/             # Validación con Zod
│   ├── modulos/               # Módulos de dominio
│   │   ├── identidad/         # Usuarios y autenticación
│   │   │   ├── dto/
│   │   │   ├── estrategias/
│   │   │   ├── guards/
│   │   │   ├── identidad.controller.ts
│   │   │   ├── identidad.service.ts
│   │   │   └── identidad.module.ts
│   │   ├── talento/           # Proyectos y postulaciones
│   │   ├── mercado/           # Activos e inversiones
│   │   └── sistema/           # Métricas y salud
│   ├── app.module.ts          # Módulo raíz
│   └── main.ts                # Bootstrap
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Patrones de Diseño Implementados

### 1. Repository Pattern (via Prisma)
Prisma actúa como un repository pattern, abstrayendo el acceso a datos.

```typescript
// En lugar de SQL directo
const usuarios = await this.prisma.usuario.findMany({
  where: { tipoUsuario: 'ESTUDIANTE' },
});
```

### 2. Dependency Injection
NestJS utiliza DI nativo para gestionar dependencias:

```typescript
@Injectable()
export class TalentoService {
  constructor(private prisma: PrismaService) {} // ← Inyección
}
```

### 3. Strategy Pattern (Passport)
Estrategias intercambiables de autenticación:

```typescript
@Injectable()
export class EstrategiaJwt extends PassportStrategy(Strategy, 'jwt') {
  // Implementación específica de JWT
}
```

### 4. Decorator Pattern
Uso extensivo de decoradores para añadir funcionalidad:

```typescript
@UseGuards(GuardJwt)
@Roles(TipoUsuario.ADMINISTRADOR)
@ApiOperation({ summary: 'Endpoint protegido' })
async metodoProtegido() {}
```

### 5. Factory Pattern (Zod Schemas)
Schemas de validación como factories de tipos:

```typescript
export const registroSchema = z.object({
  nombre: z.string().min(2),
  // ...
});

export type RegistroDto = z.infer<typeof registroSchema>;
```

### 6. Filter Pattern (Excepciones)
Filtros globales para manejo consistente de errores:

```typescript
@Catch()
export class FiltroExcepcionesGlobal implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Manejo centralizado de errores
  }
}
```

## Flujo de una Request

```
1. Request HTTP
   ↓
2. Global Guards (JWT validation)
   ↓
3. Controller endpoint
   ↓
4. ZodValidacionPipe (validación de DTO)
   ↓
5. Service method (lógica de negocio)
   ↓
6. PrismaService (acceso a DB)
   ↓
7. PostgreSQL
   ↓
8. Response (formato estandarizado)
   ↓
9. Exception Filter (si hay error)
```

## Seguridad

### Autenticación JWT
- **Access Token**: 15 minutos de validez
- **Refresh Token**: 7 días de validez
- Almacenamiento del refresh token en BD (para invalidación)

### Hashing de Contraseñas
```typescript
argon2.hash(password, {
  type: argon2.argon2id,    // Resistente a ataques de memoria y GPU
  memoryCost: 65536,         // 64 MB
  timeCost: 3,               // 3 iteraciones
  parallelism: 4             // 4 threads
});
```

### Validación de Datos
- **Zod**: Validación en tiempo de ejecución
- **TypeScript**: Validación en tiempo de compilación
- **Prisma**: Validación a nivel de BD

### Protección contra Ataques
- Rate limiting (configurable)
- Bloqueo tras 5 intentos fallidos de login
- SQL Injection prevention (via Prisma)
- XSS prevention (sanitización automática)

## Escalabilidad

### Horizontal Scaling
- Arquitectura stateless (JWT)
- Sin sesiones en memoria
- Preparado para múltiples instancias

### Database Optimization
- Índices en campos frecuentemente consultados
- Relaciones optimizadas con Prisma
- Queries con `select` específicos para reducir payload

### Caching Strategy (Futuro)
Puntos donde se puede implementar cache:
- Listados de proyectos
- Métricas del sistema
- Información de activos

## Testing

### Estructura de Tests
```typescript
describe('IdentidadService', () => {
  let service: IdentidadService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [IdentidadService, PrismaService],
    }).compile();

    service = module.get<IdentidadService>(IdentidadService);
  });

  it('debe registrar un usuario', async () => {
    // Test implementation
  });
});
```

### Tipos de Tests
- **Unit Tests**: Servicios individuales
- **Integration Tests**: Módulos completos
- **E2E Tests**: Flujos completos de usuario

## Mejoras Futuras

### Corto Plazo
- [ ] Implementar rate limiting con `@nestjs/throttler`
- [ ] Añadir logs estructurados con Winston
- [ ] Implementar eventos con Event Emitter
- [ ] Tests unitarios y e2e completos

### Mediano Plazo
- [ ] Integración con Redis para caching
- [ ] WebSockets para notificaciones en tiempo real
- [ ] Sistema de notificaciones por email
- [ ] Métricas con Prometheus

### Largo Plazo
- [ ] Migración a microservicios (si el scale lo requiere)
- [ ] Integración blockchain real para transacciones
- [ ] Machine Learning para recomendaciones
- [ ] GraphQL API como alternativa a REST

## Decisiones Técnicas Clave

### ¿Por qué NestJS?
- TypeScript first
- Arquitectura modular y escalable
- Ecosistema maduro con soporte enterprise
- Excelente DX (Developer Experience)

### ¿Por qué Prisma?
- Type-safety completo
- Migrations automáticas
- Excelente soporte para PostgreSQL
- Prisma Studio para debugging visual

### ¿Por qué Zod?
- Validación en runtime con type inference
- Mejor performance que class-validator
- Schema composable y reutilizable
- Mensajes de error claros

### ¿Por qué Argon2?
- Ganador de Password Hashing Competition
- Más seguro que bcrypt
- Resistente a ataques GPU/ASIC
- Configurable (memoria, tiempo, paralelismo)

### ¿Por qué JWT stateless?
- Escalabilidad horizontal sin sesiones compartidas
- Menor carga en base de datos
- Compatible con arquitecturas distribuidas
- Standard de la industria

## Monitoreo y Observabilidad

### Logs
- Niveles: error, warn, log, debug, verbose
- Formato estructurado en producción
- Contexto incluido (módulo, método, usuario)

### Métricas
- Healthcheck endpoint público
- Métricas de negocio (PBI provincial)
- Estadísticas de uso

### Error Tracking (Futuro)
- Integración con Sentry
- Stack traces completos
- Contexto de usuario y request

## Conclusión

Esta arquitectura está diseñada para:
- ✅ Ser mantenible a largo plazo
- ✅ Escalar horizontal y verticalmente
- ✅ Facilitar onboarding de nuevos desarrolladores
- ✅ Permitir testing exhaustivo
- ✅ Seguir mejores prácticas de la industria
- ✅ Adaptarse a futuros cambios de requerimientos

**El código está listo para transformar Mendoza. 🏔️**
