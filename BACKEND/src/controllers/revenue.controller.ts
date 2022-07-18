import { Request, Query, Params } from "../configs/types";
import { Response, NextFunction } from "express";
import httpStatus from "http-status";
import RevenueServices, { IRevenueGetWeek } from "../services/revenue.service";

export class RevenueController {
  static getByWeek = async (
    req: Request<IRevenueGetWeek, Query, Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const revenue = await RevenueServices.getByWeek({ ...req.body });
      res.status(httpStatus.OK).json(revenue).end();
    } catch (error) {
      next(error);
    }
  };
  static getByYear = async (
    req: Request<IRevenueGetWeek, Query, Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const revenue = await RevenueServices.getByYear({ ...req.body });
      res.status(httpStatus.OK).json(revenue).end();
    } catch (error) {
      next(error);
    }
  };
}
