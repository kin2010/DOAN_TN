import { Comment, IComment } from '../models';
interface ICommentCreateParams {
  body: Omit<IComment, 'updatedAt' | 'createdAt'>;
}
interface ICommentGetCM {
  productId: string;
}
class CommentService {
  static create = async ({ body }: ICommentCreateParams): Promise<IComment> => {
    return Comment.create(body);
  };
  static getCommentByProduct = async ({
    productId,
  }: ICommentGetCM): Promise<IComment[]> => {
    return Comment.find({ productId: productId })
      .sort({ createdAt: -1 })
      .lean();
  };
}
export default CommentService;
