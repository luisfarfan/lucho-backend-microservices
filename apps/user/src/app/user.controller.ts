import {Controller, HttpStatus} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {UserDto} from './interfaces/dto/user.dto';
import {UserCreateResponse, UserListResponse} from './interfaces/user.response';
import {UserService} from './services/user.service';
import {UserCredentialsDto} from "@lucho-backend-workspace/data-types";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @MessagePattern('list_users')
  public async listUsers(): Promise<UserListResponse> {
    const users = await this.userService.list();
    return {
      message: 'Correct credentials',
      status: HttpStatus.OK,
      users,
      errors: [],
    };
  }

  @MessagePattern('user_create')
  public async createUser(user: UserDto): Promise<UserCreateResponse> {
    const createdUser = await this.userService.createUser({...user});
    return {
      message: 'User Created',
      status: HttpStatus.CREATED,
      user: createdUser,
      errors: [],
    };
  }

  @MessagePattern('update_user')
  public async updateUser(data: {
    id: string,
    user: UserDto
  }): Promise<UserCreateResponse> {
    const updatedUser = await this.userService.updateUser(data.id, {...data.user});
    return {
      message: 'User Updated',
      status: HttpStatus.OK,
      user: updatedUser,
      errors: [],
    };
  }

  @MessagePattern('get_user_by_id')
  public async getUserById(id: string): Promise<UserCreateResponse> {
    const user = await this.userService.getUser(id);
    return {
      message: 'User Updated',
      status: HttpStatus.OK,
      user: user,
      errors: [],
    };
  }

  @MessagePattern('validate_user_credentials')
  public async validateCredentials(credentials: UserCredentialsDto): Promise<UserCreateResponse> {
    const user = await this.userService.validateUserByCredentials(credentials);
    return {
      message: 'Correct credentials',
      status: HttpStatus.OK,
      user: user,
      errors: [],
    };
  }
}
