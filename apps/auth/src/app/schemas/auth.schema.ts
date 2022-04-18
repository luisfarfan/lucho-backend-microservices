import {Document, Schema} from "mongoose";

export interface IRefreshTokenSchema extends Document {
  user_id: Schema.Types.ObjectId,
  expires: Date,
  is_revoked: boolean
}

export const RefreshTokenSchema = new Schema<IRefreshTokenSchema>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  expires: {
    type: Date,
    required: true
  },
  is_revoked: {
    type: Boolean,
    required: true
  }
})
