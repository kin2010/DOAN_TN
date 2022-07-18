import { Request, Query, Params } from "../configs/types";
import { Response, NextFunction } from "express";
import { IRole } from "../models";
import RoleSerivce from "../services/role.service";
import httpStatus from "http-status";
import log from "../utils/logger";
export interface IRoleRequest {
  roleName: IRole["roleName"];
  description: IRole["description"];
}
export default class RoleController {
  static create = async (
    req: Request<IRoleRequest, Query, Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newRole = await RoleSerivce.create({ ...req.body });
      res.status(httpStatus.OK).json(newRole).end();
    } catch (error) {
      next(error);
    }
  };
  static getAll = async (
    req: Request<IRoleRequest, Query, Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const roles = await RoleSerivce.getAll();
      res.status(httpStatus.OK).json(roles).end();
    } catch (error) {
      next(error);
    }
  };
}
