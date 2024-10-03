import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { UsersService } from "../../users/users.service";
import { UpdateUserDto } from "../../users/dto/update-user.dto";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger as WinstonLogger } from 'winston';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    ) {}

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        this.logger.info('Called POST auth/login...', { context: 'AuthController' });

        try {
            this.logger.debug('Attempting to authenticate user', { context: 'AuthController', email: loginUserDto.email });

            const auth = await this.authService.login(loginUserDto);

            if (auth) {
                this.logger.debug(`Updating last login for user ID: ${auth.user.id}`, { context: 'AuthController' });
                await this.userService.update(auth.user.id, {
                    last_login: new Date(),
                } as UpdateUserDto);
            }

            this.logger.info('User authenticated successfully', { context: 'AuthController', userId: auth.user.id });

            return {
                message: 'success',
                status: 200,
                access_token: auth.access_token,
            };
        } catch (err) {
            this.logger.error('An error occurred during login', { context: 'AuthController', error: err.message });

            return {
                message: err.message,
                status: 404,
            };
        }
    }
}
