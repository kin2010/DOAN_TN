import express from 'express';
import AuthController from '../controllers/auth.controller';
const router = express.Router();
router.route('/register').post(AuthController.register);
router.route('/verify').post(AuthController.verifyEmail);
export default router;
