/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {UserModule} from "../../user/src/app/user.module";
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      port: process.env.AUTH_SERVICE_PORT,
    }
  });
  await app.listen();
  Logger.log(
    `🚀 Application is running on: ${process.env.AUTH_SERVICE_PORT}`
  );
}

bootstrap();
