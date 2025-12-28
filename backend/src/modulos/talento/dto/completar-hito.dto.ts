import { z } from 'zod';

/**
 * Schema de validación para completar hito
 */
export const completarHitoSchema = z.object({
  completado: z.boolean(),
});

export type CompletarHitoDto = z.infer<typeof completarHitoSchema>;
