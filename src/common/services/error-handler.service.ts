import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityMetadataNotFoundError, QueryFailedError } from 'typeorm';

@Injectable()
export class ErrorHandlerService {
  private logger = new Logger('ErrorHandlerService');

  handle(error: unknown, message?: string): never {
    if (error instanceof HttpException) {
      throw error;
    }

    this.logger.error('An error occurred:', JSON.stringify(error));

    if (error instanceof EntityMetadataNotFoundError) {
      throw new NotFoundException(
        message ? message + ' Entity not found' : 'Entity not found',
      );
    }

    if (error instanceof QueryFailedError) {
      const err = error as QueryFailedError & { code?: string };

      if (err.code === '23505') {
        throw new ConflictException(
          message ? message + ' Duplicate entry' : 'Duplicate entry',
        );
      }

      throw new BadRequestException(
        message ? message + ' Database query failed' : 'Database query failed',
      );
    }

    throw new InternalServerErrorException(
      message ? message + ' Internal server error' : 'Internal server error',
    );
  }
}
