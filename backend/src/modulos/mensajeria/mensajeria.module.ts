import { Module } from '@nestjs/common';
import { MensajeriaController } from './mensajeria.controller';
import { MensajeriaService } from './mensajeria.service';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MensajeriaController],
  providers: [MensajeriaService],
  exports: [MensajeriaService],
})
export class MensajeriaModule {}
