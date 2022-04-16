import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  name?: string;
  last_name?: string;
  is_confirmed: boolean;
  comparePassword: (password) => Promise<boolean>;
  getEncryptedPassword: (password) => Promise<string>;
}
