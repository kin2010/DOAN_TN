"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var category_controller_1 = require("../controllers/category.controller");
var router = express_1.default.Router();
router.route("/").post(category_controller_1.CategoryController.create);
router.route("/addSub").post(category_controller_1.CategoryController.createSub);
router.route("/getall").get(category_controller_1.CategoryController.getAll);
router.route("/getallsub").get(category_controller_1.CategoryController.getAllSub);
router.route("/:_id").put(category_controller_1.CategoryController.update);
router.route("/subs/:_id").put(category_controller_1.CategoryController.updateSub);
exports.default = router;
