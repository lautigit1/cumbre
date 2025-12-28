import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './core/prisma/prisma.module';
import { IdentidadModule } from './modulos/identidad/identidad.module';
import { TalentoModule } from './modulos/talento/talento.module';
import { MercadoModule } from './modulos/mercado/mercado.module';
import { SistemaModule } from './modulos/sistema/sistema.module';
import { NotificacionesModule } from './modulos/notificaciones/notificaciones.module';
import { MensajeriaModule } from './modulos/mensajeria/mensajeria.module';
import { FiltroExcepcionesGlobal } from './comun/filtros/filtro-excepciones-global.filter';
import { GuardJwt } from './modulos/identidad/guards/jwt.guard';

@Module({
  imports: [
    // Configuración global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Core
    PrismaModule,

    // Módulos de dominio
    IdentidadModule,
    TalentoModule,
    MercadoModule,
    SistemaModule,
    NotificacionesModule,
    MensajeriaModule,
  ],
  providers: [
    // Filtro global de excepciones
    {
      provide: APP_FILTER,
      useClass: FiltroExcepcionesGlobal,
    },
    // Guard global de autenticación JWT
    {
      provide: APP_GUARD,
      useClass: GuardJwt,
    },
  ],
})
export class AppModule {}
