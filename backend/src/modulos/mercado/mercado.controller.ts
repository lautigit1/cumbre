import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { MercadoService } from './mercado.service';
import { DigitalizarActivoDto, digitalizarActivoSchema } from './dto/digitalizar-activo.dto';
import { ActualizarActivoDto, actualizarActivoSchema } from './dto/actualizar-activo.dto';
import {
  ActivosDisponiblesDto,
  activosDisponiblesSchema,
} from './dto/activos-disponibles.dto';
import { CrearInversionDto, crearInversionSchema } from './dto/crear-inversion.dto';
import {
  EjecutarTransaccionDto,
  ejecutarTransaccionSchema,
} from './dto/ejecutar-transaccion.dto';
import { ObtenerHistorialPrecioDto } from './dto/obtener-historial-precio.dto';
import { ListarMisInversionesDto } from './dto/listar-mis-inversiones.dto';
import { ZodValidacionPipe } from '@/comun/pipes/zod-validacion.pipe';
import { GuardJwt } from '@/modulos/identidad/guards/jwt.guard';
import { UsuarioActual } from '@/comun/decoradores/usuario-actual.decorator';
import { PayloadJwt } from '@/comun/interfaces/autenticacion.interface';

@ApiTags('Mercado de Activos')
@Controller('mercado')
@UseGuards(GuardJwt)
@ApiBearerAuth()
export class MercadoController {
  constructor(private readonly mercadoService: MercadoService) {}

  // ============================================
  // ENDPOINTS DE ACTIVOS
  // ============================================

  @Post('activos/digitalizar')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Digitalizar un activo',
    description: 'Crea la representación digital de un bien físico o proyecto para tokenización',
  })
  @ApiResponse({ status: 201, description: 'Activo digitalizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async digitalizarActivo(
    @UsuarioActual() usuario: PayloadJwt,
    @Body(new ZodValidacionPipe(digitalizarActivoSchema)) dto: DigitalizarActivoDto,
  ) {
    return this.mercadoService.digitalizarActivo(usuario.sub, dto);
  }

  @Get('activos/disponibles')
  @ApiOperation({
    summary: 'Marketplace de activos',
    description: 'Lista todos los activos disponibles para inversión con filtros avanzados',
  })
  @ApiResponse({ status: 200, description: 'Listado de activos obtenido' })
  async obtenerActivosDisponibles(
    @Query(new ZodValidacionPipe(activosDisponiblesSchema)) dto: ActivosDisponiblesDto,
  ) {
    return this.mercadoService.obtenerActivosDisponibles(dto);
  }

  @Get('activos/:id')
  @ApiOperation({
    summary: 'Obtener detalles de un activo',
    description: 'Información completa del activo incluyendo inversiones realizadas',
  })
  @ApiParam({ name: 'id', description: 'ID del activo' })
  @ApiResponse({ status: 200, description: 'Activo encontrado' })
  @ApiResponse({ status: 404, description: 'Activo no encontrado' })
  async obtenerActivo(@Param('id') activoId: string) {
    return this.mercadoService.obtenerActivo(activoId);
  }

  @Patch('activos/:id')
  @ApiOperation({
    summary: 'Actualizar un activo',
    description: 'Modifica los datos de un activo (solo el creador)',
  })
  @ApiParam({ name: 'id', description: 'ID del activo' })
  @ApiResponse({ status: 200, description: 'Activo actualizado' })
  @ApiResponse({ status: 403, description: 'No tienes permisos' })
  async actualizarActivo(
    @Param('id') activoId: string,
    @UsuarioActual() usuario: PayloadJwt,
    @Body(new ZodValidacionPipe(actualizarActivoSchema)) dto: ActualizarActivoDto,
  ) {
    return this.mercadoService.actualizarActivo(activoId, usuario.sub, dto);
  }

  @Delete('activos/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Eliminar un activo',
    description: 'Elimina un activo sin inversiones (solo el creador)',
  })
  @ApiParam({ name: 'id', description: 'ID del activo' })
  @ApiResponse({ status: 200, description: 'Activo eliminado' })
  @ApiResponse({ status: 400, description: 'El activo tiene inversiones' })
  @ApiResponse({ status: 403, description: 'No tienes permisos' })
  async eliminarActivo(@Param('id') activoId: string, @UsuarioActual() usuario: PayloadJwt) {
    return this.mercadoService.eliminarActivo(activoId, usuario.sub);
  }

  // ============================================
  // ENDPOINTS DE INVERSIONES
  // ============================================

  @Post('activos/:activoId/invertir')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Invertir en un activo',
    description: 'Compra tokens de un activo digitalizado',
  })
  @ApiParam({ name: 'activoId', description: 'ID del activo' })
  @ApiResponse({ status: 201, description: 'Inversión realizada exitosamente' })
  @ApiResponse({ status: 400, description: 'No hay tokens disponibles o datos inválidos' })
  async crearInversion(
    @Param('activoId') activoId: string,
    @UsuarioActual() usuario: PayloadJwt,
    @Body(new ZodValidacionPipe(crearInversionSchema)) dto: CrearInversionDto,
  ) {
    return this.mercadoService.crearInversion(activoId, usuario.sub, dto);
  }

  // ============================================
  // ENDPOINTS DE TRANSACCIONES
  // ============================================

  @Post('transacciones/ejecutar')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Ejecutar una transacción',
    description: 'Realiza una transferencia de valor entre usuarios o registra una operación',
  })
  @ApiResponse({ status: 201, description: 'Transacción ejecutada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Destinatario no encontrado' })
  async ejecutarTransaccion(
    @UsuarioActual() usuario: PayloadJwt,
    @Body(new ZodValidacionPipe(ejecutarTransaccionSchema)) dto: EjecutarTransaccionDto,
  ) {
    return this.mercadoService.ejecutarTransaccion(usuario.sub, dto);
  }

  @Get('transacciones/historial')
  @ApiOperation({
    summary: 'Obtener historial de transacciones',
    description: 'Lista todas las transacciones donde el usuario es remitente o destinatario',
  })
  @ApiResponse({ status: 200, description: 'Historial de transacciones' })
  async obtenerMisTransacciones(@UsuarioActual() usuario: PayloadJwt) {
    return this.mercadoService.obtenerMisTransacciones(usuario.sub);
  }

  // ============================================
  // ENDPOINTS DE HISTORIAL DE PRECIOS
  // ============================================

  @Get('activos/:activoId/historial-precio')
  @ApiOperation({
    summary: 'Obtener historial de precios',
    description: 'Obtiene el historial de precios de un activo con estadísticas y granularidad',
  })
  @ApiParam({ name: 'activoId', description: 'ID del activo' })
  @ApiResponse({ status: 200, description: 'Historial obtenido correctamente' })
  async obtenerHistorialPrecio(
    @Param('activoId') activoId: string,
    @Query() query: ObtenerHistorialPrecioDto,
  ) {
    return this.mercadoService.obtenerHistorialPrecio(
      activoId,
      query.dias,
      query.granularidad,
    );
  }

  @Patch('activos/:activoId/precio')
  @ApiOperation({
    summary: 'Actualizar precio de activo',
    description: 'Registra un cambio de precio en el historial (solo creador)',
  })
  @ApiParam({ name: 'activoId', description: 'ID del activo' })
  @ApiResponse({ status: 200, description: 'Precio actualizado' })
  async actualizarPrecio(
    @Param('activoId') activoId: string,
    @Body() { nuevo_precio }: { nuevo_precio: number },
  ) {
    return this.mercadoService.registrarCambioPrecio(activoId, nuevo_precio);
  }

  // ============================================
  // ENDPOINTS DE INVERSIONES DEL USUARIO
  // ============================================

  @Get('mis-inversiones')
  @ApiOperation({
    summary: 'Listar mis inversiones',
    description: 'Obtiene todas las inversiones del usuario con estadísticas de ganancia',
  })
  @ApiResponse({ status: 200, description: 'Inversiones obtenidas' })
  async obtenerMisInversiones(
    @UsuarioActual() usuario: PayloadJwt,
    @Query() query: ListarMisInversionesDto,
  ) {
    return this.mercadoService.obtenerMisInversiones(
      usuario.sub,
      query.estado as any,
      query.limite,
      query.pagina,
    );
  }

  @Get('inversiones/:inversionId')
  @ApiOperation({
    summary: 'Obtener detalle de una inversión',
    description: 'Obtiene información detallada de una inversión específica con estadísticas',
  })
  @ApiParam({ name: 'inversionId', description: 'ID de la inversión' })
  @ApiResponse({ status: 200, description: 'Detalle obtenido' })
  @ApiResponse({ status: 404, description: 'Inversión no encontrada' })
  async obtenerDetalleInversion(
    @UsuarioActual() usuario: PayloadJwt,
    @Param('inversionId') inversionId: string,
  ) {
    return this.mercadoService.obtenerDetalleInversion(usuario.sub, inversionId);
  }
}
