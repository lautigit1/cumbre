import { z } from 'zod';
import { TipoUsuario } from '@prisma/client';

/**
 * Schema de validación para registro de usuario
 */
export const registroSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(50),
  apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres').max(50),
  correo: z.string().email('Debe proporcionar un correo electrónico válido'),
  clave: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'La contraseña debe contener al menos un carácter especial'),
  legajoUtn: z.string().optional(),
  tipoUsuario: z.nativeEnum(TipoUsuario).optional().default(TipoUsuario.ESTUDIANTE),
});

export type RegistroDto = z.infer<typeof registroSchema>;
