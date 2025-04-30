import * as winston from 'winston';

const { combine, timestamp, align, printf, colorize, label } = winston.format;

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: combine(
    colorize({ all: true }),
    align(),
    timestamp(),
    label({ label: 'NOTI-API' }),
    printf(({ timestamp, level, message, context, trace, label }) => {
      const indent = context === 'InstanceLoader' ? '  ' : '';
      const logMessage = `${timestamp} [${label}] [${context ?? '-'}] ${level}: ${indent}${message}`;
      return trace ? `${logMessage}\n${trace}` : logMessage;
    }),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
