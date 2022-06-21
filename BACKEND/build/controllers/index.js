"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = exports.CommentController = exports.TrademarkController = exports.ProductController = exports.RoleController = exports.AuthController = void 0;
var auth_controller_1 = require("./auth.controller");
Object.defineProperty(exports, "AuthController", { enumerable: true, get: function () { return __importDefault(auth_controller_1).default; } });
var role_controller_1 = require("./role.controller");
Object.defineProperty(exports, "RoleController", { enumerable: true, get: function () { return __importDefault(role_controller_1).default; } });
var product_controller_1 = require("./product.controller");
Object.defineProperty(exports, "ProductController", { enumerable: true, get: function () { return __importDefault(product_controller_1).default; } });
var trademark_controller_1 = require("./trademark.controller");
Object.defineProperty(exports, "TrademarkController", { enumerable: true, get: function () { return __importDefault(trademark_controller_1).default; } });
var comment_controller_1 = require("./comment.controller");
Object.defineProperty(exports, "CommentController", { enumerable: true, get: function () { return __importDefault(comment_controller_1).default; } });
var order_controller_1 = require("./order.controller");
Object.defineProperty(exports, "OrderController", { enumerable: true, get: function () { return __importDefault(order_controller_1).default; } });
