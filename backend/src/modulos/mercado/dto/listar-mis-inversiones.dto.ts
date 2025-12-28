import { z } from 'zod';

export const listarMisInversionesSchema = z.object({
  estado: z.enum(['ACTIVA', 'COMPLETADA', 'TODAS']).optional().default('TODAS'),
  limite: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 20)),
  pagina: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
});

export class ListarMisInversionesDto {
  estado: 'ACTIVA' | 'COMPLETADA' | 'TODAS' = 'TODAS';
  limite: number = 20;
  pagina: number = 1;
}
