import { Document, Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';

export interface IUser extends Document {
  _id: string;
  email: string;
  gender: string;
  fullName: string;
  password: string;
  address: string;
  phone: string;
  avatar: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  isMatchPassword: (userPassword: string) => Promise<boolean>;
  displayUser: () => TUserDisplay[];
}
export type TUserDisplay = Omit<
  IUser,
  'isMatchPassword' | 'displayUser' | 'password'
>;

//male :0
//female :1
export const GENDER = {
  NOGENDER: 0,
  MALE: 0,
  FEMALE: 0,
};
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 6,
    },
    role: {
      type: 'ObjectId',
      ref: 'Role',
      required: true,
    },
    gender: {
      type: String,
      enum: [GENDER.NOGENDER, GENDER.MALE, GENDER.FEMALE],
    },
  },
  { timestamps: true },
);

const User = model<IUser>('User', UserSchema);
export default User;
