import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as process from 'process';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { EbooksModule } from './ebooks/ebooks.module';
import { HowtosModule } from './howtos/howtos.module';
import {AuthModule} from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return  {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [path.join(process.cwd(), 'dist/**/*.entity.js')],
          synchronize: true,
          migrations: ['./src/migration/*.ts'],
        }
      },
      inject: [ConfigService],

    }),
    AuthModule,
    UsersModule,
    EbooksModule,
    HowtosModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
