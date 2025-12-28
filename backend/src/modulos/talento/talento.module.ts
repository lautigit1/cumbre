import { Module } from '@nestjs/common';
import { TalentoController } from './talento.controller';
import { TalentoService } from './talento.service';

@Module({
  controllers: [TalentoController],
  providers: [TalentoService],
  exports: [TalentoService],
})
export class TalentoModule {}
