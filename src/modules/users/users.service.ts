import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandlerService } from 'src/common/services/error-handler.service';
import { Channel } from 'src/entities/Channels.entity';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    @InjectRepository(Channel) private channelsRepository: Repository<Channel>,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  findAll(): Promise<User[]> {
    this.logger.log(`Getting all enable Users...`);
    return this.repository.find({
      where: { enable: true },
      cache: true,
      relations: ['channels'],
    });
  }

  findAllByUserId(id: string): Promise<Channel[]> {
    this.logger.log(`Getting all enable channels by user id: ${id}`);
    return this.channelsRepository.find({ where: { users: { id } } });
  }

  async findByCredentials(id: string, secret: string) {
    return this.repository.findOne({
      where: {
        clientId: id,
        clientSecret: secret,
      },
      relations: [
        'role',
        'role.permissions',
        'role.permissions.module',
        'role.permissions.action',
      ],
    });
  }
}
