import { NextFunction, query, Response } from 'express';
import httpStatus from 'http-status';
import { Params, Query, Request } from '../configs/types';
import { ProductService } from '../services/product.service';
import log from '../utils/logger';
export interface IRequestCreateBody {
  name: string;
  description: string;
  trademark: string;
  price: number;
  detailImage: string[];
  avatar: string;
}
export interface IRequestFindOne {
  _id: string;
}
export default class ProductController {
  static create = async (
    req: Request<IRequestCreateBody, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const response = await ProductService.create({ ...req.body });
      res.json(response).status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
  static getById = async (
    req: Request<Query, Params>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      log.info(req);
      const response = await ProductService.getById({ _id: req.params._id });
      res.json(response).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
}
