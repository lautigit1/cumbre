import { SetMetadata } from '@nestjs/common';
import { TipoUsuario } from '@prisma/client';

export const CLAVE_ROLES = 'roles';

/**
 * Decorador para proteger rutas por tipo de usuario
 * Uso: @Roles(TipoUsuario.ADMINISTRADOR, TipoUsuario.EMPRESA)
 */
export const Roles = (...roles: TipoUsuario[]) => SetMetadata(CLAVE_ROLES, roles);
