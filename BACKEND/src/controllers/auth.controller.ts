import { NextFunction, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import { IVerify } from "../models";
import User, { IUser } from "../models/user.model";
import AuthService from "../services/auth.service";
import APIError from "../utils/APIError";
import JWT from "../utils/jwt";
export interface IRequestBodyRegiser {
  email: IUser["email"];
  password: IUser["password"];
  fullName: IUser["fullName"];
}
export interface IRequeseBodyVerify {
  email: IUser["email"];
  otp: IVerify["otp"];
}
export interface IRequeseBodyLogin {
  email: IUser["email"];
  password: IUser["password"];
}
export interface IRequeseBodyChangePassword {
  email: IUser["email"];
  password: IUser["password"];
  newPassword: string;
}
export interface IRequestSendPhoneBody {
  otp: string;
  phone: string;
}
export type IUpdateUser = Omit<IUser, "createdAt" | "updatedAt">;

export default class AuthController {
  static getUser: RequestHandler = async (req: any, res, next) => {
    try {
      const token = JWT.get(req);

      if (!token) {
        throw new APIError({
          status: httpStatus.UNAUTHORIZED,
          message: "Unauthorized",
        });
        return;
      }

      const tokenPayload = JWT.verify(token);
      const user = await User.findOne({
        _id: tokenPayload._id,
        isVerify: true,
      }).populate([{ path: "role", select: "roleName" }]);

      if (!user) {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: "User not found",
        });
      }

      req.user = user;
      res.json(user.displayUser()).status(httpStatus.OK).end();
      // next();
    } catch (e) {
      next(e);
    }
  };
  static register = async (
    req: Request<IRequestBodyRegiser, Query, Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await AuthService.Register({ ...req.body });
      res.json({ status: 200 }).status(httpStatus.CREATED).end();
    } catch (error) {
      next(error);
    }
  };
  static login = async (
    req: Request<IRequeseBodyLogin, Query, Params>,
    res: Response,
    next: NextFunction
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
    next: NextFunction
  ): Promise<void> => {
    try {
      await AuthService.verifyEmail({ ...req.body });
      res.status(httpStatus.OK).json({
        message: "Verify successfully",
      });
    } catch (e) {
      return next(e);
    }
  };
  static changePassword = async (
    req: Request<IRequeseBodyChangePassword, Query, Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await AuthService.changePassword({ ...req.body });
      res
        .status(httpStatus.OK)
        .json({
          message: "Change Password is successfully",
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
    next: NextFunction
  ): Promise<void> => {
    try {
      await AuthService.sendPhone({ ...req.body });
      res
        .status(httpStatus.OK)
        .json({
          message: "Phone sent message",
          status: 200,
        })
        .end();
    } catch (error) {
      next(error);
    }
  };
  static getAllUser = async (
    req: Request<never, Query, Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const responce = await AuthService.getAllUser({
        pagination: {
          limit: Number(req.query.limit),
          skip: Number(req.query.skip) || 0,
        },
      });
      res.json(responce).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
  static updateUser = async (
    req: Request<IUpdateUser, Query, Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const responce = await AuthService.updateUser({
        userId: req.params._id,
        body: req.body,
      });
      res.json(responce).status(httpStatus.OK).end();
    } catch ({ error }) {
      next(error);
    }
  };
}
