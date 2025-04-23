import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { json } from 'express';
import { WinstonModule } from 'nest-winston';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppModule } from './app.module';
import winstonConfig from './config/winston.config';

function configureApp(app: INestApplication<any>) {
  app.use(compression());
  app.useGlobalPipes(new ZodValidationPipe());
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: '*',
    credentials: true,
  });
  app.use(json({ limit: '2mb' }));
}

function swagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setDescription(
      'A NotiAPI centraliza e simplifica envios de notificações, como email, sms, whatsapp etc...',
    )
    .setVersion('1.0')
    .setContact("Leandro Oliveira", "https://www.linkedin.com/in/leandro-oliveira-643561131/", "leandro_silva_o@outlook.com")
    .build();

  const document = SwaggerModule.createDocument(app, config);


  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: "NotiAPI",
    customfavIcon: "https://raw.githubusercontent.com/LeandroSilvao/NotiAPI/refs/heads/main/src/assets/logo-sino.png",
    customCss: `
    .swagger-ui {
      background-color: #FEFDFB;
    }
    .swagger-ui .topbar {
      padding: 0;
      background-color: #FEFDFB;
    }
    .swagger-ui .topbar .topbar-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .swagger-ui .topbar a svg {
      display: none
    }
    .swagger-ui .topbar a {
      content: url('https://raw.githubusercontent.com/LeandroSilvao/NotiAPI/refs/heads/main/src/assets/logo-sino.png');
      max-width: 170px
    }
    .info {
      text-align:center
    }
    .swagger-ui .info .title small.version-stamp{
      display: none
    }
  `,
  });
}

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });

  const port = process.env.PORT || 3030;

  configureApp(app);
  swagger(app);

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
