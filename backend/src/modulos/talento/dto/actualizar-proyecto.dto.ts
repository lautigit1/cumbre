import { z } from 'zod';

/**
 * Schema de validación para actualizar proyecto
 */
export const actualizarProyectoSchema = z.object({
  titulo: z.string().min(5).max(200).optional(),
  descripcion: z.string().min(20).optional(),
  requisitos: z.string().optional(),
  presupuesto: z.number().positive().optional(),
  ubicacion: z.string().optional(),
  modalidad: z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
  duracion_estimada: z.number().positive().optional(),
  fecha_inicio: z.string().datetime().optional(),
  fecha_fin: z.string().datetime().optional(),
  estado: z.enum(['BORRADOR', 'PUBLICADO', 'EN_PROGRESO', 'COMPLETADO', 'CANCELADO']).optional(),
});

export type ActualizarProyectoDto = z.infer<typeof actualizarProyectoSchema>;
