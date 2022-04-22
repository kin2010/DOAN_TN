import express from 'express';
import { ProductController } from '../controllers';
const router = express.Router();
router.route('/').post(ProductController.create);
router.route('/:_id').get(ProductController.getById);
export default router;
