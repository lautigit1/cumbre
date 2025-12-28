import { z } from 'zod';

/**
 * Schema de validación para actualizar activo
 */
export const actualizarActivoSchema = z.object({
  nombre: z.string().min(3).max(200).optional(),
  descripcion: z.string().min(20).optional(),
  estado: z.enum(['DISPONIBLE', 'EN_FINANCIACION', 'FINANCIADO', 'INACTIVO']).optional(),
  ubicacion: z.string().optional(),
  imagenes: z.array(z.string().url()).optional(),
  documentos: z.array(z.string().url()).optional(),
  rentabilidad_estimada: z.number().min(0).max(100).optional(),
  plazo_meses: z.number().int().positive().optional(),
});

export type ActualizarActivoDto = z.infer<typeof actualizarActivoSchema>;
