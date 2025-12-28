import { z } from 'zod';

/**
 * Schema de validación para filtros de proyectos
 */
export const explorarProyectosSchema = z.object({
  pagina: z.coerce.number().positive().default(1),
  limite: z.coerce.number().positive().max(100).default(20),
  estado: z.enum(['BORRADOR', 'PUBLICADO', 'EN_PROGRESO', 'COMPLETADO', 'CANCELADO']).optional(),
  modalidad: z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
  ubicacion: z.string().optional(),
  presupuesto_min: z.coerce.number().positive().optional(),
  presupuesto_max: z.coerce.number().positive().optional(),
  habilidad_id: z.string().uuid().optional(),
  busqueda: z.string().optional(),
  orden: z.enum(['reciente', 'antiguo', 'presupuesto_asc', 'presupuesto_desc']).default('reciente'),
});

export type ExplorarProyectosDto = z.infer<typeof explorarProyectosSchema>;
