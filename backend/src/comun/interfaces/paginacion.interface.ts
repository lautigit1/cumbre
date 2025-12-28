/**
 * Parámetros de paginación estándar
 */
export interface ParametrosPaginacion {
  pagina: number;
  limite: number;
}

/**
 * Respuesta paginada genérica
 */
export interface RespuestaPaginada<T> {
  datos: T[];
  paginacion: {
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
    tieneSiguiente: boolean;
    tieneAnterior: boolean;
  };
}

/**
 * Helper para calcular offset de Prisma
 */
export function calcularOffset(pagina: number, limite: number): number {
  return (pagina - 1) * limite;
}

/**
 * Helper para crear respuesta paginada
 */
export function crearRespuestaPaginada<T>(
  datos: T[],
  total: number,
  pagina: number,
  limite: number,
): RespuestaPaginada<T> {
  const totalPaginas = Math.ceil(total / limite);

  return {
    datos,
    paginacion: {
      total,
      pagina,
      limite,
      totalPaginas,
      tieneSiguiente: pagina < totalPaginas,
      tieneAnterior: pagina > 1,
    },
  };
}
