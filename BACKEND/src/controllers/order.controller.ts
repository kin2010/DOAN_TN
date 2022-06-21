import { NextFunction, query, Response } from 'express';
import httpStatus from 'http-status';
import { Params, Query, Request } from '../configs/types';
import { IOrder, IUser } from '../models';
import OrderService, { IOrderCreateParams } from '../services/order.service';
type IRequestBodyCreateOrder = Omit<IOrder, 'createdAt' | 'updatedAt'>;

type IRequestBodyUpdateOrder = Omit<IOrder, 'createdAt' | 'updatedAt'>;
type TRequestGetByUser = {
  userId: string;
};
export default class OrderController {
  static create = async (
    req: Request<IOrderCreateParams, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const responce = await OrderService.create({ ...req.body });
      res.status(httpStatus.CREATED).json(responce).end();
    } catch (error) {
      next(error);
    }
  };
  static update = async (
    req: Request<IRequestBodyUpdateOrder, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const shop = await OrderService.update({
        orderId: req.params.id,
        body: req.body,
      });
      res.json(shop).status(httpStatus.OK).end();
    } catch (e) {
      return next(e);
    }
  };

  static getAll = async (
    req: Request<never, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const shops = await OrderService.getAll({
        pagination: {
          limit: Number(req.query.limit),
          skip: req.skip || 0,
        },
      });
      res.json(shops);
    } catch (e) {
      return next(e);
    }
  };

  static getByUser = async (
    req: Request<TRequestGetByUser, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const shops = await OrderService.getByUser({
        userId: req.body.userId,
        pagination: {
          limit: Number(req.query.limit),
          skip: Number(req.query.skip) || 0,
        },
      });
      res.json(shops);
    } catch (e) {
      return next(e);
    }
  };
}
