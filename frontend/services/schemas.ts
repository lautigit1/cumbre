import { z } from 'zod';

export const TokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
});

export const UsuarioSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  email: z.string().email(),
  rol: z.string().default('usuario'),
  foto: z.string().optional(),
});

export const NotificacionSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  mensaje: z.string(),
  leida: z.boolean().default(false),
  creada: z.string(),
});

export const MensajeSchema = z.object({
  id: z.string(),
  conversacionId: z.string(),
  autorId: z.string(),
  contenido: z.string(),
  leido: z.boolean().default(false),
  creado: z.string(),
});

export const PrecioSchema = z.object({
  fecha: z.string(),
  valor: z.number(),
});

export const ActivoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  ticker: z.string(),
  rendimiento: z.number().optional(),
  precio: z.number().optional(),
});

export type TokenPayload = z.infer<typeof TokenSchema>;
export type Usuario = z.infer<typeof UsuarioSchema>;
export type Notificacion = z.infer<typeof NotificacionSchema>;
export type Mensaje = z.infer<typeof MensajeSchema>;
export type Precio = z.infer<typeof PrecioSchema>;
export type Activo = z.infer<typeof ActivoSchema>;
