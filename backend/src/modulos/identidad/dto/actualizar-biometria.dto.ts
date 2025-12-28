import { z } from 'zod';

/**
 * Schema de validación para actualizar datos biométricos
 */
export const actualizarBiometriaSchema = z.object({
  patrones_biometricos: z.record(z.any()).describe('Patrones de comportamiento del usuario'),
});

export type ActualizarBiometriaDto = z.infer<typeof actualizarBiometriaSchema>;
