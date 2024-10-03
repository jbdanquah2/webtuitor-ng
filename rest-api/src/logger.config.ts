import * as winston from 'winston';

const customColors = {
    info: 'green',
    warn: 'yellow',
    error: 'red',
    debug: 'blue',
};

winston.addColors(customColors);

export const winstonConfig = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
    },
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, context, ...metadata  }) => {

            if (typeof context === 'object') {
                context = context.context;
            }

            if (context === 'NestFactory' || context === 'InstanceLoader' || context === 'RoutesResolver' || context === 'RouterExplorer') {
                return `${timestamp} [${context}] ${level}: ${message}`;
            }

            let logMessage = `${level}: [${context || 'Application'}] ${message}`;
            if (Object.keys(metadata).length) {
                logMessage += ` | ${JSON.stringify(metadata, null, 4)}`;
            }
            return logMessage;
        }),
    ),
    transports: [

        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.uncolorize(),
                winston.format.timestamp(),
                winston.format.json(),
            ),
        })
    ],
    level: 'debug', // Set the default log level to 'debug' or lower
};
