import express from "express";
import { TrademarkController } from "../controllers";
const router = express.Router();
router.route("/").post(TrademarkController.create).get(TrademarkController.get);

export default router;
