import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotificacionesService } from './notificaciones.service';
import { GuardJwt } from '@/modulos/identidad/guards/jwt.guard';
import { UsuarioActual } from '@/comun/decoradores/usuario-actual.decorator';
import { MarcarLeidaDto } from './dto/marcar-leida.dto';
import { ConfigurarPreferenciasDto } from './dto/configurar-preferencias.dto';
import { ListarNotificacionesDto } from './dto/listar-notificaciones.dto';

@ApiTags('Notificaciones')
@ApiBearerAuth()
@Controller('notificaciones')
@UseGuards(GuardJwt)
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar notificaciones del usuario' })
  @ApiResponse({ status: 200, description: 'Notificaciones obtenidas correctamente' })
  async listar(
    @UsuarioActual('sub') usuarioId: string,
    @Query() query: ListarNotificacionesDto,
  ) {
    return this.notificacionesService.listar(
      usuarioId,
      query.leida,
      query.limite,
      query.pagina,
    );
  }

  @Get('no-leidas/contador')
  @ApiOperation({ summary: 'Obtener contador de notificaciones no leídas' })
  @ApiResponse({ status: 200, description: 'Contador obtenido correctamente' })
  async contarNoLeidas(@UsuarioActual('sub') usuarioId: string) {
    const cantidad = await this.notificacionesService.contarNoLeidas(usuarioId);
    return { noLeidas: cantidad };
  }

  @Post('marcar-leidas')
  @ApiOperation({ summary: 'Marcar notificaciones como leídas' })
  @ApiResponse({ status: 200, description: 'Notificaciones marcadas correctamente' })
  async marcarLeidas(
    @UsuarioActual('sub') usuarioId: string,
    @Body() dto: MarcarLeidaDto,
  ) {
    return this.notificacionesService.marcarComoLeida(usuarioId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una notificación' })
  @ApiResponse({ status: 200, description: 'Notificación eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
  async eliminar(
    @UsuarioActual('sub') usuarioId: string,
    @Param('id') id: string,
  ) {
    return this.notificacionesService.eliminar(usuarioId, id);
  }

  @Get('preferencias')
  @ApiOperation({ summary: 'Obtener preferencias de notificaciones' })
  @ApiResponse({ status: 200, description: 'Preferencias obtenidas correctamente' })
  async obtenerPreferencias(@UsuarioActual('sub') usuarioId: string) {
    return this.notificacionesService.obtenerPreferencias(usuarioId);
  }

  @Post('preferencias')
  @ApiOperation({ summary: 'Configurar preferencias de notificaciones' })
  @ApiResponse({ status: 200, description: 'Preferencias actualizadas correctamente' })
  async configurarPreferencias(
    @UsuarioActual('sub') usuarioId: string,
    @Body() dto: ConfigurarPreferenciasDto,
  ) {
    return this.notificacionesService.configurarPreferencias(usuarioId, dto as Record<string, boolean>);
  }
}
