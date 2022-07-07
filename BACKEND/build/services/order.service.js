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
var models_1 = require("../models");
var bill_model_1 = __importDefault(require("../models/bill.model"));
var APIError_1 = __importDefault(require("../utils/APIError"));
var MomoPayment_1 = __importDefault(require("../utils/MomoPayment"));
var OrderService = /** @class */ (function () {
    function OrderService() {
    }
    var _a;
    _a = OrderService;
    OrderService.create = function (order) {
        return models_1.Order.create(__assign({}, order));
    };
    OrderService.update = function (_b) {
        var body = _b.body, orderId = _b.orderId;
        return __awaiter(void 0, void 0, void 0, function () {
            var order, productUpdated;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
                            // Yes, it's a valid ObjectId, proceed with `findById` call.
                            throw new APIError_1.default({
                                message: "Order not found",
                                status: http_status_1.default.NOT_FOUND,
                            });
                        }
                        return [4 /*yield*/, models_1.Order.findById(orderId)];
                    case 1:
                        order = _c.sent();
                        if (!order) {
                            throw new APIError_1.default({
                                message: "Order not found",
                                status: http_status_1.default.NOT_FOUND,
                            });
                        }
                        return [4 /*yield*/, models_1.Order.findByIdAndUpdate(orderId, body, {
                                new: true,
                            })];
                    case 2:
                        productUpdated = _c.sent();
                        if (!productUpdated) {
                            throw new APIError_1.default({
                                message: "Can not update order",
                                status: http_status_1.default.INTERNAL_SERVER_ERROR,
                            });
                        }
                        return [2 /*return*/, productUpdated];
                }
            });
        });
    };
    OrderService.getAll = function (_b) {
        var pagination = _b.pagination;
        return __awaiter(void 0, void 0, void 0, function () {
            var limit, skip;
            return __generator(_a, function (_c) {
                limit = pagination.limit, skip = pagination.skip;
                return [2 /*return*/, models_1.Order.find()
                        .limit(limit)
                        .skip(skip)
                        .sort({ createdAt: -1 })
                        .populate([
                        {
                            path: "product",
                            select: "name price trademark avatar ",
                            // select: 'name price category avatar photos',
                            populate: [
                                {
                                    path: "trademark",
                                    select: "name",
                                },
                            ],
                        },
                        {
                            path: "user",
                            select: "fullName",
                        },
                    ])
                        .lean()];
            });
        });
    };
    OrderService.getByUser = function (_b) {
        var userId = _b.userId, pagination = _b.pagination;
        return __awaiter(void 0, void 0, void 0, function () {
            var user, limit, skip;
            return __generator(_a, function (_c) {
                user = models_1.User.find({ _id: userId });
                if (!user || userId === "") {
                    throw new APIError_1.default({
                        message: "User not found",
                        status: http_status_1.default.NOT_FOUND,
                    });
                }
                limit = pagination.limit, skip = pagination.skip;
                return [2 /*return*/, models_1.Order.find({ user: userId })
                        .limit(limit)
                        .skip(skip)
                        .sort({ createdAt: -1 })
                        .populate([
                        {
                            path: "product",
                            select: "name price trademark avatar ",
                            populate: [
                                {
                                    path: "trademark",
                                    select: "name",
                                },
                            ],
                        },
                        {
                            path: "user",
                            select: "avatar fullName address gender address phone role",
                            populate: [{ path: "role", select: "roleName" }],
                        },
                    ])
                        .lean()];
            });
        });
    };
    OrderService.paymentMomo = function (_b) {
        var orderId = _b.orderId;
        return __awaiter(void 0, void 0, void 0, function () {
            var order, payUrl;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.Order.findById(orderId)];
                    case 1:
                        order = _c.sent();
                        if (!order) {
                            throw new APIError_1.default({
                                message: "Order not found",
                                status: http_status_1.default.NOT_FOUND,
                            });
                        }
                        return [4 /*yield*/, (0, MomoPayment_1.default)(order._id)];
                    case 2:
                        payUrl = _c.sent();
                        return [2 /*return*/, { payUrl: payUrl }];
                }
            });
        });
    };
    OrderService.paymentNotification = function (_b) {
        var message = _b.message, requestId = _b.requestId;
        return __awaiter(void 0, void 0, void 0, function () {
            var bill;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, bill_model_1.default.findOne({ requestId: requestId })];
                    case 1:
                        bill = _c.sent();
                        if (!(message === "success")) return [3 /*break*/, 3];
                        return [4 /*yield*/, models_1.Order.findOneAndUpdate({ _id: bill === null || bill === void 0 ? void 0 : bill.order }, { status: "paid" })];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OrderService;
}());
exports.default = OrderService;
