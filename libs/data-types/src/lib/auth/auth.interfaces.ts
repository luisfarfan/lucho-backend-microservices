import {Document, Schema} from "mongoose";

export interface RefreshToken extends Document {
  user_id: Schema.Types.ObjectId;
  is_revoked: boolean;
  expires: Date
}
