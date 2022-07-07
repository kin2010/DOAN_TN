import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import CategoryService, {
  IBodyUpdate,
  IBodyUpdateSub,
  ISubCategoryCreateParams,
} from "../services/category.service";
export class CategoryController {
  static getAll = async (
    req: Request<Query, Params>,
    res: Response,
    next: NextFunction
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
    next: NextFunction
  ) => {
    try {
      const response = await CategoryService.getAllSub();
      res.status(httpStatus.OK).json(response).end();
    } catch (error) {
      next(error);
    }
  };
  static update = async (
    req: Request<IBodyUpdate["body"], Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responce = await CategoryService.update({
        categoryId: req.params._id,
        body: req.body,
      });
      res.json(responce).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
  static updateSub = async (
    req: Request<IBodyUpdateSub["body"], Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responce = await CategoryService.updateSub({
        categoryId: req.params._id,
        body: req.body,
      });
      res.json(responce).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
  static create = async (
    req: Request<IBodyUpdate["body"], Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responce = await CategoryService.create({
        body: req.body,
      });
      res.json(responce).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
  static createSub = async (
    req: Request<ISubCategoryCreateParams["body"], Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responce = await CategoryService.createSubCategory({
        body: req.body,
      });
      res.json(responce).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
}
