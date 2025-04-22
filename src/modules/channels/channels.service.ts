import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/entities/Channels.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel) private repository: Repository<Channel>,
  ) {}

  get(): Promise<Channel[]> {
    return this.repository.find({ where: { enable: true },cache: true })
  }
}
