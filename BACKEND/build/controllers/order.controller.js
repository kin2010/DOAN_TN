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
var order_service_1 = __importDefault(require("../services/order.service"));
var OrderController = /** @class */ (function () {
    function OrderController() {
    }
    var _a;
    _a = OrderController;
    OrderController.create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var responce, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, order_service_1.default.create(__assign({}, req.body))];
                case 1:
                    responce = _b.sent();
                    res.status(http_status_1.default.CREATED).json(responce).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    next(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    OrderController.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var shop, e_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, order_service_1.default.update({
                            orderId: req.params.id,
                            body: req.body,
                        })];
                case 1:
                    shop = _b.sent();
                    res.json(shop).status(http_status_1.default.OK).end();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    return [2 /*return*/, next(e_1)];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    OrderController.getAll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var shops, e_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, order_service_1.default.getAll({
                            pagination: {
                                limit: Number(req.query.limit),
                                skip: Number(req.query.skip) || 0,
                            },
                        })];
                case 1:
                    shops = _b.sent();
                    res.json(shops);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _b.sent();
                    return [2 /*return*/, next(e_2)];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    OrderController.getByUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var shops, e_3;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, order_service_1.default.getByUser({
                            userId: ((_b = req.query.userId) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                            pagination: {
                                limit: Number(req.query.limit),
                                skip: Number(req.query.skip) || 0,
                            },
                        })];
                case 1:
                    shops = _c.sent();
                    res.json(shops);
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _c.sent();
                    return [2 /*return*/, next(e_3)];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    OrderController.payment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var payUrl, e_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, order_service_1.default.paymentMomo({
                            orderId: req.params.id,
                        })];
                case 1:
                    payUrl = _b.sent();
                    res.json(payUrl);
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _b.sent();
                    return [2 /*return*/, next(e_4)];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    OrderController.paymentNotification = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, message, requestId, data, e_5;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = req.body, message = _b.message, requestId = _b.requestId;
                    data = {
                        message: message,
                        requestId: requestId,
                    };
                    return [4 /*yield*/, order_service_1.default.paymentNotification(data)];
                case 1:
                    _c.sent();
                    res.end();
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _c.sent();
                    return [2 /*return*/, next(e_5)];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return OrderController;
}());
exports.default = OrderController;
