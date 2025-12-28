import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';
import { CrearProyectoDto } from './dto/crear-proyecto.dto';
import { ActualizarProyectoDto } from './dto/actualizar-proyecto.dto';
import { ExplorarProyectosDto } from './dto/explorar-proyectos.dto';
import { CrearPostulacionDto } from './dto/crear-postulacion.dto';
import { ActualizarPostulacionDto } from './dto/actualizar-postulacion.dto';
import { CrearHitoDto } from './dto/crear-hito.dto';
import { CompletarHitoDto } from './dto/completar-hito.dto';
import { CrearReviewDto } from './dto/crear-review.dto';
import { AgregarFavoritoDto } from './dto/agregar-favorito.dto';
import {
  calcularOffset,
  crearRespuestaPaginada,
} from '@/comun/interfaces/paginacion.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class TalentoService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // GESTIÓN DE PROYECTOS
  // ============================================

  /**
   * Crea un nuevo proyecto
   */
  async crearProyecto(creadorId: string, dto: CrearProyectoDto) {
    const { habilidades_requeridas, ...datosProyecto } = dto;

    const proyecto = await this.prisma.proyecto.create({
      data: {
        ...datosProyecto,
        fecha_inicio: dto.fecha_inicio ? new Date(dto.fecha_inicio) : null,
        fecha_fin: dto.fecha_fin ? new Date(dto.fecha_fin) : null,
        creador_id: creadorId,
        habilidades_requeridas: habilidades_requeridas
          ? {
              create: habilidades_requeridas.map((habilidad) => ({
                habilidad_id: habilidad.habilidad_id,
                nivel_requerido: habilidad.nivel_requerido,
              })),
            }
          : undefined,
      },
      include: {
        creador: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            tipoUsuario: true,
          },
        },
        habilidades_requeridas: {
          include: {
            habilidad: true,
          },
        },
      },
    });

    return proyecto;
  }

  /**
   * Explora proyectos con filtros avanzados y paginación
   */
  async explorarProyectos(dto: ExplorarProyectosDto) {
    const { pagina, limite, orden, ...filtros } = dto;
    const offset = calcularOffset(pagina, limite);

    // Construir condiciones de filtrado dinámico
    const where: Prisma.ProyectoWhereInput = {
      estado: filtros.estado,
      modalidad: filtros.modalidad,
      ubicacion: filtros.ubicacion ? { contains: filtros.ubicacion } : undefined,
      presupuesto: {
        gte: filtros.presupuesto_min,
        lte: filtros.presupuesto_max,
      },
      ...(filtros.busqueda && {
        OR: [
          { titulo: { contains: filtros.busqueda } },
          { descripcion: { contains: filtros.busqueda } },
        ],
      }),
      ...(filtros.habilidad_id && {
        habilidades_requeridas: {
          some: {
            habilidad_id: filtros.habilidad_id,
          },
        },
      }),
    };

    // Definir orden
    const orderBy: Prisma.ProyectoOrderByWithRelationInput = this.obtenerOrdenProyectos(orden);

    // Ejecutar consultas en paralelo
    const [proyectos, total] = await Promise.all([
      this.prisma.proyecto.findMany({
        where,
        skip: offset,
        take: limite,
        orderBy,
        include: {
          creador: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
              tipoUsuario: true,
              reputacion: true,
            },
          },
          habilidades_requeridas: {
            include: {
              habilidad: true,
            },
          },
          _count: {
            select: {
              postulaciones: true,
            },
          },
        },
      }),
      this.prisma.proyecto.count({ where }),
    ]);

    return crearRespuestaPaginada(proyectos, total, pagina, limite);
  }

  /**
   * Obtiene un proyecto por ID
   */
  async obtenerProyecto(proyectoId: string) {
    const proyecto = await this.prisma.proyecto.findUnique({
      where: { id: proyectoId },
      include: {
        creador: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
            tipoUsuario: true,
            reputacion: true,
          },
        },
        habilidades_requeridas: {
          include: {
            habilidad: true,
          },
        },
        postulaciones: {
          include: {
            usuario: {
              select: {
                id: true,
                nombre: true,
                apellido: true,
                tipoUsuario: true,
                reputacion: true,
              },
            },
          },
        },
        hitos: {
          orderBy: { creado_en: 'asc' },
        },
      },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    return proyecto;
  }

  /**
   * Actualiza un proyecto
   */
  async actualizarProyecto(
    proyectoId: string,
    creadorId: string,
    dto: ActualizarProyectoDto,
  ) {
    const proyecto = await this.verificarPropietarioProyecto(proyectoId, creadorId);

    const proyectoActualizado = await this.prisma.proyecto.update({
      where: { id: proyectoId },
      data: {
        ...dto,
        fecha_inicio: dto.fecha_inicio ? new Date(dto.fecha_inicio) : undefined,
        fecha_fin: dto.fecha_fin ? new Date(dto.fecha_fin) : undefined,
      },
      include: {
        creador: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
        habilidades_requeridas: {
          include: {
            habilidad: true,
          },
        },
      },
    });

    return proyectoActualizado;
  }

  /**
   * Elimina un proyecto
   */
  async eliminarProyecto(proyectoId: string, creadorId: string) {
    await this.verificarPropietarioProyecto(proyectoId, creadorId);

    await this.prisma.proyecto.delete({
      where: { id: proyectoId },
    });

    return { mensaje: 'Proyecto eliminado correctamente' };
  }

  // ============================================
  // GESTIÓN DE POSTULACIONES
  // ============================================

  /**
   * Crea una postulación a un proyecto
   */
  async crearPostulacion(proyectoId: string, usuarioId: string, dto: CrearPostulacionDto) {
    // Verificar que el proyecto existe y está publicado
    const proyecto = await this.prisma.proyecto.findUnique({
      where: { id: proyectoId },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    if (proyecto.estado !== 'PUBLICADO') {
      throw new BadRequestException('Solo puedes postularte a proyectos publicados');
    }

    // Verificar que no sea el creador del proyecto
    if (proyecto.creador_id === usuarioId) {
      throw new BadRequestException('No puedes postularte a tu propio proyecto');
    }

    // Verificar que no exista una postulación previa
    const postulacionExistente = await this.prisma.postulacion.findUnique({
      where: {
        proyecto_id_usuario_id: {
          proyecto_id: proyectoId,
          usuario_id: usuarioId,
        },
      },
    });

    if (postulacionExistente) {
      throw new ConflictException('Ya has postulado a este proyecto');
    }

    const postulacion = await this.prisma.postulacion.create({
      data: {
        proyecto_id: proyectoId,
        usuario_id: usuarioId,
        propuesta: dto.propuesta,
        tarifa_propuesta: dto.tarifa_propuesta,
      },
      include: {
        proyecto: {
          select: {
            titulo: true,
            creador: {
              select: {
                nombre: true,
                apellido: true,
              },
            },
          },
        },
        usuario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            reputacion: true,
          },
        },
      },
    });

    return postulacion;
  }

  /**
   * Actualiza el estado de una postulación (solo el creador del proyecto)
   */
  async actualizarPostulacion(
    postulacionId: string,
    creadorId: string,
    dto: ActualizarPostulacionDto,
  ) {
    const postulacion = await this.prisma.postulacion.findUnique({
      where: { id: postulacionId },
      include: {
        proyecto: true,
      },
    });

    if (!postulacion) {
      throw new NotFoundException('Postulación no encontrada');
    }

    // Verificar que sea el creador del proyecto
    if (postulacion.proyecto.creador_id !== creadorId) {
      throw new ForbiddenException('Solo el creador del proyecto puede gestionar postulaciones');
    }

    const postulacionActualizada = await this.prisma.postulacion.update({
      where: { id: postulacionId },
      data: { estado: dto.estado },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
          },
        },
        proyecto: {
          select: {
            titulo: true,
          },
        },
      },
    });

    return postulacionActualizada;
  }

  /**
   * Obtiene las postulaciones del usuario autenticado
   */
  async obtenerMisPostulaciones(usuarioId: string) {
    const postulaciones = await this.prisma.postulacion.findMany({
      where: { usuario_id: usuarioId },
      include: {
        proyecto: {
          select: {
            id: true,
            titulo: true,
            descripcion: true,
            estado: true,
            presupuesto: true,
            creador: {
              select: {
                nombre: true,
                apellido: true,
              },
            },
          },
        },
      },
      orderBy: { creado_en: 'desc' },
    });

    return postulaciones;
  }

  // ============================================
  // GESTIÓN DE HITOS
  // ============================================

  /**
   * Crea un hito para un proyecto
   */
  async crearHito(proyectoId: string, creadorId: string, dto: CrearHitoDto) {
    await this.verificarPropietarioProyecto(proyectoId, creadorId);

    const hito = await this.prisma.hitoProyecto.create({
      data: {
        proyecto_id: proyectoId,
        titulo: dto.titulo,
        descripcion: dto.descripcion,
      },
    });

    return hito;
  }

  /**
   * Completa o descompleta un hito
   */
  async completarHito(hitoId: string, creadorId: string, dto: CompletarHitoDto) {
    const hito = await this.prisma.hitoProyecto.findUnique({
      where: { id: hitoId },
      include: {
        proyecto: true,
      },
    });

    if (!hito) {
      throw new NotFoundException('Hito no encontrado');
    }

    if (hito.proyecto.creador_id !== creadorId) {
      throw new ForbiddenException('Solo el creador del proyecto puede gestionar los hitos');
    }

    const hitoActualizado = await this.prisma.hitoProyecto.update({
      where: { id: hitoId },
      data: {
        completado: dto.completado,
        fecha_completado: dto.completado ? new Date() : null,
      },
    });

    return hitoActualizado;
  }

  // ============================================
  // MÉTODOS PRIVADOS
  // ============================================

  private async verificarPropietarioProyecto(proyectoId: string, creadorId: string) {
    const proyecto = await this.prisma.proyecto.findUnique({
      where: { id: proyectoId },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    if (proyecto.creador_id !== creadorId) {
      throw new ForbiddenException('No tienes permisos para modificar este proyecto');
    }

    return proyecto;
  }

  // ============================================
  // GESTIÓN DE REVIEWS
  // ============================================

  async crearReview(autorId: string, dto: CrearReviewDto) {
    const review = await this.prisma.review.create({
      data: {
        tipo: dto.tipo,
        entidad_id: dto.entidad_id,
        calificacion: dto.calificacion,
        comentario: dto.comentario || null,
        autor_id: autorId,
        receptor_id: dto.receptor_id || null,
      },
      include: {
        autor: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },
    });

    // Actualizar reputación del receptor si existe
    if (dto.receptor_id && dto.calificacion >= 4) {
      await this.prisma.usuario.update({
        where: { id: dto.receptor_id },
        data: { reputacion: { increment: 5 } },
      });
    }

    return review;
  }

  async obtenerReviews(tipo: string, entidadId: string) {
    const reviews = await this.prisma.review.findMany({
      where: {
        tipo,
        entidad_id: entidadId,
      },
      include: {
        autor: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },
      orderBy: { creado_en: 'desc' },
    });

    const total = reviews.length;
    const promedio =
      total > 0
        ? (reviews.reduce((sum, r) => sum + r.calificacion, 0) / total).toFixed(1)
        : 0;

    return {
      reviews,
      estadisticas: {
        total,
        promedio,
        distribucion: {
          cinco: reviews.filter((r) => r.calificacion === 5).length,
          cuatro: reviews.filter((r) => r.calificacion === 4).length,
          tres: reviews.filter((r) => r.calificacion === 3).length,
          dos: reviews.filter((r) => r.calificacion === 2).length,
          uno: reviews.filter((r) => r.calificacion === 1).length,
        },
      },
    };
  }

  async obtenerReviewsDelUsuario(usuarioId: string) {
    return this.prisma.review.findMany({
      where: { receptor_id: usuarioId },
      include: {
        autor: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },
      orderBy: { creado_en: 'desc' },
    });
  }

  // ============================================
  // GESTIÓN DE FAVORITOS
  // ============================================

  async agregarFavorito(usuarioId: string, dto: AgregarFavoritoDto) {
    const existente = await this.prisma.favorito.findFirst({
      where: {
        usuario_id: usuarioId,
        tipo: dto.tipo,
        entidad_id: dto.entidad_id,
      },
    });

    if (existente) {
      throw new ConflictException('Este elemento ya está en tus favoritos');
    }

    return this.prisma.favorito.create({
      data: {
        usuario_id: usuarioId,
        tipo: dto.tipo,
        entidad_id: dto.entidad_id,
      },
    });
  }

  async eliminarFavorito(usuarioId: string, tipo: string, entidadId: string) {
    const favorito = await this.prisma.favorito.findFirst({
      where: {
        usuario_id: usuarioId,
        tipo,
        entidad_id: entidadId,
      },
    });

    if (!favorito) {
      throw new NotFoundException('Favorito no encontrado');
    }

    await this.prisma.favorito.delete({ where: { id: favorito.id } });

    return { mensaje: 'Favorito eliminado correctamente' };
  }

  async listarFavoritos(usuarioId: string, tipo?: string) {
    const filtro: any = { usuario_id: usuarioId };
    if (tipo) filtro.tipo = tipo;

    const favoritos = await this.prisma.favorito.findMany({
      where: filtro,
      orderBy: { creado_en: 'desc' },
    });

    return { favoritos, total: favoritos.length };
  }

  async verificarFavorito(usuarioId: string, tipo: string, entidadId: string) {
    const favorito = await this.prisma.favorito.findFirst({
      where: {
        usuario_id: usuarioId,
        tipo,
        entidad_id: entidadId,
      },
    });

    return { esFavorito: !!favorito };
  }

  private obtenerOrdenProyectos(orden: string): Prisma.ProyectoOrderByWithRelationInput {
    const ordenMap: Record<string, Prisma.ProyectoOrderByWithRelationInput> = {
      reciente: { creado_en: 'desc' },
      antiguo: { creado_en: 'asc' },
      presupuesto_asc: { presupuesto: 'asc' },
      presupuesto_desc: { presupuesto: 'desc' },
    };

    return ordenMap[orden] || ordenMap.reciente;
  }
}
