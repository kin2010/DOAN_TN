import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { Query, Params, Request } from '../configs/types';
import { IVerify } from '../models';
import { IUser } from '../models/user.model';
import AuthService from '../services/auth.service';
export interface IRequestBodyRegiser {
  email: IUser['email'];
  password: IUser['password'];
  fullName: IUser['fullName'];
}
export interface IRequeseBodyVerify {
  email: IUser['email'];
  otp: IVerify['otp'];
}
export interface IRequeseBodyLogin {
  email: IUser['email'];
  password: IUser['password'];
}
export interface IRequeseBodyChangePassword {
  email: IUser['email'];
  password: IUser['password'];
  newPassword: string;
}
export interface IRequestSendPhoneBody {
  otp: string;
  phone: string;
}
export default class AuthController {
  static register = async (
    req: Request<IRequestBodyRegiser, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await AuthService.Register({ ...req.body });
      res.status(httpStatus.CREATED).end();
    } catch (error) {
      next(error);
    }
  };
  static login = async (
    req: Request<IRequeseBodyLogin, Query, Params>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user, token } = await AuthService.login({ ...req.body });
      res.json({ user, token }).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
  static verifyEmail = async (
    req: Request<IRequeseBodyVerify, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await AuthService.verifyEmail({ ...req.body });
      res.status(httpStatus.OK).json({
        message: 'Verify successfully',
      });
    } catch (e) {
      return next(e);
    }
  };
  static changePassword = async (
    req: Request<IRequeseBodyChangePassword, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await AuthService.changePassword({ ...req.body });
      res
        .status(httpStatus.OK)
        .json({
          message: 'Change Password is successfully',
          status: 200,
        })
        .end();
    } catch (error) {
      next(error);
    }
  };
  static sendPhone = async (
    req: Request<IRequestSendPhoneBody, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await AuthService.sendPhone({ ...req.body });
      res
        .status(httpStatus.OK)
        .json({
          message: 'Phone sent message',
          status: 200,
        })
        .end();
    } catch (error) {
      next(error);
    }
  };
}
