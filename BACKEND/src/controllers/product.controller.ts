import { NextFunction, query, Response } from "express";
import httpStatus from "http-status";
import { Params, Query, Request } from "../configs/types";
import { IProduct } from "../models";
import {
  ICreateProductParams,
  ProductService,
} from "../services/product.service";
import log from "../utils/logger";
type IRequestBodyUpdateProduct = Omit<IProduct, "createdAt" | "updatedAt">;
export interface IRequestCreateBody {
  name: string;
  description: string;
  trademark: string;
  price: number;
  detailImage: string[];
  avatar: string;
  category: string;
  subCategory: string;
}
export interface IRequestFindOne {
  _id: string;
}
export interface IRequestGetall {
  category?: string;
  subCategory?: string;
}
export default class ProductController {
  static create = async (
    req: Request<ICreateProductParams, Query, Params>,
    res: Response,
    next: NextFunction
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
    next: NextFunction
  ) => {
    try {
      const response = await ProductService.getById({ _id: req.params._id });
      res.json(response).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
  static getAll = async (
    req: Request<IRequestGetall, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const products = await ProductService.getAll({
        query: {
          limit: Number(req.query.limit),
          skip: Number(req.query.skip) || 0,
        },
        category: req.query.category as string,
        subCategory: req.query.subCategory as string,
      });
      res.json(products);
    } catch (error) {
      next(error);
    }
  };
  static update = async (
    req: Request<IRequestBodyUpdateProduct, Query, Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const shop = await ProductService.update({
        productId: req.params._id,
        body: req.body,
      });
      res.json(shop);
    } catch (e) {
      return next(e);
    }
  };
}
