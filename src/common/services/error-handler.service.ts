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
      throw error; // Se o erro já for uma HttpException, simplesmente o relança
    }

    this.logger.error('An error occurred:', JSON.stringify(error));

    // Tratar erro de falta de metadados
    if (error instanceof EntityMetadataNotFoundError) {
      throw new NotFoundException(
        message ? message + ' Entity not found' : 'Entity not found',
      );
    }

    // Tratar erro de duplicação de entrada no banco de dados (único)
    if (error instanceof QueryFailedError) {
      const err = error as QueryFailedError & { code?: string };

      if (err.code === '23505') {
        throw new ConflictException(
          message ? message + ' Duplicate entry' : 'Duplicate entry',
        );
      }

      // Se o código do erro não for de duplicação, lançar erro genérico de falha na consulta
      throw new BadRequestException(
        message ? message + ' Database query failed' : 'Database query failed',
      );
    }

    // Se nenhum dos casos acima for aplicável, lançar erro interno
    throw new InternalServerErrorException(
      message ? message + ' Internal server error' : 'Internal server error',
    );
  }
}
