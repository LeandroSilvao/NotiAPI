import { Controller, Get } from '@nestjs/common';
import { ChannelsService } from './channels.service';

@Controller("channels")
export class ChannelsController {
  constructor(private readonly service: ChannelsService) {}

  @Get()
  get() {
    return this.service.get();
  }
}
