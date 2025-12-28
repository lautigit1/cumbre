import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

/**
 * Pipe personalizado para validación de datos usando Zod
 * Valida el body, query params o params según el schema proporcionado
 */
@Injectable()
export class ZodValidacionPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      const valorValidado = this.schema.parse(value);
      return valorValidado;
    } catch (error) {
      if (error instanceof ZodError) {
        const erroresFormateados = error.errors.map((err) => ({
          campo: err.path.join('.'),
          mensaje: this.traducirMensajeZod(err.message, err.code),
        }));

        throw new BadRequestException({
          codigo: 'VALIDACION_FALLIDA',
          mensaje: 'Los datos proporcionados no son válidos',
          errores: erroresFormateados,
        });
      }
      throw error;
    }
  }

  /**
   * Traduce mensajes de error de Zod al español
   */
  private traducirMensajeZod(mensaje: string, codigo: string): string {
    const traducciones: Record<string, string> = {
      'Required': 'Este campo es requerido',
      'Expected string, received': 'Se esperaba texto',
      'Expected number, received': 'Se esperaba un número',
      'Expected boolean, received': 'Se esperaba verdadero o falso',
      'Invalid email': 'El correo electrónico no es válido',
      'String must contain at least': 'El texto debe contener al menos',
      'String must contain at most': 'El texto debe contener como máximo',
      'Number must be greater than': 'El número debe ser mayor que',
      'Number must be less than': 'El número debe ser menor que',
      'Invalid uuid': 'El identificador UUID no es válido',
    };

    for (const [clave, traduccion] of Object.entries(traducciones)) {
      if (mensaje.includes(clave)) {
        return mensaje.replace(clave, traduccion);
      }
    }

    return mensaje;
  }
}
