import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsDecorator } from 'src/decorators/Permissions.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import { ChannelsService } from './channels.service';

@ApiTags('Channels')
@Controller('channels')
export class ChannelsController {
  constructor(private readonly service: ChannelsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @PermissionsDecorator({ name: 'read', module: 'channels' })
  get() {
    return this.service.findAll();
  }
}
