import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { Params, Query, Request } from "../configs/types";
import TrademarkService from "../services/trademark.service";
export type TTrademarkCreare = {
  name: string;
  description: string;
};
export default class TrademarkController {
  static create = async (
    req: Request<TTrademarkCreare, Query, Params>,

    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const responce = await TrademarkService.create({ ...req.body });
      res.json(responce).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
  static get = async (
    req: Request<never, Query, Params>,

    res: Response,
    next: NextFunction
  ) => {
    try {
      const responce = await TrademarkService.get();
      res.json(responce).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
}
