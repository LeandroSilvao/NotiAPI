import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandlerService } from 'src/common/services/error-handler.service';
import { Channel } from 'src/entities/Channels.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ChannelsService {
  private logger = new Logger('ChannelsService');

  constructor(
    @InjectRepository(Channel) private repository: Repository<Channel>,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  findAll(): Promise<Channel[]> {
    this.logger.log(`Getting all enable channels...`);
    return this.repository.find({ where: { enable: true }, cache: true });
  }

  async findByIds(Ids: string[]): Promise<Channel[]> {
    this.logger.log(`Finding channels by ids: ${Ids.join()}`);

    try {
      const channels = await this.repository.find({
        where: { enable: true, id: In(Ids) },
        cache: true,
      });

      if (channels.length === 0 || Ids.length !== channels.length) {
        const foundIds = channels.map((channel) => channel.id);
        const notFoundIds = Ids.filter((id) => !foundIds.includes(id));

        this.logger.error(
          `Channels not found for IDs: ${notFoundIds.join(', ')}`,
        );
        throw new NotFoundException(
          `Channels not found for IDs: ${notFoundIds.join(', ')}`,
        );
      }

      return channels;
    } catch (error) {
      this.logger.error(`Error on get Channel(s): ${JSON.stringify(error)}`);
      this.errorHandler.handle(error, 'Error on get Channel(s) - ');
    }
  }
}
