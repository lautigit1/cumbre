import { z } from 'zod';

/**
 * Schema de validación para crear inversión
 */
export const crearInversionSchema = z.object({
  cantidad_tokens: z.number().int().positive('La cantidad de tokens debe ser positiva'),
});

export type CrearInversionDto = z.infer<typeof crearInversionSchema>;
