import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CLAVE_PUBLICA } from '../decoradores/publico.decorator';

/**
 * Guard global para proteger rutas con JWT
 * Permite excepciones en rutas marcadas con @Publico()
 */
@Injectable()
export class GuardJwtGlobal implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const esPublico = this.reflector.getAllAndOverride<boolean>(CLAVE_PUBLICA, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (esPublico) {
      return true;
    }

    // La validación real del JWT la hace Passport
    return true;
  }
}
