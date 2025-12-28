import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TipoUsuario } from '@prisma/client';
import { CLAVE_ROLES } from '../decoradores/roles.decorator';

/**
 * Guard para verificar que el usuario tenga el rol requerido
 */
@Injectable()
export class GuardRoles implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequeridos = this.reflector.getAllAndOverride<TipoUsuario[]>(CLAVE_ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rolesRequeridos) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('No se pudo verificar la identidad del usuario');
    }

    const tieneRol = rolesRequeridos.includes(user.tipoUsuario);

    if (!tieneRol) {
      throw new ForbiddenException(
        `Esta acción requiere uno de los siguientes roles: ${rolesRequeridos.join(', ')}`,
      );
    }

    return true;
  }
}
