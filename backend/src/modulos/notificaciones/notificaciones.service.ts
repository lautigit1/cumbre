import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CrearNotificacionDto } from './dto/crear-notificacion.dto';
import { MarcarLeidaDto } from './dto/marcar-leida.dto';

@Injectable()
export class NotificacionesService {
  constructor(private readonly prisma: PrismaService) {}

  async listar(
    usuarioId: string,
    leida?: 'true' | 'false' | 'todas',
    limite: number = 20,
    pagina: number = 1,
  ) {
    const filtro: any = { usuario_id: usuarioId };

    if (leida === 'true') {
      filtro.leida = true;
    } else if (leida === 'false') {
      filtro.leida = false;
    }

    const skip = (pagina - 1) * limite;

    const [notificaciones, total] = await Promise.all([
      this.prisma.notificacion.findMany({
        where: filtro,
        orderBy: { creado_en: 'desc' },
        take: limite,
        skip,
      }),
      this.prisma.notificacion.count({ where: filtro }),
    ]);

    const noLeidas = await this.prisma.notificacion.count({
      where: { usuario_id: usuarioId, leida: false },
    });

    return {
      notificaciones,
      paginacion: {
        total,
        pagina,
        limite,
        totalPaginas: Math.ceil(total / limite),
      },
      noLeidas,
    };
  }

  async marcarComoLeida(usuarioId: string, dto: MarcarLeidaDto) {
    if (dto.todas) {
      const resultado = await this.prisma.notificacion.updateMany({
        where: {
          usuario_id: usuarioId,
          leida: false,
        },
        data: {
          leida: true,
        },
      });

      return {
        mensaje: 'Todas las notificaciones marcadas como leídas',
        actualizadas: resultado.count,
      };
    }

    if (dto.ids && dto.ids.length > 0) {
      const resultado = await this.prisma.notificacion.updateMany({
        where: {
          id: { in: dto.ids },
          usuario_id: usuarioId,
        },
        data: {
          leida: true,
        },
      });

      return {
        mensaje: 'Notificaciones marcadas como leídas',
        actualizadas: resultado.count,
      };
    }

    throw new NotFoundException('No se especificaron notificaciones para marcar');
  }

  async eliminar(usuarioId: string, id: string) {
    const notificacion = await this.prisma.notificacion.findFirst({
      where: { id, usuario_id: usuarioId },
    });

    if (!notificacion) {
      throw new NotFoundException('Notificación no encontrada');
    }

    await this.prisma.notificacion.delete({ where: { id } });

    return {
      mensaje: 'Notificación eliminada correctamente',
    };
  }

  async obtenerPreferencias(usuarioId: string) {
    // Por simplicidad, guardamos las preferencias en un JSON en el usuario
    // En producción esto podría ser una tabla separada
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { patrones_biometricos: true },
    });

    const preferencias = (usuario?.patrones_biometricos as any)?.preferencias_notificaciones || {
      email: true,
      push: true,
      proyectos: true,
      inversiones: true,
      mensajes: true,
      sistema: true,
    };

    return { preferencias };
  }

  async configurarPreferencias(usuarioId: string, configuracion: Record<string, boolean>) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { patrones_biometricos: true },
    });

    const datosActuales = (usuario?.patrones_biometricos as any) || {};
    datosActuales.preferencias_notificaciones = configuracion;

    await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { patrones_biometricos: datosActuales },
    });

    return {
      mensaje: 'Preferencias actualizadas correctamente',
      preferencias: configuracion,
    };
  }

  // Método auxiliar para crear notificaciones (usado por otros módulos)
  async crear(dto: CrearNotificacionDto) {
    return this.prisma.notificacion.create({
      data: dto,
    });
  }

  async contarNoLeidas(usuarioId: string) {
    return this.prisma.notificacion.count({
      where: { usuario_id: usuarioId, leida: false },
    });
  }
}
