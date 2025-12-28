import { z } from 'zod';

/**
 * Schema de validación para actualizar perfil
 */
export const actualizarPerfilSchema = z.object({
  nombre: z.string().min(2).max(50).optional(),
  apellido: z.string().min(2).max(50).optional(),
  legajoUtn: z.string().optional(),
});

export type ActualizarPerfilDto = z.infer<typeof actualizarPerfilSchema>;
