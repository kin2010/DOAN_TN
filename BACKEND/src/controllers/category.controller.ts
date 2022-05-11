import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { Query, Params, Request } from '../configs/types';
import CategoryService from '../services/category.service';
export class CategoryController {
  static getAll = async (
    req: Request<Query, Params>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await CategoryService.getAll();
      res.status(httpStatus.OK).json(response).end();
    } catch (error) {
      next(error);
    }
  };
  static getAllSub = async (
    req: Request<Query, Params>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await CategoryService.getAllSub();
      res.status(httpStatus.OK).json(response).end();
    } catch (error) {
      next(error);
    }
  };
}
