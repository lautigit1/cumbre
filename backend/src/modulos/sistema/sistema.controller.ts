import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SistemaService } from './sistema.service';
import { GuardJwt } from '@/modulos/identidad/guards/jwt.guard';
import { Publico } from '@/comun/decoradores/publico.decorator';
import { Roles } from '@/comun/decoradores/roles.decorator';
import { GuardRoles } from '@/comun/guards/roles.guard';
import { TipoUsuario } from '@prisma/client';

@ApiTags('Sistema')
@Controller('sistema')
export class SistemaController {
  constructor(private readonly sistemaService: SistemaService) {}

  @Get('salud')
  @Publico()
  @ApiOperation({
    summary: 'Healthcheck del sistema',
    description: 'Verifica el estado de la API y la conexión a la base de datos',
  })
  @ApiResponse({ status: 200, description: 'Sistema operativo' })
  async obtenerSalud() {
    return this.sistemaService.obtenerSalud();
  }

  @Get('metricas/pbi-provincial')
  @UseGuards(GuardJwt, GuardRoles)
  @Roles(TipoUsuario.ADMINISTRADOR)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Métricas del PBI Provincial',
    description:
      'Agregación de datos financieros del ecosistema CUMBRE (solo administradores)',
  })
  @ApiResponse({ status: 200, description: 'Métricas obtenidas exitosamente' })
  @ApiResponse({ status: 403, description: 'No tienes permisos suficientes' })
  async obtenerMetricasPbiProvincial() {
    return this.sistemaService.obtenerMetricasPbiProvincial();
  }

  @Get('metricas/estadisticas')
  @UseGuards(GuardJwt, GuardRoles)
  @Roles(TipoUsuario.ADMINISTRADOR)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Estadísticas detalladas del ecosistema',
    description: 'Información detallada sobre el estado del ecosistema (solo administradores)',
  })
  @ApiResponse({ status: 200, description: 'Estadísticas obtenidas' })
  @ApiResponse({ status: 403, description: 'No tienes permisos suficientes' })
  async obtenerEstadisticas() {
    return this.sistemaService.obtenerEstadisticasDetalladas();
  }

  @Get('metricas/top-usuarios')
  @UseGuards(GuardJwt)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Top usuarios por reputación',
    description: 'Lista los usuarios con mayor reputación en la plataforma',
  })
  @ApiResponse({ status: 200, description: 'Top usuarios obtenido' })
  async obtenerTopUsuarios(@Query('limite') limite?: string) {
    const limiteNum = limite ? parseInt(limite, 10) : 10;
    return this.sistemaService.obtenerTopUsuarios(limiteNum);
  }
}
