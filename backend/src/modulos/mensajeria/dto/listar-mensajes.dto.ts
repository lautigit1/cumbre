import { z } from 'zod';

export const listarMensajesSchema = z.object({
  con_usuario: z.string().uuid('ID de usuario inválido').optional(),
  limite: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 50)),
  pagina: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
});

export class ListarMensajesDto {
  con_usuario?: string = '';
  limite: number = 50;
  pagina: number = 1;
}
