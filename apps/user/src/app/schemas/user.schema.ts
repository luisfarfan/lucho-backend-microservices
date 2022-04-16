import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants';

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
  delete ret.password;
}

export interface IUserSchema extends mongoose.Document {
  email: string;
  password: string;
  name?: string;
  last_name?: string;
  is_confirmed: boolean;
  comparePassword: (password) => Promise<boolean>;
  getEncryptedPassword: (password) => Promise<string>;
}

export const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    email: {
      type: String,
      required: [true, 'Email can not be empty'],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email should be valid',
      ],
    },
    name: {
      type: String,
      required: [false, ''],
      minlength: [2, 'Nombre debe tener minimo 2 caracteres'],
    },
    last_name: {
      type: String,
      required: [false, ''],
      minlength: [3, 'Nombre debe tener minimo 3 caracteres'],
    },
    is_confirmed: {
      type: Boolean,
      required: [true, 'Confirmed can not be empty'],
    },
    password: {
      type: String,
      required: [true, 'Password can not be empty'],
      minlength: [6, 'Password should include at least 6 chars'],
    },
  },
  {
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  }
);

UserSchema.methods.getEncryptedPassword = (
  password: string
): Promise<string> => {
  return bcrypt.hash(String(password), SALT_ROUNDS);
};

UserSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await this.getEncryptedPassword(this.password);
  next();
});
