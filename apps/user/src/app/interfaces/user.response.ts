import { IUserSchema } from '../schemas/user.schema';
import { CommonResponse } from './response';
import { User } from './user.interface';

export interface UserCreateResponse extends CommonResponse {
  user: User;
}

export interface UserListResponse extends CommonResponse {
  users: User[];
}
