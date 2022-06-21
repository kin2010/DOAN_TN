import { CommentController } from '../controllers';
import express from 'express';
const router = express.Router();
router.route('/').post(CommentController.create);
router.route('/:id').get(CommentController.getCommentByProduct);
export default router;
