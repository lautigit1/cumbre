import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IdentidadService } from '../identidad.service';
import { PayloadJwt } from '@/comun/interfaces/autenticacion.interface';

/**
 * Estrategia JWT para validar access tokens
 */
@Injectable()
export class EstrategiaJwt extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private identidadService: IdentidadService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: PayloadJwt) {
    const usuario = await this.identidadService.validarUsuarioPorId(payload.sub);

    if (!usuario) {
      throw new UnauthorizedException('Token inválido o usuario bloqueado');
    }

    return usuario;
  }
}
