import { z } from 'zod';
import { TipoNotificacion } from '@prisma/client';

export const crearNotificacionSchema = z.object({
  tipo: z.nativeEnum(TipoNotificacion),
  titulo: z.string().min(1, 'El título es requerido'),
  mensaje: z.string().min(1, 'El mensaje es requerido'),
  usuario_id: z.string().uuid('ID de usuario inválido'),
  metadata: z.record(z.any()).optional(),
});

export class CrearNotificacionDto {
  tipo: TipoNotificacion = 'SISTEMA' as TipoNotificacion;
  titulo: string = '';
  mensaje: string = '';
  usuario_id: string = '';
  metadata?: Record<string, any>;
}
