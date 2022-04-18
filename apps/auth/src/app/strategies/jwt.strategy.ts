import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt'
import {CommonResponse, RefreshToken, User} from "@lucho-backend-workspace/data-types";
import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";

export interface AccessTokenPayload {
  sub: number;
}

export interface UserDetailResponse extends CommonResponse {
  user: User;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '<SECRET KEY>',
      signOptions: {
        expiresIn: '5m',
      },
    });
  }

  async validate(payload: AccessTokenPayload): Promise<User> {
    const {sub: id} = payload;
    const user = await firstValueFrom<UserDetailResponse>(this.userServiceClient.send('get_user_by_id', {id}))
    return user.user;
  }
}
