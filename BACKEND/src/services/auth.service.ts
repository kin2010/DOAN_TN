import httpStatus from 'http-status';
import { IUser, Role, User } from '../models';
import APIError from '../utils/APIError';
import bcrypt from 'bcrypt';
import appConfig from '../configs/appConfig';
import sendEmail from '../utils/SendEmail';
import { generateOTP } from '../utils/otp';
export interface IRegisterParams {
  fullName: string;
  password: string;
  email: string;
}
export interface ILoginParams {
  email: string;
  password: string;
}
export class AuthService {
  static Register = async ({
    fullName,
    email,
    password,
  }: IRegisterParams): Promise<void> => {
    const user = await User.findOne({ email });
    if (user) {
      throw new APIError({
        message: 'Email already exists',
        status: httpStatus.BAD_REQUEST,
      });
    }
    const passwordEncode = await bcrypt.hash(
      password,
      appConfig.bcryptSaltRounds,
    );
    const role = await Role.findOne({ name: 'Customer' });
    if (!role) {
      throw new APIError({
        message: 'Internal server error',
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    const newUser = {
      email,
      password: passwordEncode,
      fullName,
      role: role._id,
    };
    await User.create(newUser);
    const otp = await generateOTP();
    await sendEmail(email, otp);
  };
  static login = async ({ email, password }: ILoginParams): Promise<IUser> => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new APIError({
        message: 'User is not found',
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    if (user) {
      const isMatch = user.isMatchPassword(password);
      if (!isMatch) {
        throw new APIError({
          message: 'Password not match ',
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
    return user;
  };
  static verify = () => {};
}
