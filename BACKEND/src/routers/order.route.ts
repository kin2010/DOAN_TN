import express from 'express';
import OrderController from '../controllers/order.controller';
const router = express.Router();
router.route('/').post(OrderController.create).get(OrderController.getAll);
router.route('/:id').put(OrderController.update);
router.route('/myorder').get(OrderController.getByUser);
export default router;
