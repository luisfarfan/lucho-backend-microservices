import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {UserController} from './user.controller';
import {MongoConfigService} from './config/mongo.config.service';
import {UserSchema} from './schemas/user.schema';
import {UserService} from "./services/user.service";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'user',
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
}
