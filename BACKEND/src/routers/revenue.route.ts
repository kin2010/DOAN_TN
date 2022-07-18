import express from "express";
import { RevenueController } from "../controllers/revenue.controller";
const router = express.Router();
router.route("/").post(RevenueController.getByWeek);
router.route("/year").post(RevenueController.getByYear);

export default router;
