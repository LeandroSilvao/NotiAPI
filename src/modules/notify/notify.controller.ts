import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/common/pipes/ZodValidationPipe.pipe';
import { NotifyResponseDto } from 'src/modules/notify/dto/NotifyResponseDto';
import {
  NotifyDto,
  NotifyDtoSchema,
} from 'src/modules/notify/schemas/Notify.schema';
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
  post(
    @Body(new ZodValidationPipe(NotifyDtoSchema)) body: NotifyDto,
  ): Promise<NotifyResponseDto> {
    return this.service.Notify(body);
  }
}
