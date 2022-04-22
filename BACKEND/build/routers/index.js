"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var role_route_1 = __importDefault(require("./role.route"));
var auth_route_1 = __importDefault(require("./auth.route"));
var product_route_1 = __importDefault(require("./product.route"));
var trademark_route_1 = __importDefault(require("./trademark.route"));
var route = express_1.default.Router();
route.use('/role', role_route_1.default);
route.use('/auth', auth_route_1.default);
route.use('/products', product_route_1.default);
route.use('/trademark', trademark_route_1.default);
exports.default = route;
