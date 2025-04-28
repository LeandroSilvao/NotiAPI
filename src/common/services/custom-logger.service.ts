import { Injectable, LoggerService } from '@nestjs/common';
import logger from 'src/config/winston.config';

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: any, context?: string) {
    logger.info(message, { context: context ?? 'GLOBAL' });
  }

  error(message: any, trace?: string, context?: string) {
    logger.error(message, { context: context ?? 'GLOBAL', trace });
  }

  warn(message: any, context?: string) {
    logger.warn(message, { context: context ?? 'GLOBAL' });
  }

  debug?(message: any, context?: string) {
    logger.debug(message, { context: context ?? 'GLOBAL' });
  }

  verbose?(message: any, context?: string) {
    logger.verbose(message, { context: context ?? 'GLOBAL' });
  }
}
