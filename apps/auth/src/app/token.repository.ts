import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {RefreshToken} from "@lucho-backend-workspace/data-types";
import {IRefreshTokenSchema} from "./schemas/auth.schema";

@Injectable()
export class TokenRepository {
  constructor(@InjectModel('RefreshToken') private readonly refreshTokenModel: Model<IRefreshTokenSchema>) {
  }

  async createRefreshToken(user_id: string, ttl: number): Promise<RefreshToken> {
    const token = new this.refreshTokenModel()
    token.user_id = new mongoose.Schema.Types.ObjectId(user_id);
    token.is_revoked = false;
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);
    token.expires = expiration;

    return token.save();
  }

  async findTokenById(id: string): Promise<RefreshToken> {
    return this.refreshTokenModel.findById(id).findOne().exec();
  }
}
