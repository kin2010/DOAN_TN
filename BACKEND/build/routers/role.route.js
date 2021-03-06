"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var role_controller_1 = __importDefault(require("../controllers/role.controller"));
var router = express_1.default.Router();
router.route('/').post(role_controller_1.default.create).get(role_controller_1.default.getAll);
exports.default = router;
