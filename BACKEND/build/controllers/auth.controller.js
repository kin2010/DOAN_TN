"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = __importDefault(require("http-status"));
var user_model_1 = __importDefault(require("../models/user.model"));
var auth_service_1 = __importDefault(require("../services/auth.service"));
var APIError_1 = __importDefault(require("../utils/APIError"));
var jwt_1 = __importDefault(require("../utils/jwt"));
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    var _a;
    _a = AuthController;
    AuthController.getUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var token, tokenPayload, user, e_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    token = jwt_1.default.get(req);
                    if (!token) {
                        throw new APIError_1.default({
                            status: http_status_1.default.UNAUTHORIZED,
                            message: "Unauthorized",
                        });
                        return [2 /*return*/];
                    }
                    tokenPayload = jwt_1.default.verify(token);
                    return [4 /*yield*/, user_model_1.default.findOne({
                            _id: tokenPayload._id,
                            isVerify: true,
                        }).populate([{ path: "role", select: "roleName" }])];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        throw new APIError_1.default({
                            status: http_status_1.default.NOT_FOUND,
                            message: "User not found",
                        });
                    }
                    req.user = user;
                    res.json(user.displayUser()).status(http_status_1.default.OK).end();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    next(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthController.register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_service_1.default.Register(__assign({}, req.body))];
                case 1:
                    _b.sent();
                    res.json({ status: 200 }).status(http_status_1.default.CREATED).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    next(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthController.login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, user, token, error_2;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_service_1.default.login(__assign({}, req.body))];
                case 1:
                    _b = _c.sent(), user = _b.user, token = _b.token;
                    res.json({ user: user, token: token }).status(http_status_1.default.OK).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _c.sent();
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthController.verifyEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var e_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_service_1.default.verifyEmail(__assign({}, req.body))];
                case 1:
                    _b.sent();
                    res.status(http_status_1.default.OK).json({
                        message: "Verify successfully",
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _b.sent();
                    return [2 /*return*/, next(e_2)];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthController.changePassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_service_1.default.changePassword(__assign({}, req.body))];
                case 1:
                    _b.sent();
                    res
                        .status(http_status_1.default.OK)
                        .json({
                        message: "Change Password is successfully",
                        status: 200,
                    })
                        .end();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    next(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthController.sendPhone = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_service_1.default.sendPhone(__assign({}, req.body))];
                case 1:
                    _b.sent();
                    res
                        .status(http_status_1.default.OK)
                        .json({
                        message: "Phone sent message",
                        status: 200,
                    })
                        .end();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    next(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthController.getAllUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var responce, error_5;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_service_1.default.getAllUser({
                            pagination: {
                                limit: Number(req.query.limit),
                                skip: Number(req.query.skip) || 0,
                            },
                        })];
                case 1:
                    responce = _b.sent();
                    res.json(responce).status(http_status_1.default.OK).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    next(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthController.updateUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var responce, _b, error;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_service_1.default.updateUser({
                            userId: req.params._id,
                            body: req.body,
                        })];
                case 1:
                    responce = _c.sent();
                    res.json(responce).status(http_status_1.default.OK).end();
                    return [3 /*break*/, 3];
                case 2:
                    _b = _c.sent();
                    error = _b.error;
                    next(error);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return AuthController;
}());
exports.default = AuthController;
