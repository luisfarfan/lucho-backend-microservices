import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserController} from './controllers/user/user.controller';
import {ConfigService} from "./config/config.service";
import {ClientProxyFactory} from "@nestjs/microservices";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [ConfigService, {
    provide: 'USER_SERVICE',
    useFactory: (configService: ConfigService) => {
      return ClientProxyFactory.create(configService.get('userService'))
    },
    inject: [ConfigService]
  }],
})
export class AppModule {
}
