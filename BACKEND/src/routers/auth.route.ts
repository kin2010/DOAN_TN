import express from 'express';
import AuthController from '../controllers/auth.controller';
const router = express.Router();
router.route('/register').post(AuthController.register);
router.route('/verify').post(AuthController.verifyEmail);
router.route('/login').post(AuthController.login);
router.route('/changepassword').post(AuthController.changePassword);
router.route('/sendphone').post(AuthController.sendPhone);
export default router;
