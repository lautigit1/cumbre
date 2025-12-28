import { z } from 'zod';
import { TipoTransaccion } from '@prisma/client';

/**
 * Schema de validación para ejecutar transacción
 */
export const ejecutarTransaccionSchema = z.object({
  tipo: z.nativeEnum(TipoTransaccion),
  monto: z.number().positive('El monto debe ser positivo'),
  descripcion: z.string().optional(),
  destinatario_id: z.string().uuid().optional(),
  metadata: z.record(z.any()).optional(),
});

export type EjecutarTransaccionDto = z.infer<typeof ejecutarTransaccionSchema>;
