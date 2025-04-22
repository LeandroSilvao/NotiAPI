import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { json } from 'express';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import winstonConfig from './config/winston.config';

function configureApp(app: INestApplication<any>) {
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: '*',
    credentials: true,
  });
  app.use(json({ limit: '2mb' }));
}

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });

  const port = process.env.PORT || 3030;

  configureApp(app);

  await app
    .listen(port)
    .then(() => {
      logger.log(`SERVER IS RUNNING AT PORT ${port}`);
    })
    .catch((error) => {
      logger.error(error);
    });
}

bootstrap();
