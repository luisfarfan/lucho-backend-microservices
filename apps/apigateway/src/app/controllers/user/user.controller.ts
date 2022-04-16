import {Controller, Inject, Post, Body, Req, Param, Get, Put} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import {CreateUserDto, UserCreateResponse, UserDto, UserListResponse} from "@lucho-backend-workspace/data-types";
import {ApiCreatedResponse, ApiParam} from "@nestjs/swagger";

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,) {
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateUserDto
  })
  public async createUser(@Body() request: CreateUserDto) {
    const createUserResponse: UserCreateResponse = await firstValueFrom(
      this.userServiceClient.send('user_create', request),
    );
    return createUserResponse;
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'either an integer for the project id or a string for the project name',
    schema: {oneOf: [{type: 'string'}, {type: 'integer'}]}
  })
  @ApiCreatedResponse({
    type: CreateUserDto
  })
  public async updateUser(@Req() request: Request, @Param('id') id, @Body() body: CreateUserDto) {
    const userUpdatedResponse: UserCreateResponse = await firstValueFrom(
      this.userServiceClient.send('update_user', {id, user: body}),
    );
    return userUpdatedResponse;
  }

  @Get()
  public async listUsers() {
    const userListResponse: UserListResponse = await firstValueFrom(
      this.userServiceClient.send('list_users', {}),
    );
    return userListResponse;
  }
}
