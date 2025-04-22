// data-source.ts
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import appConfig from './src/config/configuration';
import { Channel } from './src/entities/Channels.entity';

dotenv.config();

const config = appConfig();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [Channel],
  migrations: ['src/database/migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
});
