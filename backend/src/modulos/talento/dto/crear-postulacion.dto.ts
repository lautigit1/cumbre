import { z } from 'zod';

/**
 * Schema de validación para crear postulación
 */
export const crearPostulacionSchema = z.object({
  propuesta: z.string().min(50, 'La propuesta debe tener al menos 50 caracteres'),
  tarifa_propuesta: z.number().positive('La tarifa debe ser positiva').optional(),
});

export type CrearPostulacionDto = z.infer<typeof crearPostulacionSchema>;
