/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {DocumentBuilder, SwaggerDocumentOptions, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Api GETWAY')
    .setDescription('Microservicios')
    .setVersion('1.0')
    .addTag('luchodev')
    .build();
  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  Logger.log(
    `🚀 Application is running on: http://localhost:${3000}/`
  );
}

bootstrap();
