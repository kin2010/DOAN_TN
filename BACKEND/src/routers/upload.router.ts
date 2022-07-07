import express from "express";

import UploadController from "../controllers/upload.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import { MulterMiddleware } from "../middlewares";

const router = express.Router();

router
  .route("/single")
  .post([MulterMiddleware.upload.single("file")], UploadController.single);
router
  .route("/multiple")
  .post([MulterMiddleware.upload.array("file")], UploadController.multiple);
router
  .route("/video")
  .post(
    [MulterMiddleware.uploadVideo.single("file")],
    UploadController.uploadVideo
  );
export default router;
