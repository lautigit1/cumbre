import { z } from 'zod';

export const listarNotificacionesSchema = z.object({
  leida: z.enum(['true', 'false', 'todas']).optional().default('todas'),
  limite: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 20)),
  pagina: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
});

export class ListarNotificacionesDto {
  leida: 'true' | 'false' | 'todas' = 'todas';
  limite: number = 20;
  pagina: number = 1;
}
