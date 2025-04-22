import { Controller, Get } from '@nestjs/common';
import { NotifyService } from './notify.service';

@Controller()
export class NotifyController {
  constructor(private readonly service: NotifyService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}
