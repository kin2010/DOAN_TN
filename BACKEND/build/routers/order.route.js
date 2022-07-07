"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var order_controller_1 = __importDefault(require("../controllers/order.controller"));
var router = express_1.default.Router();
router.route("/").post(order_controller_1.default.create).get(order_controller_1.default.getAll);
router.route("/:id").put(order_controller_1.default.update);
router.route("/getall").get(order_controller_1.default.getAll);
router.route("/myorder").get(order_controller_1.default.getByUser);
router.route("/payment/:id").get(order_controller_1.default.payment);
router.route("/payment-notification").get(order_controller_1.default.paymentNotification);
exports.default = router;
