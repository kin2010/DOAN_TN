import { IComment } from '../models';
import CommentService from '../services/comment.service';
import { Params, Query, Request } from '../configs/types';
import { NextFunction, Response } from 'express';
import { ProductService } from '../services/product.service';

type IRequestBodyCreate = Omit<IComment, 'updatedAt' | 'createdAt'>;
type IRequestBodyGet = string;
class CommentController {
  static create = async (
    req: Request<IRequestBodyCreate, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const create = await CommentService.create({ body: req.body });

      res.json(create);
    } catch (error) {
      next(error);
    }
  };
  static getCommentByProduct = async (
    req: Request<IRequestBodyGet, Query, Params>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const create = await CommentService.getCommentByProduct({
        productId: req.params.id,
      });

      res.json(create);
    } catch (error) {
      next(error);
    }
  };
}
export default CommentController;
