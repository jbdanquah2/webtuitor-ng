import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import {UsersService} from '../users/users.service';
import { Logger as WinstonLogger } from 'winston';
import {WINSTON_MODULE_PROVIDER} from 'nest-winston';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {

        const user = await this.userService.findOneByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(pass, user.password);
            if (isPasswordValid) {
                const { password, ...result } = user;
                return result;
            }
        }

        return null;
    }

    async login(loginUserDto: LoginUserDto): Promise<any> {
        this.logger.debug('Processing login request', { context: 'AuthService', email: loginUserDto.email });


        const user = await this.
        validateUser(loginUserDto.email, loginUserDto.password);

        if (!user) {
            this.logger.warn('Login failed: Unauthorized', { context: 'AuthService', email: loginUserDto.email });
            throw new UnauthorizedException();
        }

        const payload: JwtPayload = { ...user };
        const token = this.jwtService.sign(payload);

        this.logger.info('Login successful, JWT generated', { context: 'AuthService', userId: user.id });

        return {
            access_token: token,
            user,
        };
    }
}
