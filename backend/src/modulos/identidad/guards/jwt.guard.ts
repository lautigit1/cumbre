import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 * Guard para proteger rutas con JWT
 * Permite rutas públicas marcadas con @Publico()
 */
@Injectable()
export class GuardJwt extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Verificar si la ruta está marcada como pública
    const esPublico = this.reflector.getAllAndOverride<boolean>('esPublico', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (esPublico) {
      return true;
    }

    // Si no es pública, aplicar autenticación JWT normal
    return super.canActivate(context);
  }
}
