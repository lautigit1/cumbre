import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { PrismaService } from '@/core/prisma/prisma.service';
import { RegistroDto } from './dto/registro.dto';
import { IngresoDto } from './dto/ingreso.dto';
import { ActualizarPerfilDto } from './dto/actualizar-perfil.dto';
import { ActualizarBiometriaDto } from './dto/actualizar-biometria.dto';
import { PayloadJwt, RespuestaAutenticacion } from '@/comun/interfaces/autenticacion.interface';

@Injectable()
export class IdentidadService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Registra un nuevo usuario en el sistema
   */
  async registrar(dto: RegistroDto): Promise<RespuestaAutenticacion> {
    // Verificar si el correo ya existe
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { correo: dto.correo },
    });

    if (usuarioExistente) {
      throw new ConflictException('Ya existe un usuario con ese correo electrónico');
    }

    // Verificar legajo UTN si se proporciona
    if (dto.legajoUtn) {
      const legajoExistente = await this.prisma.usuario.findUnique({
        where: { legajoUtn: dto.legajoUtn },
      });

      if (legajoExistente) {
        throw new ConflictException('Ya existe un usuario con ese legajo UTN');
      }
    }

    // Hashear la contraseña con Argon2
    const claveHasheada = await this.hashearClave(dto.clave);

    // Crear el usuario
    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        correo: dto.correo,
        clave: claveHasheada,
        legajoUtn: dto.legajoUtn,
        tipoUsuario: dto.tipoUsuario,
      },
    });

    // Generar tokens
    return this.generarTokens(usuario);
  }

  /**
   * Autentica un usuario y devuelve los tokens
   */
  async ingreso(dto: IngresoDto): Promise<RespuestaAutenticacion> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo: dto.correo },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Verificar si el usuario está bloqueado
    if (usuario.bloqueado) {
      throw new UnauthorizedException(
        'Tu cuenta ha sido bloqueada por múltiples intentos fallidos. Contacta al administrador',
      );
    }

    // Verificar la contraseña
    const claveValida = await this.verificarClave(dto.clave, usuario.clave);

    if (!claveValida) {
      // Incrementar intentos fallidos
      await this.prisma.usuario.update({
        where: { id: usuario.id },
        data: {
          intentos_fallidos: usuario.intentos_fallidos + 1,
          bloqueado: usuario.intentos_fallidos + 1 >= 5,
        },
      });

      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Resetear intentos fallidos y actualizar última sesión
    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        intentos_fallidos: 0,
        ultima_sesion: new Date(),
      },
    });

    // Generar tokens
    return this.generarTokens(usuario);
  }

  /**
   * Obtiene el perfil del usuario autenticado
   */
  async obtenerPerfil(usuarioId: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        correo: true,
        legajoUtn: true,
        tipoUsuario: true,
        reputacion: true,
        creado_en: true,
        ultima_sesion: true,
        habilidades: {
          include: {
            habilidad: true,
          },
        },
        proyectos_creados: {
          where: { estado: 'PUBLICADO' },
          take: 5,
          orderBy: { creado_en: 'desc' },
        },
        inversiones: {
          take: 5,
          orderBy: { creado_en: 'desc' },
          include: {
            activo: {
              select: {
                nombre: true,
                tipo: true,
              },
            },
          },
        },
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }

  /**
   * Actualiza el perfil del usuario
   */
  async actualizarPerfil(usuarioId: string, dto: ActualizarPerfilDto) {
    // Verificar legajo si se está actualizando
    if (dto.legajoUtn) {
      const legajoExistente = await this.prisma.usuario.findFirst({
        where: {
          legajoUtn: dto.legajoUtn,
          NOT: { id: usuarioId },
        },
      });

      if (legajoExistente) {
        throw new ConflictException('Ya existe un usuario con ese legajo UTN');
      }
    }

    const usuarioActualizado = await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: dto,
      select: {
        id: true,
        nombre: true,
        apellido: true,
        correo: true,
        legajoUtn: true,
        tipoUsuario: true,
        reputacion: true,
      },
    });

    return usuarioActualizado;
  }

  /**
   * Actualiza los patrones biométricos del usuario (Human-Proof)
   */
  async actualizarBiometria(usuarioId: string, dto: ActualizarBiometriaDto) {
    const usuario = await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        patrones_biometricos: dto.patrones_biometricos,
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
      },
    });

    return {
      mensaje: 'Patrones biométricos actualizados correctamente',
      usuario,
    };
  }

  /**
   * Refresca el access token usando el refresh token
   */
  async refrescarToken(refreshToken: string): Promise<RespuestaAutenticacion> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const usuario = await this.prisma.usuario.findUnique({
        where: { id: payload.sub },
      });

      if (!usuario || usuario.refresh_token !== refreshToken) {
        throw new UnauthorizedException('Refresh token inválido');
      }

      return this.generarTokens(usuario);
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  /**
   * Cierra sesión del usuario (invalida el refresh token)
   */
  async cerrarSesion(usuarioId: string) {
    await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { refresh_token: null },
    });

    return { mensaje: 'Sesión cerrada correctamente' };
  }

  // ============================================
  // MÉTODOS PRIVADOS
  // ============================================

  /**
   * Hashea una contraseña usando Argon2
   */
  private async hashearClave(clave: string): Promise<string> {
    return argon2.hash(clave, {
      type: argon2.argon2id,
      memoryCost: this.configService.get<number>('ARGON2_MEMORY_COST') || 65536,
      timeCost: this.configService.get<number>('ARGON2_TIME_COST') || 3,
      parallelism: this.configService.get<number>('ARGON2_PARALLELISM') || 4,
    });
  }

  /**
   * Verifica una contraseña contra su hash
   */
  private async verificarClave(clave: string, hash: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, clave);
    } catch (error) {
      return false;
    }
  }

  /**
   * Genera access y refresh tokens para un usuario
   */
  private async generarTokens(usuario: any): Promise<RespuestaAutenticacion> {
    const payload: PayloadJwt = {
      sub: usuario.id,
      correo: usuario.correo,
      tipoUsuario: usuario.tipoUsuario,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION') || '15m',
      } as any),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d',
      } as any),
    ]);

    // Guardar el refresh token en la base de datos
    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: { refresh_token: refreshToken },
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        tipoUsuario: usuario.tipoUsuario,
        reputacion: usuario.reputacion,
      },
    };
  }

  /**
   * Valida un usuario por su ID (usado por Passport)
   */
  async validarUsuarioPorId(usuarioId: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: {
        id: true,
        correo: true,
        tipoUsuario: true,
        bloqueado: true,
      },
    });

    if (!usuario || usuario.bloqueado) {
      return null;
    }

    return usuario;
  }
}
