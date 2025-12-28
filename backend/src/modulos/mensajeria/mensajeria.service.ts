import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { EnviarMensajeDto } from './dto/enviar-mensaje.dto';

@Injectable()
export class MensajeriaService {
  constructor(private readonly prisma: PrismaService) {}

  async enviar(remitenteId: string, dto: EnviarMensajeDto) {
    // Verificar que el destinatario existe
    const destinatario = await this.prisma.usuario.findUnique({
      where: { id: dto.destinatario_id },
    });

    if (!destinatario) {
      throw new NotFoundException('Usuario destinatario no encontrado');
    }

    if (remitenteId === dto.destinatario_id) {
      throw new BadRequestException('No puedes enviarte mensajes a ti mismo');
    }

    const mensaje = await this.prisma.mensaje.create({
      data: {
        remitente_id: remitenteId,
        destinatario_id: dto.destinatario_id,
        contenido: dto.contenido,
        adjuntos: dto.adjuntos || [],
        estado: 'ENVIADO',
      },
      include: {
        remitente: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
          },
        },
        destinatario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
          },
        },
      },
    });

    // Crear notificación para el destinatario
    await this.prisma.notificacion.create({
      data: {
        usuario_id: dto.destinatario_id,
        tipo: 'MENSAJE',
        titulo: 'Nuevo mensaje',
        mensaje: `${mensaje.remitente.nombre} ${mensaje.remitente.apellido} te ha enviado un mensaje`,
        metadata: {
          mensaje_id: mensaje.id,
          remitente_id: remitenteId,
        },
      },
    });

    return mensaje;
  }

  async listar(usuarioId: string, conUsuario?: string, limite: number = 50, pagina: number = 1) {
    const skip = (pagina - 1) * limite;
    
    const filtro: any = {
      OR: [
        { remitente_id: usuarioId },
        { destinatario_id: usuarioId },
      ],
    };

    if (conUsuario) {
      filtro.OR = [
        { remitente_id: usuarioId, destinatario_id: conUsuario },
        { remitente_id: conUsuario, destinatario_id: usuarioId },
      ];
    }

    const [mensajes, total] = await Promise.all([
      this.prisma.mensaje.findMany({
        where: filtro,
        orderBy: { creado_en: 'desc' },
        take: limite,
        skip,
        include: {
          remitente: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
              correo: true,
            },
          },
          destinatario: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
              correo: true,
            },
          },
        },
      }),
      this.prisma.mensaje.count({ where: filtro }),
    ]);

    return {
      mensajes,
      paginacion: {
        total,
        pagina,
        limite,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  async marcarComoLeido(usuarioId: string, mensajeId: string) {
    const mensaje = await this.prisma.mensaje.findFirst({
      where: {
        id: mensajeId,
        destinatario_id: usuarioId,
      },
    });

    if (!mensaje) {
      throw new NotFoundException('Mensaje no encontrado');
    }

    return this.prisma.mensaje.update({
      where: { id: mensajeId },
      data: {
        estado: 'LEIDO',
        leido_en: new Date(),
      },
    });
  }

  async obtenerConversaciones(usuarioId: string) {
    // Obtener lista de usuarios con los que ha intercambiado mensajes
    const mensajes = await this.prisma.mensaje.findMany({
      where: {
        OR: [
          { remitente_id: usuarioId },
          { destinatario_id: usuarioId },
        ],
      },
      orderBy: { creado_en: 'desc' },
      include: {
        remitente: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
          },
        },
        destinatario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
          },
        },
      },
    });

    // Agrupar por conversación
    const conversacionesMap = new Map();

    for (const mensaje of mensajes) {
      const otroUsuarioId = mensaje.remitente_id === usuarioId
        ? mensaje.destinatario_id
        : mensaje.remitente_id;

      if (!conversacionesMap.has(otroUsuarioId)) {
        const otroUsuario = mensaje.remitente_id === usuarioId
          ? mensaje.destinatario
          : mensaje.remitente;

        conversacionesMap.set(otroUsuarioId, {
          usuario: otroUsuario,
          ultimo_mensaje: mensaje,
          no_leidos: 0,
        });
      }

      // Contar mensajes no leídos
      if (
        mensaje.destinatario_id === usuarioId &&
        mensaje.estado !== 'LEIDO'
      ) {
        conversacionesMap.get(otroUsuarioId).no_leidos++;
      }
    }

    return Array.from(conversacionesMap.values());
  }

  async eliminar(usuarioId: string, mensajeId: string) {
    const mensaje = await this.prisma.mensaje.findFirst({
      where: {
        id: mensajeId,
        OR: [
          { remitente_id: usuarioId },
          { destinatario_id: usuarioId },
        ],
      },
    });

    if (!mensaje) {
      throw new NotFoundException('Mensaje no encontrado');
    }

    await this.prisma.mensaje.delete({ where: { id: mensajeId } });

    return {
      mensaje: 'Mensaje eliminado correctamente',
    };
  }
}
