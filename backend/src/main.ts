import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  // Configuración de CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:4200'],
    credentials: true,
  });

  // Prefijo global de la API
  const apiPrefix = configService.get<string>('API_PREFIX') || 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  // Validación global con class-validator (backup para Zod)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuración de Swagger (Documentación)
  if (configService.get<boolean>('SWAGGER_ENABLED') !== false) {
    const config = new DocumentBuilder()
      .setTitle('CUMBRE - API de Soberanía Digital')
      .setDescription(
        `
# Plataforma de Soberanía Digital y Económica de Mendoza

API RESTful para la gestión integral del ecosistema CUMBRE, que incluye:

## Módulos Principales

### 🔐 Identidad
Gestión de usuarios, autenticación JWT con access/refresh tokens, y perfiles con verificación biométrica.

### 💼 Talento
Marketplace de proyectos, gestión de postulaciones, habilidades y seguimiento de hitos de proyectos.

### 💰 Mercado de Activos
Tokenización de activos físicos, inversiones, y sistema de transacciones económicas.

### 📊 Sistema
Métricas agregadas del PBI provincial, estadísticas del ecosistema y healthcheck.

## Autenticación

La mayoría de los endpoints requieren autenticación mediante Bearer Token (JWT). 

1. Registrarse en \`POST /api/v1/identidad/registro\`
2. Obtener tokens en \`POST /api/v1/identidad/ingreso\`
3. Usar el \`access_token\` en el header: \`Authorization: Bearer {token}\`

## Convenciones

- Todos los endpoints están en **español**
- Las respuestas de error siguen un formato estandarizado
- La paginación usa los parámetros \`pagina\` y \`limite\`
- Los filtros avanzados están disponibles en endpoints de listado
      `.trim(),
      )
      .setVersion('1.0.0')
      .setContact(
        'Equipo CUMBRE',
        'https://cumbre.mendoza.gob.ar',
        'contacto@cumbre.mendoza.gob.ar',
      )
      .setLicense('Propietario', 'https://cumbre.mendoza.gob.ar/licencia')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Ingresa tu token JWT (sin "Bearer")',
          in: 'header',
        },
        'access-token',
      )
      .addTag('Identidad', 'Gestión de usuarios y autenticación')
      .addTag('Talento', 'Marketplace de proyectos y gestión de talento')
      .addTag('Mercado de Activos', 'Tokenización y gestión de inversiones')
      .addTag('Sistema', 'Métricas, estadísticas y healthcheck')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    const swaggerPath = configService.get<string>('SWAGGER_PATH') || 'documentacion';
    
    SwaggerModule.setup(`${apiPrefix}/${swaggerPath}`, app, document, {
      customSiteTitle: 'CUMBRE API - Documentación',
      customCss: `
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info .title { color: #2c3e50; }
        .swagger-ui .info { margin: 20px 0; }
      `,
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
        docExpansion: 'list',
        filter: true,
        displayRequestDuration: true,
      },
    });

    logger.log(`📚 Documentación disponible en: /${apiPrefix}/${swaggerPath}`);
  }

  // Iniciar servidor
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  logger.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   🏔️  CUMBRE - Plataforma de Soberanía Digital      ║
  ║                                                       ║
  ║   🚀 Servidor corriendo en: http://localhost:${port}    ║
  ║   📡 API disponible en: /${apiPrefix}                    ║
  ║   📚 Documentación: /${apiPrefix}/documentacion          ║
  ║                                                       ║
  ║   Ambiente: ${configService.get<string>('NODE_ENV')?.toUpperCase() || 'DEVELOPMENT'}                              ║
  ║   Versión: ${configService.get<string>('APP_VERSION') || '1.0.0'}                                 ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `);
}

bootstrap().catch((error) => {
  console.error('❌ Error al iniciar la aplicación:', error);
  process.exit(1);
});
