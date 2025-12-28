import { z } from 'zod';

/**
 * Schema de validación para crear hito de proyecto
 */
export const crearHitoSchema = z.object({
  titulo: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(100),
  descripcion: z.string().optional(),
});

export type CrearHitoDto = z.infer<typeof crearHitoSchema>;
