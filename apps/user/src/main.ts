/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { UserModule } from './app/user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      port: process.env.USER_SERVICE_PORT,
    }
  });
  await app.listen();
  Logger.log(
    `🚀 Application is running on: ${process.env.USER_SERVICE_PORT}`
  );
}

bootstrap();
