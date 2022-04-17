"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = exports.AuthController = void 0;
var auth_controller_1 = require("./auth.controller");
Object.defineProperty(exports, "AuthController", { enumerable: true, get: function () { return __importDefault(auth_controller_1).default; } });
var role_controller_1 = require("./role.controller");
Object.defineProperty(exports, "RoleController", { enumerable: true, get: function () { return __importDefault(role_controller_1).default; } });
