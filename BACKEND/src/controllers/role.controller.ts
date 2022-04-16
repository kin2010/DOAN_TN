import { Request, Query, Params } from '../configs/types';
import { Response, NextFunction } from 'express';
import { IRole } from '../models';
import RoleSerivce from '../services/role.service';
import httpStatus from 'http-status';
import log from '../utils/logger';
export interface IRoleRequest {
  roleName: IRole['roleName'];
}
export default class RoleController {
  static create = async (
    req: Request<IRoleRequest, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      log.info(req);
      //console.log(req);
      const newRole = await RoleSerivce.create({ ...req.body });
      res.status(httpStatus.OK).json(newRole).end();
    } catch (error) {
      //log.info(error as string);
      next(error);
    }
  };
}
