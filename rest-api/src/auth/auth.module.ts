import {Module} from "@nestjs/common";
import {AuthController} from "./controllers/auth.controller";
import {UsersModule} from "../users/users.module";
import {AuthService} from "./auth.service";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from "./jwt.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {WinstonModule} from "nest-winston";
import {winstonConfig} from "../logger.config";

@Module({
    imports: [
        UsersModule,
        WinstonModule.forRoot(winstonConfig),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const production = configService.get<string>('production');
                return {
                    secret: configService.get<string>('JWT_SECRET'),
                    signOptions: production == 'true' ? { expiresIn: '12h' } : { expiresIn: '30d'},
                }
            },
        }),
        TypeOrmModule.forFeature([
            User
        ]),
        ConfigModule
    ],
    controllers: [
        AuthController
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {
    constructor() {
    }
}
