import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from "./services/auth.service";
import {JwtModule} from "@nestjs/jwt";
import {MongooseModule} from "@nestjs/mongoose";
import {MongoConfigService} from "./config/mongo.config.service";
import {RefreshTokenSchema} from "./schemas/auth.schema";
import {ClientProxyFactory} from "@nestjs/microservices";
import {ConfigService} from "./config/config.service";

@Module({
  imports: [
    JwtModule.register({
      secret: '<SECRET KEY>',
      signOptions: {
        expiresIn: '5m',
      },
    }),
    MongooseModule.forRootAsync({useClass: MongoConfigService}),
    MongooseModule.forFeature([
      {name: 'RefreshToken', schema: RefreshTokenSchema, collection: 'refresh_token'}
    ])],
  controllers: [AuthController],
  providers: [AuthService,
    ConfigService, {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('userService'))
      },
      inject: [ConfigService]
    }],
})
export class AppModule {
}
