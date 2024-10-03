import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger.config';

export const logger = WinstonModule.createLogger(winstonConfig);
