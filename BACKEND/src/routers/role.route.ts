import express from 'express';
import RoleController from '../controllers/role.controller';
const router = express.Router();
router.route('/').post(RoleController.create);
export default router;
