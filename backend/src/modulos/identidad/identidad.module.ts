import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { IdentidadController } from './identidad.controller';
import { IdentidadService } from './identidad.service';
import { EstrategiaJwt } from './estrategias/jwt.estrategia';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}), // La configuración se hace dinámicamente en el service
    ConfigModule,
  ],
  controllers: [IdentidadController],
  providers: [IdentidadService, EstrategiaJwt],
  exports: [IdentidadService, EstrategiaJwt],
})
export class IdentidadModule {}
