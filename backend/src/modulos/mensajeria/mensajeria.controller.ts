import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MensajeriaService } from './mensajeria.service';
import { GuardJwt } from '@/modulos/identidad/guards/jwt.guard';
import { UsuarioActual } from '@/comun/decoradores/usuario-actual.decorator';
import { EnviarMensajeDto } from './dto/enviar-mensaje.dto';
import { ListarMensajesDto } from './dto/listar-mensajes.dto';

@ApiTags('Mensajería')
@ApiBearerAuth()
@Controller('mensajeria')
@UseGuards(GuardJwt)
export class MensajeriaController {
  constructor(private readonly mensajeriaService: MensajeriaService) {}

  @Post('enviar')
  @ApiOperation({ summary: 'Enviar un mensaje a otro usuario' })
  @ApiResponse({ status: 201, description: 'Mensaje enviado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario destinatario no encontrado' })
  async enviar(
    @UsuarioActual('sub') remitenteId: string,
    @Body() dto: EnviarMensajeDto,
  ) {
    return this.mensajeriaService.enviar(remitenteId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar mensajes del usuario' })
  @ApiResponse({ status: 200, description: 'Mensajes obtenidos correctamente' })
  async listar(
    @UsuarioActual('sub') usuarioId: string,
    @Query() query: ListarMensajesDto,
  ) {
    return this.mensajeriaService.listar(
      usuarioId,
      query.con_usuario,
      query.limite,
      query.pagina,
    );
  }

  @Get('conversaciones')
  @ApiOperation({ summary: 'Obtener lista de conversaciones' })
  @ApiResponse({ status: 200, description: 'Conversaciones obtenidas correctamente' })
  async obtenerConversaciones(@UsuarioActual('sub') usuarioId: string) {
    return this.mensajeriaService.obtenerConversaciones(usuarioId);
  }

  @Patch(':id/marcar-leido')
  @ApiOperation({ summary: 'Marcar mensaje como leído' })
  @ApiResponse({ status: 200, description: 'Mensaje marcado como leído' })
  @ApiResponse({ status: 404, description: 'Mensaje no encontrado' })
  async marcarLeido(
    @UsuarioActual('sub') usuarioId: string,
    @Param('id') mensajeId: string,
  ) {
    return this.mensajeriaService.marcarComoLeido(usuarioId, mensajeId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un mensaje' })
  @ApiResponse({ status: 200, description: 'Mensaje eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Mensaje no encontrado' })
  async eliminar(
    @UsuarioActual('sub') usuarioId: string,
    @Param('id') mensajeId: string,
  ) {
    return this.mensajeriaService.eliminar(usuarioId, mensajeId);
  }
}
