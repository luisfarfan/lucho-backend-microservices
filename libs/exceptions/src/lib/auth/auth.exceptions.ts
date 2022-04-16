import {HttpException, HttpStatus} from "@nestjs/common";

export class PasswordNotMatchException extends HttpException {
  constructor() {
    super('Password incorrect', HttpStatus.FORBIDDEN)
  }
}
