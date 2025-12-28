import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';
import { DigitalizarActivoDto } from './dto/digitalizar-activo.dto';
import { ActualizarActivoDto } from './dto/actualizar-activo.dto';
import { ActivosDisponiblesDto } from './dto/activos-disponibles.dto';
import { CrearInversionDto } from './dto/crear-inversion.dto';
import { EjecutarTransaccionDto } from './dto/ejecutar-transaccion.dto';
import {
  calcularOffset,
  crearRespuestaPaginada,
} from '@/comun/interfaces/paginacion.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class MercadoService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // GESTIÓN DE ACTIVOS
  // ============================================

  /**
   * Digitaliza un activo físico o proyecto
   */
  async digitalizarActivo(creadorId: string, dto: DigitalizarActivoDto) {
    // Validar que el valor tokenizado no supere el valor total
    if (dto.valor_tokenizado > dto.valor_total) {
      throw new BadRequestException('El valor tokenizado no puede superar el valor total');
    }

    const activo = await this.prisma.activo.create({
      data: {
        ...dto,
        creador_id: creadorId,
        imagenes: dto.imagenes || [],
        documentos: dto.documentos || [],
      },
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
      },
    });

    return activo;
  }

  /**
   * Lista activos disponibles para inversión (marketplace)
   */
  async obtenerActivosDisponibles(dto: ActivosDisponiblesDto) {
    const { pagina, limite, orden, ...filtros } = dto;
    const offset = calcularOffset(pagina, limite);

    // Construir condiciones de filtrado
    const where: Prisma.ActivoWhereInput = {
      tipo: filtros.tipo,
      estado: filtros.estado,
      precio_por_token: {
        gte: filtros.precio_min,
        lte: filtros.precio_max,
      },
      rentabilidad_estimada: {
        gte: filtros.rentabilidad_min,
      },
      ubicacion: filtros.ubicacion
        ? { contains: filtros.ubicacion }
        : undefined,
      ...(filtros.busqueda && {
        OR: [
          { nombre: { contains: filtros.busqueda } },
          { descripcion: { contains: filtros.busqueda } },
        ],
      }),
    };

    // Definir orden
    const orderBy: Prisma.ActivoOrderByWithRelationInput = this.obtenerOrdenActivos(orden);

    // Ejecutar consultas en paralelo
    const [activos, total] = await Promise.all([
      this.prisma.activo.findMany({
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
          _count: {
            select: {
              inversiones: true,
            },
          },
        },
      }),
      this.prisma.activo.count({ where }),
    ]);

    // Calcular progreso de financiación
    const activosConProgreso = activos.map((activo) => ({
      ...activo,
      progreso_financiacion: (activo.tokens_vendidos / activo.tokens_totales) * 100,
      tokens_disponibles: activo.tokens_totales - activo.tokens_vendidos,
    }));

    return crearRespuestaPaginada(activosConProgreso, total, pagina, limite);
  }

  /**
   * Obtiene un activo por ID
   */
  async obtenerActivo(activoId: string) {
    const activo = await this.prisma.activo.findUnique({
      where: { id: activoId },
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
        inversiones: {
          include: {
            inversor: {
              select: {
                id: true,
                nombre: true,
                apellido: true,
                reputacion: true,
              },
            },
          },
          orderBy: { creado_en: 'desc' },
        },
      },
    });

    if (!activo) {
      throw new NotFoundException('Activo no encontrado');
    }

    return {
      ...activo,
      progreso_financiacion: (activo.tokens_vendidos / activo.tokens_totales) * 100,
      tokens_disponibles: activo.tokens_totales - activo.tokens_vendidos,
    };
  }

  /**
   * Actualiza un activo
   */
  async actualizarActivo(activoId: string, creadorId: string, dto: ActualizarActivoDto) {
    await this.verificarPropietarioActivo(activoId, creadorId);

    const activo = await this.prisma.activo.update({
      where: { id: activoId },
      data: dto,
      include: {
        creador: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },
    });

    return activo;
  }

  /**
   * Elimina un activo
   */
  async eliminarActivo(activoId: string, creadorId: string) {
    const activo = await this.verificarPropietarioActivo(activoId, creadorId);

    // No permitir eliminar si ya tiene inversiones
    if (activo.tokens_vendidos > 0) {
      throw new BadRequestException('No se puede eliminar un activo que ya tiene inversiones');
    }

    await this.prisma.activo.delete({
      where: { id: activoId },
    });

    return { mensaje: 'Activo eliminado correctamente' };
  }

  // ============================================
  // GESTIÓN DE INVERSIONES
  // ============================================

  /**
   * Crea una inversión en un activo
   */
  async crearInversion(activoId: string, inversorId: string, dto: CrearInversionDto) {
    const activo = await this.prisma.activo.findUnique({
      where: { id: activoId },
    });

    if (!activo) {
      throw new NotFoundException('Activo no encontrado');
    }

    // Validaciones
    if (activo.estado !== 'DISPONIBLE' && activo.estado !== 'EN_FINANCIACION') {
      throw new BadRequestException('Este activo no está disponible para inversión');
    }

    const tokensDisponibles = activo.tokens_totales - activo.tokens_vendidos;
    if (dto.cantidad_tokens > tokensDisponibles) {
      throw new BadRequestException(
        `Solo hay ${tokensDisponibles} tokens disponibles para este activo`,
      );
    }

    if (activo.creador_id === inversorId) {
      throw new BadRequestException('No puedes invertir en tu propio activo');
    }

    const montoInvertido = dto.cantidad_tokens * activo.precio_por_token;

    // Ejecutar operación en transacción
    const resultado = await this.prisma.$transaction(async (prisma) => {
      // Crear la inversión
      const inversion = await prisma.inversion.create({
        data: {
          activo_id: activoId,
          inversor_id: inversorId,
          cantidad_tokens: dto.cantidad_tokens,
          monto_invertido: montoInvertido,
        },
        include: {
          activo: {
            select: {
              nombre: true,
              tipo: true,
              precio_por_token: true,
            },
          },
          inversor: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
            },
          },
        },
      });

      // Actualizar tokens vendidos del activo
      const tokensVendidosActualizados = activo.tokens_vendidos + dto.cantidad_tokens;
      const estadoActivo =
        tokensVendidosActualizados === activo.tokens_totales
          ? 'FINANCIADO'
          : 'EN_FINANCIACION';

      await prisma.activo.update({
        where: { id: activoId },
        data: {
          tokens_vendidos: tokensVendidosActualizados,
          estado: estadoActivo,
        },
      });

      // Registrar transacción
      await prisma.transaccion.create({
        data: {
          tipo: 'INVERSION',
          estado: 'COMPLETADA',
          monto: montoInvertido,
          descripcion: `Inversión de ${dto.cantidad_tokens} tokens en ${activo.nombre}`,
          remitente_id: inversorId,
          destinatario_id: activo.creador_id,
          metadata: {
            activo_id: activoId,
            cantidad_tokens: dto.cantidad_tokens,
            precio_por_token: activo.precio_por_token,
          },
        },
      });

      return inversion;
    });

    return resultado;
  }

  // ============================================
  // GESTIÓN DE TRANSACCIONES
  // ============================================

  /**
   * Ejecuta una transacción entre usuarios
   */
  async ejecutarTransaccion(remitenteId: string, dto: EjecutarTransaccionDto) {
    // Validaciones según el tipo de transacción
    if (dto.tipo === 'TRANSFERENCIA' && !dto.destinatario_id) {
      throw new BadRequestException('Las transferencias requieren un destinatario');
    }

    if (dto.destinatario_id && dto.destinatario_id === remitenteId) {
      throw new BadRequestException('No puedes realizar transacciones contigo mismo');
    }

    // Verificar que el destinatario existe si se proporciona
    if (dto.destinatario_id) {
      const destinatario = await this.prisma.usuario.findUnique({
        where: { id: dto.destinatario_id },
      });

      if (!destinatario) {
        throw new NotFoundException('El destinatario no existe');
      }
    }

    const transaccion = await this.prisma.transaccion.create({
      data: {
        tipo: dto.tipo,
        estado: 'COMPLETADA',
        monto: dto.monto,
        descripcion: dto.descripcion,
        remitente_id: remitenteId,
        destinatario_id: dto.destinatario_id,
        metadata: dto.metadata,
      },
      include: {
        remitente: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
        destinatario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },
    });

    return transaccion;
  }

  /**
   * Obtiene el historial de transacciones del usuario
   */
  async obtenerMisTransacciones(usuarioId: string) {
    const transacciones = await this.prisma.transaccion.findMany({
      where: {
        OR: [{ remitente_id: usuarioId }, { destinatario_id: usuarioId }],
      },
      include: {
        remitente: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
        destinatario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },
      orderBy: { creado_en: 'desc' },
    });

    return transacciones;
  }

  // ============================================
  // MÉTODOS PRIVADOS
  // ============================================

  private async verificarPropietarioActivo(activoId: string, creadorId: string) {
    const activo = await this.prisma.activo.findUnique({
      where: { id: activoId },
    });

    if (!activo) {
      throw new NotFoundException('Activo no encontrado');
    }

    if (activo.creador_id !== creadorId) {
      throw new ForbiddenException('No tienes permisos para modificar este activo');
    }

    return activo;
  }

  // ============================================
  // HISTORIAL DE PRECIOS
  // ============================================

  async obtenerHistorialPrecio(
    activoId: string,
    diasRetro: number = 30,
    granularidad: 'diaria' | 'semanal' | 'mensual' = 'diaria',
  ) {
    const activo = await this.prisma.activo.findUnique({
      where: { id: activoId },
      include: { historial_precios: true },
    });

    if (!activo) {
      throw new NotFoundException('Activo no encontrado');
    }

    const desde = new Date();
    desde.setDate(desde.getDate() - diasRetro);

    const historial = await this.prisma.historialPrecio.findMany({
      where: {
        activo_id: activoId,
        creado_en: { gte: desde },
      },
      orderBy: { creado_en: 'asc' },
    });

    // Agrupar según granularidad
    const gruposHistorial = this.agruparHistorialPorGranularidad(historial, granularidad);

    const precios = gruposHistorial.map((grupo) => ({
      fecha: grupo.fecha,
      precio_promedio: grupo.precioPromedio,
      precio_minimo: grupo.precioMinimo,
      precio_maximo: grupo.precioMaximo,
      cantidad_cambios: grupo.cantidad,
    }));

    const cambioValor = historial.length > 1
      ? ((historial[historial.length - 1].precio - historial[0].precio) /
          historial[0].precio) *
        100
      : 0;

    return {
      activo: {
        id: activo.id,
        nombre: activo.nombre,
        precio_actual: activo.precio_por_token,
      },
      historial: precios,
      estadisticas: {
        precio_maximo: Math.max(...historial.map((h) => h.precio)),
        precio_minimo: Math.min(...historial.map((h) => h.precio)),
        precio_promedio:
          historial.reduce((sum, h) => sum + h.precio, 0) / (historial.length || 1),
        cambio_porcentaje: cambioValor.toFixed(2),
        registros_totales: historial.length,
      },
    };
  }

  async registrarCambioPrecio(activoId: string, nuevoPrecio: number) {
    const activo = await this.prisma.activo.findUnique({
      where: { id: activoId },
    });

    if (!activo) {
      throw new NotFoundException('Activo no encontrado');
    }

    // Registrar el cambio en el historial
    await this.prisma.historialPrecio.create({
      data: {
        activo_id: activoId,
        precio: nuevoPrecio,
      },
    });

    // Actualizar el precio actual
    return this.prisma.activo.update({
      where: { id: activoId },
      data: { precio_por_token: nuevoPrecio },
    });
  }

  // ============================================
  // HISTORIAL DE INVERSIONES
  // ============================================

  async obtenerMisInversiones(
    usuarioId: string,
    estado?: 'ACTIVA' | 'COMPLETADA' | 'TODAS',
    limite: number = 20,
    pagina: number = 1,
  ) {
    const skip = (pagina - 1) * limite;

    // Obtener todas las inversiones del usuario
    const inversiones = await this.prisma.inversion.findMany({
      where: { inversor_id: usuarioId },
      include: {
        activo: {
          select: {
            id: true,
            nombre: true,
            tipo: true,
            precio_por_token: true,
            rentabilidad_estimada: true,
          },
        },
      },
      orderBy: { creado_en: 'desc' },
    });

    // Filtrar por estado si es necesario
    let filtradas = inversiones;
    if (estado && estado !== 'TODAS') {
      const ahora = new Date();
      filtradas = inversiones.filter((inv) => {
        const vencido =
          inv.activo.rentabilidad_estimada &&
          new Date(inv.creado_en.getTime() + inv.activo.rentabilidad_estimada * 30 * 24 * 60 * 60 * 1000) < ahora;

        return estado === 'ACTIVA' ? !vencido : vencido;
      });
    }

    const total = filtradas.length;
    const paginadas = filtradas.slice(skip, skip + limite);

    // Calcular ganancia total
    const gananciaTotal = paginadas.reduce((sum, inv) => {
      // Aproximar precio al momento basándose en cantidad de tokens
      const precioEstimadoAlInvertir = inv.monto_invertido / inv.cantidad_tokens;
      const cambio = (inv.activo.precio_por_token - precioEstimadoAlInvertir) /
        precioEstimadoAlInvertir;
      return sum + inv.monto_invertido * cambio;
    }, 0);

    return {
      inversiones: paginadas.map((inv) => ({
        ...inv,
        ganancia_estimada: inv.monto_invertido *
          (((inv.monto_invertido / inv.cantidad_tokens) - inv.activo.precio_por_token) /
            (inv.monto_invertido / inv.cantidad_tokens) * -1),
      })),
      paginacion: {
        total,
        pagina,
        limite,
        totalPaginas: Math.ceil(total / limite),
      },
      resumen: {
        inversion_total: paginadas.reduce((sum, inv) => sum + inv.monto_invertido, 0),
        ganancia_total: gananciaTotal.toFixed(2),
        cantidad_activos: new Set(paginadas.map((inv) => inv.activo_id)).size,
      },
    };
  }

  async obtenerDetalleInversion(usuarioId: string, inversionId: string) {
    const inversion = await this.prisma.inversion.findFirst({
      where: { id: inversionId, inversor_id: usuarioId },
      include: {
        activo: {
          select: {
            id: true,
            nombre: true,
            descripcion: true,
            tipo: true,
            precio_por_token: true,
            rentabilidad_estimada: true,
            creador: {
              select: { id: true, nombre: true, apellido: true },
            },
          },
        },
      },
    });

    if (!inversion) {
      throw new NotFoundException('Inversión no encontrada');
    }

    const precioEstimadoAlInvertir = inversion.monto_invertido / inversion.cantidad_tokens;
    const ganancia = inversion.monto_invertido *
      (((inversion.activo.precio_por_token - precioEstimadoAlInvertir) /
        precioEstimadoAlInvertir) * -1);

    const rendimiento = (ganancia / inversion.monto_invertido) * 100;

    return {
      inversion,
      estadisticas: {
        ganancia_estimada: ganancia.toFixed(2),
        rendimiento_porcentaje: rendimiento.toFixed(2),
        dias_desde_inversion: Math.floor(
          (new Date().getTime() - inversion.creado_en.getTime()) / (1000 * 60 * 60 * 24),
        ),
      },
    };
  }

  private agruparHistorialPorGranularidad(
    historial: any[],
    granularidad: 'diaria' | 'semanal' | 'mensual',
  ) {
    const grupos = new Map();

    historial.forEach((registro) => {
      let clave = '';

      if (granularidad === 'diaria') {
        clave = registro.creado_en.toISOString().split('T')[0];
      } else if (granularidad === 'semanal') {
        const fecha = new Date(registro.creado_en);
        const inicio = new Date(fecha);
        inicio.setDate(fecha.getDate() - fecha.getDay());
        clave = inicio.toISOString().split('T')[0];
      } else if (granularidad === 'mensual') {
        clave = registro.creado_en.toISOString().substring(0, 7);
      }

      if (!grupos.has(clave)) {
        grupos.set(clave, {
          fecha: clave,
          precios: [],
          cantidad: 0,
        });
      }

      const grupo = grupos.get(clave);
      grupo.precios.push(registro.precio);
      grupo.cantidad++;
    });

    return Array.from(grupos.values()).map((grupo) => ({
      fecha: grupo.fecha,
      precioPromedio: grupo.precios.reduce((a: number, b: number) => a + b, 0) / grupo.precios.length,
      precioMinimo: Math.min(...grupo.precios),
      precioMaximo: Math.max(...grupo.precios),
      cantidad: grupo.cantidad,
    }));
  }

  private obtenerOrdenActivos(orden: string): Prisma.ActivoOrderByWithRelationInput {
    const ordenMap: Record<string, Prisma.ActivoOrderByWithRelationInput> = {
      reciente: { creado_en: 'desc' },
      antiguo: { creado_en: 'asc' },
      precio_asc: { precio_por_token: 'asc' },
      precio_desc: { precio_por_token: 'desc' },
      rentabilidad: { rentabilidad_estimada: 'desc' },
    };

    return ordenMap[orden] || ordenMap.reciente;
  }
}
