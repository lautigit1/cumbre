import { SetMetadata } from '@nestjs/common';

export const CLAVE_PUBLICA = 'esPublico';

/**
 * Decorador para marcar rutas como públicas (sin autenticación requerida)
 * Uso: @Publico()
 */
export const Publico = () => SetMetadata(CLAVE_PUBLICA, true);
