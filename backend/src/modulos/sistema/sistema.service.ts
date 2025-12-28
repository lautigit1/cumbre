import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class SistemaService {
  constructor(private prisma: PrismaService) {}

  /**
   * Healthcheck del sistema
   */
  async obtenerSalud() {
    try {
      // Verificar conexión a la base de datos
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        estado: 'saludable',
        timestamp: new Date().toISOString(),
        servicios: {
          base_de_datos: 'operativo',
          api: 'operativo',
        },
        version: process.env.APP_VERSION || '1.0.0',
      };
    } catch (error) {
      return {
        estado: 'degradado',
        timestamp: new Date().toISOString(),
        servicios: {
          base_de_datos: 'error',
          api: 'operativo',
        },
        error: (error as any)?.message || 'Error desconocido',
      };
    }
  }

  /**
   * Métricas del PBI Provincial (agregación de datos económicos)
   */
  async obtenerMetricasPbiProvincial() {
    // Ejecutar todas las consultas en paralelo
    const [
      totalProyectos,
      proyectosActivos,
      totalActivos,
      totalInversiones,
      montoTotalInvertido,
      usuariosActivos,
      transaccionesUltimoMes,
    ] = await Promise.all([
      // Total de proyectos en la plataforma
      this.prisma.proyecto.count(),

      // Proyectos activos (publicados o en progreso)
      this.prisma.proyecto.count({
        where: {
          estado: {
            in: ['PUBLICADO', 'EN_PROGRESO'],
          },
        },
      }),

      // Total de activos digitalizados
      this.prisma.activo.count(),

      // Total de inversiones realizadas
      this.prisma.inversion.count(),

      // Monto total invertido en la plataforma
      this.prisma.inversion.aggregate({
        _sum: {
          monto_invertido: true,
        },
      }),

      // Usuarios activos (con sesión en últimos 30 días)
      this.prisma.usuario.count({
        where: {
          ultima_sesion: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Transacciones del último mes
      this.prisma.transaccion.count({
        where: {
          creado_en: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    // Obtener distribución de tipos de activos
    const distribucionActivos = await this.prisma.activo.groupBy({
      by: ['tipo'],
      _count: {
        tipo: true,
      },
    });

    // Obtener métricas de reputación promedio por tipo de usuario
    const reputacionPorTipo = await this.prisma.usuario.groupBy({
      by: ['tipoUsuario'],
      _avg: {
        reputacion: true,
      },
      _count: {
        tipoUsuario: true,
      },
    });

    // Calcular valor total del ecosistema
    const valorTotalActivos = await this.prisma.activo.aggregate({
      _sum: {
        valor_total: true,
        valor_tokenizado: true,
      },
    });

    // Transacciones por tipo
    const transaccionesPorTipo = await this.prisma.transaccion.groupBy({
      by: ['tipo'],
      _count: {
        tipo: true,
      },
      _sum: {
        monto: true,
      },
    });

    return {
      timestamp: new Date().toISOString(),
      resumen_general: {
        total_usuarios: await this.prisma.usuario.count(),
        usuarios_activos_mes: usuariosActivos,
        total_proyectos: totalProyectos,
        proyectos_activos: proyectosActivos,
        total_activos_digitalizados: totalActivos,
        total_inversiones: totalInversiones,
      },
      economia_digital: {
        valor_total_activos: valorTotalActivos._sum.valor_total || 0,
        valor_tokenizado: valorTotalActivos._sum.valor_tokenizado || 0,
        monto_total_invertido: montoTotalInvertido._sum.monto_invertido || 0,
        transacciones_ultimo_mes: transaccionesUltimoMes,
        volumen_pbi_provincial_estimado:
          (montoTotalInvertido._sum.monto_invertido || 0) +
          (valorTotalActivos._sum.valor_total || 0),
      },
      distribucion: {
        activos_por_tipo: distribucionActivos.map((item) => ({
          tipo: item.tipo,
          cantidad: item._count.tipo,
        })),
        reputacion_por_tipo_usuario: reputacionPorTipo.map((item) => ({
          tipo: item.tipoUsuario,
          cantidad_usuarios: item._count.tipoUsuario,
          reputacion_promedio: Math.round(item._avg.reputacion || 0),
        })),
        transacciones_por_tipo: transaccionesPorTipo.map((item) => ({
          tipo: item.tipo,
          cantidad: item._count.tipo,
          monto_total: item._sum.monto || 0,
        })),
      },
    };
  }

  /**
   * Estadísticas detalladas del ecosistema
   */
  async obtenerEstadisticasDetalladas() {
    const [
      proyectosPorEstado,
      activosPorEstado,
      postulacionesPorEstado,
      crecimientoUsuarios,
    ] = await Promise.all([
      // Proyectos por estado
      this.prisma.proyecto.groupBy({
        by: ['estado'],
        _count: {
          estado: true,
        },
      }),

      // Activos por estado
      this.prisma.activo.groupBy({
        by: ['estado'],
        _count: {
          estado: true,
        },
      }),

      // Postulaciones por estado
      this.prisma.postulacion.groupBy({
        by: ['estado'],
        _count: {
          estado: true,
        },
      }),

      // Crecimiento de usuarios (últimos 12 meses por mes)
      this.prisma.$queryRaw`
        SELECT 
          DATE_TRUNC('month', creado_en) as mes,
          COUNT(*) as nuevos_usuarios
        FROM usuarios
        WHERE creado_en >= NOW() - INTERVAL '12 months'
        GROUP BY mes
        ORDER BY mes DESC
      `,
    ]);

    return {
      timestamp: new Date().toISOString(),
      proyectos_por_estado: proyectosPorEstado.map((item) => ({
        estado: item.estado,
        cantidad: item._count.estado,
      })),
      activos_por_estado: activosPorEstado.map((item) => ({
        estado: item.estado,
        cantidad: item._count.estado,
      })),
      postulaciones_por_estado: postulacionesPorEstado.map((item) => ({
        estado: item.estado,
        cantidad: item._count.estado,
      })),
      crecimiento_usuarios: crecimientoUsuarios,
    };
  }

  /**
   * Top usuarios por reputación
   */
  async obtenerTopUsuarios(limite: number = 10) {
    const topUsuarios = await this.prisma.usuario.findMany({
      take: limite,
      orderBy: {
        reputacion: 'desc',
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        tipoUsuario: true,
        reputacion: true,
        _count: {
          select: {
            proyectos_creados: true,
            inversiones: true,
            postulaciones: true,
          },
        },
      },
    });

    return {
      timestamp: new Date().toISOString(),
      top_usuarios: topUsuarios.map((usuario) => ({
        id: usuario.id,
        nombre: `${usuario.nombre} ${usuario.apellido}`,
        tipo: usuario.tipoUsuario,
        reputacion: usuario.reputacion,
        proyectos_creados: usuario._count.proyectos_creados,
        inversiones_realizadas: usuario._count.inversiones,
        postulaciones: usuario._count.postulaciones,
      })),
    };
  }
}
