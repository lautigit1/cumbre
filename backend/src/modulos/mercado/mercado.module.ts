import { Module } from '@nestjs/common';
import { MercadoController } from './mercado.controller';
import { MercadoService } from './mercado.service';

@Module({
  controllers: [MercadoController],
  providers: [MercadoService],
  exports: [MercadoService],
})
export class MercadoModule {}
