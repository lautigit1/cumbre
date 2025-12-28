import { TipoUsuario } from '@prisma/client';

/**
 * Payload del JWT - Información que se codifica en el token
 */
export interface PayloadJwt {
  sub: string; // ID del usuario
  correo: string;
  tipoUsuario: TipoUsuario;
  iat?: number; // Issued at
  exp?: number; // Expiration
}

/**
 * Respuesta de autenticación con tokens
 */
export interface RespuestaAutenticacion {
  access_token: string;
  refresh_token: string;
  usuario: {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    tipoUsuario: TipoUsuario;
    reputacion: number;
  };
}
