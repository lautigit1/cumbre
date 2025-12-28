import { z } from 'zod';

/**
 * Schema de validación para filtros de activos
 */
export const activosDisponiblesSchema = z.object({
  pagina: z.coerce.number().positive().default(1),
  limite: z.coerce.number().positive().max(100).default(20),
  tipo: z.enum(['INMUEBLE', 'PROYECTO_TECNOLOGICO', 'EMPRESA', 'INFRAESTRUCTURA', 'OTRO']).optional(),
  estado: z.enum(['DISPONIBLE', 'EN_FINANCIACION', 'FINANCIADO', 'INACTIVO']).optional(),
  precio_min: z.coerce.number().positive().optional(),
  precio_max: z.coerce.number().positive().optional(),
  rentabilidad_min: z.coerce.number().min(0).max(100).optional(),
  ubicacion: z.string().optional(),
  busqueda: z.string().optional(),
  orden: z.enum(['reciente', 'antiguo', 'precio_asc', 'precio_desc', 'rentabilidad']).default('reciente'),
});

export type ActivosDisponiblesDto = z.infer<typeof activosDisponiblesSchema>;
