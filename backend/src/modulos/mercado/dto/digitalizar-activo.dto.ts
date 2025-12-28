import { z } from 'zod';
import { TipoActivo } from '@prisma/client';

/**
 * Schema de validación para digitalizar activo
 */
export const digitalizarActivoSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(200),
  descripcion: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  tipo: z.nativeEnum(TipoActivo),
  valor_total: z.number().positive('El valor total debe ser positivo'),
  valor_tokenizado: z.number().positive('El valor tokenizado debe ser positivo'),
  precio_por_token: z.number().positive('El precio por token debe ser positivo'),
  tokens_totales: z.number().int().positive('Los tokens totales deben ser positivos'),
  ubicacion: z.string().optional(),
  imagenes: z.array(z.string().url()).optional(),
  documentos: z.array(z.string().url()).optional(),
  rentabilidad_estimada: z.number().min(0).max(100).optional(),
  plazo_meses: z.number().int().positive().optional(),
});

export type DigitalizarActivoDto = z.infer<typeof digitalizarActivoSchema>;
