import express from 'express';
import RoleRoute from './role.route';
const route = express.Router();
route.use('/role', RoleRoute);
export default route;
