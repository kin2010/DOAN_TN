"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var category_service_1 = __importDefault(require("../services/category.service"));
var router = express_1.default.Router();
router.route('').post(category_service_1.default.create);
router.route('/addSub').post(category_service_1.default.createSubCategory);
exports.default = router;
