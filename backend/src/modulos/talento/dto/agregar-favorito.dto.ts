import { z } from 'zod';

export const agregarFavoritoSchema = z.object({
  tipo: z.enum(['PROYECTO', 'ACTIVO']),
  entidad_id: z.string().uuid('ID de entidad inválido'),
});

export class AgregarFavoritoDto {
  tipo: 'PROYECTO' | 'ACTIVO' = 'PROYECTO';
  entidad_id: string = '';
}
