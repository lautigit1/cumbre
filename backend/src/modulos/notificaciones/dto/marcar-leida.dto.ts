import { z } from 'zod';

export const marcarLeidaSchema = z.object({
  ids: z.array(z.string().uuid('ID de notificación inválido')).optional(),
  todas: z.boolean().optional().default(false),
});

export class MarcarLeidaDto {
  ids?: string[] = [];
  todas: boolean = false;
}
