import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Configuration from './config/configuration';
import { DbModule } from './config/database.module';
import { ChannelsModule } from './modules/channels/channels.module';
import { NotifyModule } from './modules/notify/notify.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [Configuration] }),
    NotifyModule,
    ChannelsModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
