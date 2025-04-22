import { Module } from '@nestjs/common';
import NodeMailerEmail from 'src/services/nodemailer/NodeMailerEmail.service';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';

@Module({
  imports: [],
  controllers: [NotifyController],
  providers: [NotifyService,NodeMailerEmail],
})
export class NotifyModule {}
