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
import { TalentoService } from './talento.service';
import { CrearProyectoDto, crearProyectoSchema } from './dto/crear-proyecto.dto';
import { ActualizarProyectoDto, actualizarProyectoSchema } from './dto/actualizar-proyecto.dto';
import { ExplorarProyectosDto, explorarProyectosSchema } from './dto/explorar-proyectos.dto';
import { CrearPostulacionDto, crearPostulacionSchema } from './dto/crear-postulacion.dto';
import {
  ActualizarPostulacionDto,
  actualizarPostulacionSchema,
} from './dto/actualizar-postulacion.dto';
import { CrearHitoDto, crearHitoSchema } from './dto/crear-hito.dto';
import { CompletarHitoDto, completarHitoSchema } from './dto/completar-hito.dto';
import { CrearReviewDto } from './dto/crear-review.dto';
import { AgregarFavoritoDto } from './dto/agregar-favorito.dto';
import { ZodValidacionPipe } from '@/comun/pipes/zod-validacion.pipe';
import { GuardJwt } from '@/modulos/identidad/guards/jwt.guard';
import { UsuarioActual } from '@/comun/decoradores/usuario-actual.decorator';
import { PayloadJwt } from '@/comun/interfaces/autenticacion.interface';

@ApiTags('Talento')
@Controller('talento')
@UseGuards(GuardJwt)
@ApiBearerAuth()
export class TalentoController {
  constructor(private readonly talentoService: TalentoService) {}

  // ============================================
  // ENDPOINTS DE PROYECTOS
  // ============================================

  @Post('proyectos/crear')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear un nuevo proyecto',
    description: 'Publica una necesidad técnica o proyecto con habilidades requeridas',
  })
  @ApiResponse({ status: 201, description: 'Proyecto creado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async crearProyecto(
    @UsuarioActual() usuario: PayloadJwt,
    @Body(new ZodValidacionPipe(crearProyectoSchema)) dto: CrearProyectoDto,
  ) {
    return this.talentoService.crearProyecto(usuario.sub, dto);
  }

  @Get('proyectos/explorar')
  @ApiOperation({
    summary: 'Explorar proyectos disponibles',
    description: 'Listado de proyectos con paginación y filtros avanzados',
  })
  @ApiResponse({ status: 200, description: 'Listado de proyectos obtenido' })
  async explorarProyectos(
    @Query(new ZodValidacionPipe(explorarProyectosSchema)) dto: ExplorarProyectosDto,
  ) {
    return this.talentoService.explorarProyectos(dto);
  }

  @Get('proyectos/:id')
  @ApiOperation({
    summary: 'Obtener detalles de un proyecto',
    description: 'Información completa del proyecto incluyendo postulaciones y hitos',
  })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiResponse({ status: 200, description: 'Proyecto encontrado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  async obtenerProyecto(@Param('id') proyectoId: string) {
    return this.talentoService.obtenerProyecto(proyectoId);
  }

  @Patch('proyectos/:id')
  @ApiOperation({
    summary: 'Actualizar un proyecto',
    description: 'Modifica los datos de un proyecto existente (solo el creador)',
  })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiResponse({ status: 200, description: 'Proyecto actualizado' })
  @ApiResponse({ status: 403, description: 'No tienes permisos' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  async actualizarProyecto(
    @Param('id') proyectoId: string,
    @UsuarioActual() usuario: PayloadJwt,
    @Body(new ZodValidacionPipe(actualizarProyectoSchema)) dto: ActualizarProyectoDto,
  ) {
    return this.talentoService.actualizarProyecto(proyectoId, usuario.sub, dto);
  }

  @Delete('proyectos/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Eliminar un proyecto',
    description: 'Elimina permanentemente un proyecto (solo el creador)',
  })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiResponse({ status: 200, description: 'Proyecto eliminado' })
  @ApiResponse({ status: 403, description: 'No tienes permisos' })
  async eliminarProyecto(@Param('id') proyectoId: string, @UsuarioActual() usuario: PayloadJwt) {
    return this.talentoService.eliminarProyecto(proyectoId, usuario.sub);
  }

  // ============================================
  // ENDPOINTS DE POSTULACIONES
  // ============================================

  @Post('postularse/:proyectoId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Postularse a un proyecto',
    description: 'Vincula un profesional con un proyecto publicado',
  })
  @ApiParam({ name: 'proyectoId', description: 'ID del proyecto' })
  @ApiResponse({ status: 201, description: 'Postulación creada exitosamente' })
  @ApiResponse({ status: 400, description: 'No puedes postularte a este proyecto' })
  @ApiResponse({ status: 409, description: 'Ya has postulado a este proyecto' })
  async postularse(
    @Param('proyectoId') proyectoId: string,
    @UsuarioActual() usuario: PayloadJwt,
    @Body(new ZodValidacionPipe(crearPostulacionSchema)) dto: CrearPostulacionDto,
  ) {
    return this.talentoService.crearPostulacion(proyectoId, usuario.sub, dto);
  }

  @Patch('postulaciones/:id')
  @ApiOperation({
    summary: 'Actualizar estado de postulación',
    description: 'Acepta o rechaza una postulación (solo el creador del proyecto)',
  })
  @ApiParam({ name: 'id', description: 'ID de la postulación' })
  @ApiResponse({ status: 200, description: 'Postulación actualizada' })
  @ApiResponse({ status: 403, description: 'No tienes permisos' })
  async actualizarPostulacion(
    @Param('id') postulacionId: string,
    @UsuarioActual() usuario: PayloadJwt,
    @Body(new ZodValidacionPipe(actualizarPostulacionSchema)) dto: ActualizarPostulacionDto,
  ) {
    return this.talentoService.actualizarPostulacion(postulacionId, usuario.sub, dto);
  }

  @Get('mis-postulaciones')
  @ApiOperation({
    summary: 'Obtener mis postulaciones',
    description: 'Lista todas las postulaciones del usuario autenticado',
  })
  @ApiResponse({ status: 200, description: 'Listado de postulaciones' })
  async obtenerMisPostulaciones(@UsuarioActual() usuario: PayloadJwt) {
    return this.talentoService.obtenerMisPostulaciones(usuario.sub);
  }

  // ============================================
  // ENDPOINTS DE HITOS
  // ============================================

  @Post('proyectos/:proyectoId/hitos')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear hito de proyecto',
    description: 'Añade un hito o tarea a un proyecto (solo el creador)',
  })
  @ApiParam({ name: 'proyectoId', description: 'ID del proyecto' })
  @ApiResponse({ status: 201, description: 'Hito creado exitosamente' })
  @ApiResponse({ status: 403, description: 'No tienes permisos' })
  async crearHito(
    @Param('proyectoId') proyectoId: string,
    @UsuarioActual() usuario: PayloadJwt,
    @Body(new ZodValidacionPipe(crearHitoSchema)) dto: CrearHitoDto,
  ) {
    return this.talentoService.crearHito(proyectoId, usuario.sub, dto);
  }

  @Patch('hitos/completar/:id')
  @ApiOperation({
    summary: 'Completar o descompletar hito',
    description: 'Valida el avance de una tarea del proyecto (solo el creador)',
  })
  @ApiParam({ name: 'id', description: 'ID del hito' })
  @ApiResponse({ status: 200, description: 'Hito actualizado' })
  @ApiResponse({ status: 403, description: 'No tienes permisos' })
  async completarHito(
    @Param('id') hitoId: string,
    @UsuarioActual() usuario: PayloadJwt,
    @Body(new ZodValidacionPipe(completarHitoSchema)) dto: CompletarHitoDto,
  ) {
    return this.talentoService.completarHito(hitoId, usuario.sub, dto);
  }

  // ============================================
  // ENDPOINTS DE REVIEWS
  // ============================================

  @Post('reviews/crear')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear una reseña',
    description: 'Deja una reseña sobre un proyecto, usuario o activo',
  })
  @ApiResponse({ status: 201, description: 'Reseña creada correctamente' })
  async crearReview(
    @UsuarioActual() usuario: PayloadJwt,
    @Body() dto: CrearReviewDto,
  ) {
    return this.talentoService.crearReview(usuario.sub, dto);
  }

  @Get('reviews/:tipo/:entidadId')
  @ApiOperation({
    summary: 'Obtener reseñas de una entidad',
    description: 'Obtiene todas las reseñas y estadísticas (promedio, distribución)',
  })
  @ApiParam({ name: 'tipo', description: 'Tipo de entidad (PROYECTO, USUARIO, ACTIVO)' })
  @ApiParam({ name: 'entidadId', description: 'ID de la entidad' })
  @ApiResponse({ status: 200, description: 'Reseñas obtenidas' })
  async obtenerReviews(
    @Param('tipo') tipo: string,
    @Param('entidadId') entidadId: string,
  ) {
    return this.talentoService.obtenerReviews(tipo, entidadId);
  }

  @Get('mis-reviews')
  @ApiOperation({
    summary: 'Obtener reseñas sobre mí',
    description: 'Obtiene todas las reseñas que otros han dejado sobre ti',
  })
  @ApiResponse({ status: 200, description: 'Reseñas obtenidas' })
  async obtenerMisReviews(@UsuarioActual() usuario: PayloadJwt) {
    return this.talentoService.obtenerReviewsDelUsuario(usuario.sub);
  }

  // ============================================
  // ENDPOINTS DE FAVORITOS
  // ============================================

  @Post('favoritos')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Agregar a favoritos',
    description: 'Agrega un proyecto o activo a tus favoritos',
  })
  @ApiResponse({ status: 201, description: 'Agregado a favoritos' })
  async agregarFavorito(
    @UsuarioActual() usuario: PayloadJwt,
    @Body() dto: AgregarFavoritoDto,
  ) {
    return this.talentoService.agregarFavorito(usuario.sub, dto);
  }

  @Delete('favoritos/:tipo/:entidadId')
  @ApiOperation({
    summary: 'Eliminar de favoritos',
    description: 'Elimina un proyecto o activo de tus favoritos',
  })
  @ApiParam({ name: 'tipo', description: 'Tipo (PROYECTO, ACTIVO)' })
  @ApiParam({ name: 'entidadId', description: 'ID de la entidad' })
  @ApiResponse({ status: 200, description: 'Eliminado de favoritos' })
  async eliminarFavorito(
    @UsuarioActual() usuario: PayloadJwt,
    @Param('tipo') tipo: string,
    @Param('entidadId') entidadId: string,
  ) {
    return this.talentoService.eliminarFavorito(usuario.sub, tipo, entidadId);
  }

  @Get('favoritos')
  @ApiOperation({
    summary: 'Listar mis favoritos',
    description: 'Obtiene todos tus proyectos y activos favoritos',
  })
  @ApiResponse({ status: 200, description: 'Favoritos obtenidos' })
  async listarFavoritos(
    @UsuarioActual() usuario: PayloadJwt,
    @Query('tipo') tipo?: string,
  ) {
    return this.talentoService.listarFavoritos(usuario.sub, tipo);
  }

  @Get('favoritos/:tipo/:entidadId/verificar')
  @ApiOperation({
    summary: 'Verificar si es favorito',
    description: 'Comprueba si una entidad está en tus favoritos',
  })
  @ApiResponse({ status: 200, description: 'Verificado' })
  async verificarFavorito(
    @UsuarioActual() usuario: PayloadJwt,
    @Param('tipo') tipo: string,
    @Param('entidadId') entidadId: string,
  ) {
    return this.talentoService.verificarFavorito(usuario.sub, tipo, entidadId);
  }
}
