import { z } from 'zod';

/**
 * Schema de validación para login
 */
export const ingresoSchema = z.object({
  correo: z.string().email('Debe proporcionar un correo electrónico válido'),
  clave: z.string().min(1, 'La contraseña es requerida'),
});

export type IngresoDto = z.infer<typeof ingresoSchema>;
