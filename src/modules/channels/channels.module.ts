import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandlerService } from 'src/common/services/error-handler.service';
import { Channel } from 'src/entities/Channels.entity';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PermissionsModule } from 'src/modules/permissions/permissions.module'; // Importa o módulo de permissões
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), AuthModule, PermissionsModule],
  controllers: [ChannelsController],
  providers: [
    ChannelsService,
    JwtAuthGuard,
    PermissionsGuard,
    ErrorHandlerService,
  ],
})
export class ChannelsModule {}
