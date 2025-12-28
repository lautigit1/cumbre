import { Controller, Post, Get, Patch, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IdentidadService } from './identidad.service';
import { RegistroDto, registroSchema } from './dto/registro.dto';
import { IngresoDto, ingresoSchema } from './dto/ingreso.dto';
import { ActualizarPerfilDto, actualizarPerfilSchema } from './dto/actualizar-perfil.dto';
import {
  ActualizarBiometriaDto,
  actualizarBiometriaSchema,
} from './dto/actualizar-biometria.dto';
import { RefreshTokenDto, refreshTokenSchema } from './dto/refresh-token.dto';
import { ZodValidacionPipe } from '@/comun/pipes/zod-validacion.pipe';
import { Publico } from '@/comun/decoradores/publico.decorator';
import { UsuarioActual } from '@/comun/decoradores/usuario-actual.decorator';
import { GuardJwt } from './guards/jwt.guard';
import { PayloadJwt } from '@/comun/interfaces/autenticacion.interface';

@ApiTags('Identidad')
@Controller('identidad')
export class IdentidadController {
  constructor(private readonly identidadService: IdentidadService) {}

  @Post('registro')
  @Publico()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar un nuevo usuario', description: 'Crea una cuenta de usuario en el sistema con hash de contraseña seguro' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 409, description: 'El correo o legajo ya está en uso' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async registrar(@Body(new ZodValidacionPipe(registroSchema)) dto: RegistroDto) {
    return this.identidadService.registrar(dto);
  }

  @Post('ingreso')
  @Publico()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión', description: 'Autentica un usuario y devuelve tokens JWT (access y refresh)' })
  @ApiResponse({ status: 200, description: 'Autenticación exitosa' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas o cuenta bloqueada' })
  async ingreso(@Body(new ZodValidacionPipe(ingresoSchema)) dto: IngresoDto) {
    return this.identidadService.ingreso(dto);
  }

  @Get('perfil')
  @UseGuards(GuardJwt)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado', description: 'Devuelve la información completa del perfil del usuario actual' })
  @ApiResponse({ status: 200, description: 'Perfil obtenido exitosamente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async obtenerPerfil(@UsuarioActual() usuario: PayloadJwt) {
    return this.identidadService.obtenerPerfil(usuario.sub);
  }

  @Patch('perfil')
  @UseGuards(GuardJwt)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar perfil', description: 'Actualiza la información del perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil actualizado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 409, description: 'Conflicto con datos existentes' })
  async actualizarPerfil(
    @UsuarioActual() usuario: PayloadJwt,
    @Body(new ZodValidacionPipe(actualizarPerfilSchema)) dto: ActualizarPerfilDto,
  ) {
    return this.identidadService.actualizarPerfil(usuario.sub, dto);
  }

  @Patch('actualizar-biometria')
  @UseGuards(GuardJwt)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar patrones biométricos',
    description: 'Almacena patrones de comportamiento del usuario para verificación Human-Proof',
  })
  @ApiResponse({ status: 200, description: 'Patrones biométricos actualizados' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async actualizarBiometria(
    @UsuarioActual() usuario: PayloadJwt,
    @Body(new ZodValidacionPipe(actualizarBiometriaSchema)) dto: ActualizarBiometriaDto,
  ) {
    return this.identidadService.actualizarBiometria(usuario.sub, dto);
  }

  @Post('refrescar-token')
  @Publico()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refrescar access token', description: 'Genera un nuevo access token usando el refresh token' })
  @ApiResponse({ status: 200, description: 'Token refrescado exitosamente' })
  @ApiResponse({ status: 401, description: 'Refresh token inválido o expirado' })
  async refrescarToken(@Body(new ZodValidacionPipe(refreshTokenSchema)) dto: RefreshTokenDto) {
    return this.identidadService.refrescarToken(dto.refresh_token);
  }

  @Post('cerrar-sesion')
  @UseGuards(GuardJwt)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión', description: 'Invalida el refresh token del usuario' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async cerrarSesion(@UsuarioActual() usuario: PayloadJwt) {
    return this.identidadService.cerrarSesion(usuario.sub);
  }
}
