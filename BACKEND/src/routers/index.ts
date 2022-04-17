import express from 'express';
import RoleRoute from './role.route';
import AuthRoute from './auth.route';
const route = express.Router();
route.use('/role', RoleRoute);
route.use('/auth', AuthRoute);
export default route;
