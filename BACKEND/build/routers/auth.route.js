"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
var router = express_1.default.Router();
router.route('/').get(auth_controller_1.default.getUser);
router.route('/register').post(auth_controller_1.default.register);
router.route('/verify').post(auth_controller_1.default.verifyEmail);
router.route('/login').post(auth_controller_1.default.login);
router.route('/changepassword').post(auth_controller_1.default.changePassword);
router.route('/sendphone').post(auth_controller_1.default.sendPhone);
exports.default = router;
