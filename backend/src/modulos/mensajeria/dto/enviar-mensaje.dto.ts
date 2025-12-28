import { z } from 'zod';

export const enviarMensajeSchema = z.object({
  destinatario_id: z.string().uuid('ID de destinatario inválido'),
  contenido: z.string().min(1, 'El contenido es requerido').max(2000, 'Máximo 2000 caracteres'),
  adjuntos: z.array(z.string().url()).optional(),
});

export class EnviarMensajeDto {
  destinatario_id: string = '';
  contenido: string = '';
  adjuntos?: string[];
}
