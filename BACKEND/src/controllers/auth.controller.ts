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
}
