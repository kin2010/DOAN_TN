import httpStatus from 'http-status';
import { IUser, Role, User, Verify } from '../models';
import APIError from '../utils/APIError';
import bcrypt from 'bcrypt';
import appConfig from '../configs/appConfig';
import sendEmail, { sendMailNodeMaier } from '../utils/SendEmail';
import { generateOTP } from '../utils/otp';
import log from '../utils/logger';
import moment from 'moment';
export interface IRegisterParams {
  fullName: string;
  password: string;
  email: string;
}
export interface ILoginParams {
  email: string;
  password: string;
}
export interface IVerifyParams {
  email: string;
  otp: string;
}
export default class AuthService {
  static Register = async ({
    fullName,
    email,
    password,
  }: IRegisterParams): Promise<void> => {
    const passwordEncode = await bcrypt.hash(
      password,
      appConfig.bcryptSaltRounds,
    );
    const user = await User.findOne({ email });
    if (user && user.isVerify) {
      throw new APIError({
        message: 'Email already exists',
        status: httpStatus.BAD_REQUEST,
      });
    }
    if (user && !user.isVerify) {
      await User.findOneAndUpdate({ email }, { password: passwordEncode });
      const otp = generateOTP();
      const expiredAt = moment().add(30, 'minutes').toDate();
      await Verify.findOneAndUpdate(
        { email },
        {
          otp: otp.toString(),
          expiredAt: expiredAt,
        },
      );
      await sendMailNodeMaier(email, otp);
      return;
    }

    const role = await Role.findOne({ roleName: 'User' });
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
    const expiredAt = moment().add(30, 'minutes');
    await Verify.create({ email, otp, expiredAt });
    await sendMailNodeMaier(email, otp);
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
  static verifyEmail = async ({ email, otp }: IVerifyParams): Promise<void> => {
    const user = User.findOne({ email });
    if (!user) {
      throw new APIError({
        message: 'User not found',
        status: httpStatus.NOT_FOUND,
      });
    }
    const verify = await Verify.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (!verify) {
      throw new APIError({
        message: 'Invalid OTP',
        status: httpStatus.BAD_REQUEST,
      });
    }
    if (verify && verify.otp !== otp) {
      throw new APIError({
        message: 'Invalid OTP',
        status: httpStatus.BAD_REQUEST,
      });
    }

    if (verify.verifiedAt) {
      throw new APIError({
        message: 'OTP code was verified before',
        status: httpStatus.BAD_REQUEST,
      });
    }

    if (moment().isAfter(verify.expiredAt)) {
      throw new APIError({
        message: 'OTP code was expired',
        status: httpStatus.BAD_REQUEST,
      });
    }

    await Verify.findOneAndUpdate({ email }, { verifiedAt: new Date() });
    await User.findOneAndUpdate({ email }, { isVerify: true });
  };
}
