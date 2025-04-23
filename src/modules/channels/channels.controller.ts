import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChannelsService } from './channels.service';

@ApiTags('Channels')
@Controller("channels")
export class ChannelsController {
  constructor(private readonly service: ChannelsService) {}

  @Get()
  get() {
    return this.service.get();
  }
}
