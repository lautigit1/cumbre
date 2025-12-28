import { z } from 'zod';

export const crearReviewSchema = z.object({
  tipo: z.enum(['PROYECTO', 'USUARIO', 'ACTIVO']),
  entidad_id: z.string().uuid('ID de entidad inválido'),
  calificacion: z.number().int().min(1, 'Mínimo 1 estrella').max(5, 'Máximo 5 estrellas'),
  comentario: z.string().min(10, 'El comentario debe tener al menos 10 caracteres').max(500).optional(),
  receptor_id: z.string().uuid('ID de receptor inválido').optional(),
});

export class CrearReviewDto {
  tipo: 'PROYECTO' | 'USUARIO' | 'ACTIVO' = 'PROYECTO';
  entidad_id: string = '';
  calificacion: number = 5;
  comentario?: string;
  receptor_id?: string;
}
