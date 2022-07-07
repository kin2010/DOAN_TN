import express from "express";
import { TagController } from "../controllers";
const router = express.Router();
router.route("/").post(TagController.create);
router.route("/").get(TagController.get);
export default router;
