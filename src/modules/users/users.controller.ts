import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  get() {
    return this.service.findAll();
  }

  @Get('/:id/channels')
  getByUserId(@Param('id') id: string) {
    return this.service.findAllByUserId(id);
  }
}
