import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorador que extrae el usuario autenticado del request
 * Uso: @UsuarioActual() usuario: PayloadJwt
 */
export const UsuarioActual = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const usuario = request.user;

    return data ? usuario?.[data] : usuario;
  },
);
