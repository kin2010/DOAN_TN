"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var upload_controller_1 = __importDefault(require("../controllers/upload.controller"));
var middlewares_1 = require("../middlewares");
var router = express_1.default.Router();
router
    .route("/single")
    .post([middlewares_1.MulterMiddleware.upload.single("file")], upload_controller_1.default.single);
router
    .route("/multiple")
    .post([middlewares_1.MulterMiddleware.upload.array("file")], upload_controller_1.default.multiple);
router
    .route("/video")
    .post([middlewares_1.MulterMiddleware.uploadVideo.single("file")], upload_controller_1.default.uploadVideo);
exports.default = router;
