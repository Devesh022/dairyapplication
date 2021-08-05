import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicationModule } from './modules/application/application.module';
import { json } from 'body-parser';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';

const port = process.env.PORT || 3556;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule, {
    logger: ['error', 'warn']
  });
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    exceptionFactory: errors => new BadRequestException(errors)
  }));
  app.use(compression());
  app.use(json({ limit: '100mb' }));
  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
