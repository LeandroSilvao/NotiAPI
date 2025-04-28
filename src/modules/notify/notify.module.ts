import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandlerService } from 'src/common/services/error-handler.service';
import { Channel } from 'src/entities/Channels.entity';
import NodeMailerEmail from 'src/services/nodemailer/NodeMailerEmail.service';
import { ChannelsService } from '../channels/channels.service';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  controllers: [NotifyController],
  providers: [
    NotifyService,
    NodeMailerEmail,
    ChannelsService,
    ErrorHandlerService,
  ],
})
export class NotifyModule {}
