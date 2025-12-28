import { z } from 'zod';

export const obtenerHistorialPrecioSchema = z.object({
  dias: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 30)),
  granularidad: z.enum(['diaria', 'semanal', 'mensual']).optional().default('diaria'),
});

export class ObtenerHistorialPrecioDto {
  dias: number = 30;
  granularidad: 'diaria' | 'semanal' | 'mensual' = 'diaria';
}
