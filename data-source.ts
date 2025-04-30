// data-source.ts
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import appConfig from './src/config/configuration';
import { Actions } from './src/entities/Actions.entity';
import { Channel } from './src/entities/Channels.entity';
import { Modules } from './src/entities/Modules.entity';
import { Permissions } from './src/entities/Permissions.entity';
import { Role } from './src/entities/Role.entity';
import { User } from './src/entities/User.entity';

dotenv.config();

const config = appConfig();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [Channel, User, Role, Permissions, Modules, Actions],
  migrations: ['src/database/migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
});
