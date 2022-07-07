import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { Params, Query, Request } from "../configs/types";
import { TagParams, TagService } from "../services/tag.service";
export default class TagController {
  static create = async (
    req: Request<TagParams, Query, Params>,

    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const responce = await TagService.create({ ...req.body });
      res.json(responce).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
  static get = async (
    req: Request<never, Query, Params>,

    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const responce = await TagService.get();
      res.json(responce).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
}
