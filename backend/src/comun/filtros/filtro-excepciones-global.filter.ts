import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

/**
 * Interfaz para respuestas de error estandarizadas
 */
interface RespuestaError {
  codigo: string;
  mensaje: string;
  detalles?: any;
  timestamp: string;
  ruta: string;
}

/**
 * Filtro global de excepciones que captura y formatea todos los errores
 * de la aplicación en español, siguiendo un formato consistente
 */
@Catch()
export class FiltroExcepcionesGlobal implements ExceptionFilter {
  private readonly logger = new Logger(FiltroExcepcionesGlobal.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let respuestaError: RespuestaError;

    // Manejo de excepciones HTTP de NestJS
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      respuestaError = {
        codigo: `HTTP_${status}`,
        mensaje:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message || exception.message,
        detalles:
          typeof exceptionResponse === 'object' ? (exceptionResponse as any).error : undefined,
        timestamp: new Date().toISOString(),
        ruta: request.url,
      };
    }
    // Manejo de errores de Prisma (base de datos)
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      respuestaError = this.manejarErrorPrisma(exception, request.url);
    }
    // Manejo de errores de validación de Prisma
    else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      respuestaError = {
        codigo: 'VALIDACION_DB',
        mensaje: 'Error de validación en la base de datos',
        detalles: exception.message,
        timestamp: new Date().toISOString(),
        ruta: request.url,
      };
    }
    // Errores desconocidos
    else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      const errorMessage = exception instanceof Error ? exception.message : 'Error desconocido';

      respuestaError = {
        codigo: 'ERROR_INTERNO',
        mensaje: 'Ha ocurrido un error inesperado en el servidor',
        detalles: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
        timestamp: new Date().toISOString(),
        ruta: request.url,
      };

      // Log detallado en consola para errores no controlados
      this.logger.error(
        `Error no controlado en ${request.method} ${request.url}:`,
        exception instanceof Error ? exception.stack : exception,
      );
    }

    // Log del error (excepto 404 para evitar spam)
    if (status !== HttpStatus.NOT_FOUND) {
      this.logger.warn(
        `[${status}] ${request.method} ${request.url} - ${respuestaError.mensaje}`,
      );
    }

    response.status(status).json(respuestaError);
  }

  /**
   * Traduce los códigos de error de Prisma a mensajes en español
   */
  private manejarErrorPrisma(error: Prisma.PrismaClientKnownRequestError, ruta: string): RespuestaError {
    const timestamp = new Date().toISOString();

    switch (error.code) {
      case 'P2002':
        // Violación de restricción única
        const campo = (error.meta?.target as string[])?.join(', ') || 'campo';
        return {
          codigo: 'DUPLICADO',
          mensaje: `Ya existe un registro con ese ${campo}`,
          detalles: error.meta,
          timestamp,
          ruta,
        };

      case 'P2025':
        // Registro no encontrado
        return {
          codigo: 'NO_ENCONTRADO',
          mensaje: 'El registro solicitado no existe',
          detalles: error.meta,
          timestamp,
          ruta,
        };

      case 'P2003':
        // Violación de clave foránea
        return {
          codigo: 'REFERENCIA_INVALIDA',
          mensaje: 'La referencia a otro registro no es válida',
          detalles: error.meta,
          timestamp,
          ruta,
        };

      case 'P2014':
        // Violación de relación requerida
        return {
          codigo: 'RELACION_REQUERIDA',
          mensaje: 'Falta una relación requerida en la operación',
          detalles: error.meta,
          timestamp,
          ruta,
        };

      case 'P2000':
        // Valor demasiado largo para el campo
        return {
          codigo: 'VALOR_EXCEDE_LONGITUD',
          mensaje: 'El valor proporcionado es demasiado largo para el campo',
          detalles: error.meta,
          timestamp,
          ruta,
        };

      default:
        return {
          codigo: `PRISMA_${error.code}`,
          mensaje: 'Error en la operación de base de datos',
          detalles: process.env.NODE_ENV === 'development' ? error.meta : undefined,
          timestamp,
          ruta,
        };
    }
  }
}
