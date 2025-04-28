import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: any) {}

  transform(value: any) {
    try {
      this.schema.parse(value);
      return value;
    } catch (e) {
      if (e instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: e.errors.map((err) => ({
            code: err.code,
            minimum: err?.['minimum'],
            type: err?.['type'],
            message: err.message,
            path: err.path.join(' '),
          })),
        });
      }
      throw e;
    }
  }
}
