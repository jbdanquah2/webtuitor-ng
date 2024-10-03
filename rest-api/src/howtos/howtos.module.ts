import { Module } from '@nestjs/common';
import { HowtosService } from './howtos.service';
import { HowtosController } from './howtos.controller';

@Module({
  controllers: [HowtosController],
  providers: [HowtosService],
})
export class HowtosModule {}
