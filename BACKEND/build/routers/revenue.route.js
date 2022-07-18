"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var revenue_controller_1 = require("../controllers/revenue.controller");
var router = express_1.default.Router();
router.route("/").post(revenue_controller_1.RevenueController.getByWeek);
router.route("/year").post(revenue_controller_1.RevenueController.getByYear);
exports.default = router;
