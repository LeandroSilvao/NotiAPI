import { Injectable, Logger } from '@nestjs/common';
import { ErrorHandlerService } from 'src/common/services/error-handler.service';
import { Channel } from 'src/entities/Channels.entity';
import {
  NotifyDto,
  RecipientDto,
} from 'src/modules/notify/schemas/Notify.schema';
import { ChannelsService } from '../channels/channels.service';
import { NotifyResponse } from './dto/NotifyResponse';

@Injectable()
export class NotifyService {
  private logger = new Logger('NotifyService');

  constructor(
    private readonly channelsService: ChannelsService,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async Notify(params: NotifyDto) {
    const response = new NotifyResponse();
    try {
      this.logger.log(`Validating channels...`);
      const channels = await this.channelsService.findByIds(params.channels);
      this.logger.log('Channels validated!');

      const channelHandlers = this.Handlers();
      const recipientMap = this.RecipientMap(params.to);

      for (const channel of channels) {
        const handler = channelHandlers[channel.name];
        if (!handler) {
          this.logger.warn(`No handler found for channel: ${channel.name}`);
          continue;
        }
        this.logger.log(`Validating recipients for channel: ${channel.name}`);
        const destination = this.ValidateRecipient(recipientMap, channel);

        if (destination instanceof Error)
          response.addError(channel.name, destination.message);
        else {
          const sent = await handler(destination, params.message);
          if (sent) response.addSuccess(channel.name);
        }
      }

      return response;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  private Handlers() {
    return {
      Email: this.sendEmail.bind(this),
      Sms: this.sendSms.bind(this),
    };
  }

  private ValidateRecipient(
    recipientMap: Map<string, string>,
    channel: Channel,
  ) {
    const requiredType = channel.name.toLowerCase();
    if (!recipientMap.has(requiredType)) {
      const message = `Missing (to) information for channel: ${channel.name}`;
      this.logger.error(message);
      return new Error(message);
    }
    return recipientMap.get(requiredType);
  }

  private RecipientMap(recipient: RecipientDto[]) {
    const recipientMap = new Map<string, string>();
    for (const to of recipient) {
      recipientMap.set(to.type.toLowerCase(), to.value);
    }
    return recipientMap;
  }

  private async sendEmail(params: any) {
    this.logger.log('Sending Email...');
    return true;
  }

  private async sendSms(params: any) {
    this.logger.log('Sending SMS...');
    return true;
  }
}
