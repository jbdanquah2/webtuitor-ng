import { Module } from '@nestjs/common';
import { HowtosService } from './howtos.service';
import { HowtosController } from './howtos.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../users/entities/user.entity';
import {ConfigModule} from '@nestjs/config';
import {Howto} from './entities/howto.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      User,
      Howto
    ]),
    ConfigModule
  ],

  controllers: [HowtosController],
  providers: [HowtosService],
})
export class HowtosModule {


}
