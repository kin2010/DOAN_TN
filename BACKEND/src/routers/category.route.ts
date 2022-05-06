import express from 'express';
import CategoryService from '../services/category.service';
const router = express.Router();
router.route('').post(CategoryService.create);
router.route('/addSub').post(CategoryService.createSubCategory);
export default router;
