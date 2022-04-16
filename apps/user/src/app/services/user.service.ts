import {UserDto} from '../interfaces/dto/user.dto';
import {User} from '../interfaces/user.interface';
import {UserCredentialsDto} from "@lucho-backend-workspace/data-types";
import {PasswordNotMatchException} from "@lucho-backend-workspace/exceptions";
import {NotFoundException} from "@nestjs/common";
import {Model} from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";

export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
  }

  async list(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(user: UserDto): Promise<User> {
    const userModel = new this.userModel({...user, is_confirmed: false});
    return userModel.save();
  }

  async updateUser(id: string, user: UserDto): Promise<User> {
    const userModel = this.userModel.findOneAndUpdate({_id: id}, user)
    return userModel;
  }

  async getUser(email: string): Promise<User> {
    return this.userModel.findOne({email}).exec();
  }

  async validateUserByCredentials(credentials: UserCredentialsDto): Promise<User> {
    const user = await this.getUser(credentials.email);
    if (user) {
      const validUser = user.comparePassword(credentials.password);
      if (validUser) {
        return user;
      }
      throw new PasswordNotMatchException();
    }
    throw new NotFoundException();
  }
}
