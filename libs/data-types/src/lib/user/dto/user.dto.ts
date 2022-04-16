import {ApiProperty} from "@nestjs/swagger";

export interface UserDto {
  email: string;
  password: string;
  name: string;
  last_name: string;
}

export class CreateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  last_name: string;
}

export class UserCredentialsDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
