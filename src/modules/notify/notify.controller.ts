import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/config/ZodValidationPipe.pipe';
import { NotifyDto, NotifyDtoSchema } from 'src/schemas/Notify.schema';
import NodeMailerEmail from 'src/services/nodemailer/NodeMailerEmail.service';
import { NotifyService } from './notify.service';

@Controller('notify')
@ApiTags('Notify')
export class NotifyController {
  constructor(
    private readonly service: NotifyService,
    private readonly nodeMailer: NodeMailerEmail,
  ) {}

  @Post()
  post(@Body(new ZodValidationPipe(NotifyDtoSchema)) body: NotifyDto) {
    return {
      message: 'Message sent successfully',
      body,
    };
  }
}
