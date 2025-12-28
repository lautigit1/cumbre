import { z } from 'zod';

/**
 * Schema de validación para actualizar estado de postulación
 */
export const actualizarPostulacionSchema = z.object({
  estado: z.enum(['PENDIENTE', 'ACEPTADA', 'RECHAZADA', 'CANCELADA']),
});

export type ActualizarPostulacionDto = z.infer<typeof actualizarPostulacionSchema>;
