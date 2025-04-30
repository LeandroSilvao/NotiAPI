import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actions } from 'src/entities/Actions.entity';
import { Channel } from 'src/entities/Channels.entity';
import { Modules } from 'src/entities/Modules.entity';
import { Permissions } from 'src/entities/Permissions.entity';
import { Role } from 'src/entities/Role.entity';
import { User } from 'src/entities/User.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name,
          entities: [Channel, User, Role, Permissions, Modules, Actions],
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class DbModule {}
