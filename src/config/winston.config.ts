import * as winston from 'winston';

const { combine, timestamp, align, printf, colorize, label } = winston.format;
const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: combine(
    colorize({ all: true }),
    align(),
    timestamp(),
    label({ label: 'NOTI-API', message: true }),
    printf(({ timestamp, level, message, context, trace }) => {
      return `${timestamp} [${context ?? '-'}] ${level}: ${message}${
        trace ? `\n${trace}` : ''
      }`;
    }),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
