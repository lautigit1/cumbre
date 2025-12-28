import { z } from 'zod';
import { EstadoProyecto } from '@prisma/client';

/**
 * Schema de validación para crear proyecto
 */
export const crearProyectoSchema = z.object({
  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres').max(200),
  descripcion: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  requisitos: z.string().optional(),
  presupuesto: z.number().positive('El presupuesto debe ser positivo').optional(),
  ubicacion: z.string().optional(),
  modalidad: z.enum(['Presencial', 'Remoto', 'Híbrido']).optional(),
  duracion_estimada: z.number().positive().optional(),
  fecha_inicio: z.string().datetime().optional(),
  fecha_fin: z.string().datetime().optional(),
  habilidades_requeridas: z
    .array(
      z.object({
        habilidad_id: z.string().uuid(),
        nivel_requerido: z.enum(['BASICO', 'INTERMEDIO', 'AVANZADO', 'EXPERTO']),
      }),
    )
    .optional(),
});

export type CrearProyectoDto = z.infer<typeof crearProyectoSchema>;
