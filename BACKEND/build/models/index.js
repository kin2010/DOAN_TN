"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trademark = exports.Product = exports.Verify = exports.User = exports.Role = void 0;
var role_model_1 = require("./role.model");
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return __importDefault(role_model_1).default; } });
var user_model_1 = require("./user.model");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(user_model_1).default; } });
var verify_model_1 = require("./verify.model");
Object.defineProperty(exports, "Verify", { enumerable: true, get: function () { return __importDefault(verify_model_1).default; } });
var product_model_1 = require("./product.model");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return __importDefault(product_model_1).default; } });
var trademark_model_1 = require("./trademark.model");
Object.defineProperty(exports, "Trademark", { enumerable: true, get: function () { return __importDefault(trademark_model_1).default; } });
