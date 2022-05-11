import express from 'express';
import { CategoryController } from '../controllers/category.controller';
import CategoryService from '../services/category.service';
const router = express.Router();
router.route('').post(CategoryService.create);
router.route('/addSub').post(CategoryService.createSubCategory);
router.route('/getall').get(CategoryController.getAll);
router.route('/getallsub').get(CategoryController.getAllSub);
export default router;
