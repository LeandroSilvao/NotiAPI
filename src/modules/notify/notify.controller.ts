import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'src/config/ZodValidationPipe.pipe';
import { NotifyDtoSchema } from 'src/schemas/Notify.schema';
import { NotifyService } from './notify.service';

@Controller("notify")
export class NotifyController {
  constructor(private readonly service: NotifyService) {}

  @Post()
  post(@Body(new ZodValidationPipe(NotifyDtoSchema)) body: any) {
    return {
      message: 'Message sent successfully',
      body,
    };
  }
}
