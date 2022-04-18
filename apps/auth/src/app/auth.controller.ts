import {Controller} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {UserCredentialsDto} from "@lucho-backend-workspace/data-types";

@Controller('auth')
export class AuthController {
  constructor() {
  }

  @MessagePattern('authenticate')
  async authenticate(data: {
    credentials: UserCredentialsDto
  }) {
    const emailValidate = ''

  }
}
