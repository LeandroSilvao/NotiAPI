import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandlerService } from 'src/common/services/error-handler.service';
import { Channel } from 'src/entities/Channels.entity';
import { Modules } from 'src/entities/Modules.entity';
import { User } from 'src/entities/User.entity';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Modules, User, Channel]),
    JwtModule.register({
      secret: 'your-jwt-secret',
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [JwtAuthGuard, AuthService, UsersService, ErrorHandlerService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
