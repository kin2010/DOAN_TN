"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = __importDefault(require("http-status"));
var models_1 = require("../models");
var revenue_model_1 = __importDefault(require("../models/revenue.model"));
var APIError_1 = __importDefault(require("../utils/APIError"));
var logger_1 = __importDefault(require("../utils/logger"));
var date_fns_1 = require("date-fns");
var RevenueServices = /** @class */ (function () {
    function RevenueServices() {
    }
    var _a;
    _a = RevenueServices;
    RevenueServices.getByWeek = function (_b) {
        var startTime = _b.startTime;
        return __awaiter(void 0, void 0, void 0, function () {
            var startWeek, endWeek, day, dateFormat, formattedDate, preDate, rs, count, endW, cloneDay, orders_1, revenue_1, orders, revenue, idOrder, rev;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!startTime) {
                            throw new APIError_1.default({
                                message: "Time is not defined",
                                status: http_status_1.default.NOT_FOUND,
                            });
                        }
                        startWeek = (0, date_fns_1.startOfWeek)(new Date(startTime), { weekStartsOn: 1 });
                        endWeek = (0, date_fns_1.lastDayOfWeek)(new Date(startTime), { weekStartsOn: 1 });
                        day = startWeek;
                        dateFormat = "d";
                        formattedDate = "";
                        preDate = startWeek;
                        rs = [];
                        count = 0;
                        logger_1.default.info(startWeek.toString());
                        logger_1.default.info(endWeek.toString());
                        endW = (0, date_fns_1.addDays)(new Date(endWeek), 1);
                        _c.label = 1;
                    case 1:
                        if (!(day <= endW)) return [3 /*break*/, 5];
                        if (!(count > 0)) return [3 /*break*/, 4];
                        formattedDate = (0, date_fns_1.format)(day, dateFormat);
                        cloneDay = day;
                        return [4 /*yield*/, models_1.Order.find({
                                isPaid: true,
                                createdAt: {
                                    //new Date(endOfDay(new Date(preDate)))
                                    $gte: new Date(preDate),
                                    $lt: new Date(cloneDay),
                                },
                            })];
                    case 2:
                        orders_1 = _c.sent();
                        return [4 /*yield*/, orders_1.reduce(function (pre, cur) {
                                return pre + (cur === null || cur === void 0 ? void 0 : cur.totalPrice);
                            }, 0)];
                    case 3:
                        revenue_1 = _c.sent();
                        rs.push({
                            date: preDate,
                            revenue: revenue_1,
                            dateEnd: cloneDay,
                            order: orders_1,
                        });
                        _c.label = 4;
                    case 4:
                        count++;
                        preDate = day;
                        day = (0, date_fns_1.addDays)(day, 1);
                        return [3 /*break*/, 1];
                    case 5: return [4 /*yield*/, revenue_model_1.default.create({
                            data: rs,
                        })];
                    case 6:
                        _c.sent();
                        return [2 /*return*/, rs];
                    case 7:
                        orders = _c.sent();
                        logger_1.default.info("ozz", orders[0].totalPrice);
                        return [4 /*yield*/, orders.reduce(function (pre, cur) {
                                return pre + (cur === null || cur === void 0 ? void 0 : cur.totalPrice);
                            }, 0)];
                    case 8:
                        revenue = _c.sent();
                        if (!(orders.length > 0)) return [3 /*break*/, 10];
                        idOrder = orders === null || orders === void 0 ? void 0 : orders.map(function (order) { return order === null || order === void 0 ? void 0 : order._id; });
                        return [4 /*yield*/, revenue_model_1.default.create({
                                orders: __spreadArray([], idOrder, true),
                                revenue: revenue,
                            })];
                    case 9:
                        rev = _c.sent();
                        if (!rev) {
                            throw new APIError_1.default({
                                message: "Error when create Revenue",
                                status: http_status_1.default.NOT_FOUND,
                            });
                        }
                        return [2 /*return*/, rev];
                    case 10: return [2 /*return*/, 0];
                }
            });
        });
    };
    RevenueServices.getByYear = function (_b) {
        var startTime = _b.startTime;
        return __awaiter(void 0, void 0, void 0, function () {
            var startYear, endYear, startY, rs, startMonth, endMonth, orders, revenue, nextMonth;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!startTime) {
                            throw new APIError_1.default({
                                message: "Time is not defined",
                                status: http_status_1.default.NOT_FOUND,
                            });
                        }
                        startYear = (0, date_fns_1.startOfYear)(new Date(startTime));
                        endYear = (0, date_fns_1.endOfYear)(new Date(startTime));
                        startY = startYear;
                        rs = [];
                        _c.label = 1;
                    case 1:
                        if (!(startY <= endYear)) return [3 /*break*/, 4];
                        startMonth = startY;
                        endMonth = (0, date_fns_1.endOfMonth)(new Date(startMonth));
                        logger_1.default.info("start");
                        logger_1.default.info(startMonth.toString());
                        logger_1.default.info("end");
                        logger_1.default.info(endMonth.toString());
                        return [4 /*yield*/, models_1.Order.find({
                                isPaid: true,
                                createdAt: {
                                    //new Date(endOfDay(new Date(preDate)))
                                    $gte: new Date(startMonth),
                                    $lt: new Date(endMonth),
                                },
                            })];
                    case 2:
                        orders = _c.sent();
                        logger_1.default.info(orders);
                        return [4 /*yield*/, orders.reduce(function (pre, cur) {
                                return pre + (cur === null || cur === void 0 ? void 0 : cur.totalPrice);
                            }, 0)];
                    case 3:
                        revenue = _c.sent();
                        rs.push({
                            revenue: revenue,
                            date: startMonth,
                            datedateEnd: endMonth,
                            order: orders,
                        });
                        nextMonth = (0, date_fns_1.startOfMonth)(new Date((0, date_fns_1.addMonths)(startMonth, 1)));
                        startY = nextMonth;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, revenue_model_1.default.create({
                            data: rs,
                        })];
                    case 5:
                        _c.sent();
                        return [2 /*return*/, rs];
                }
            });
        });
    };
    return RevenueServices;
}());
exports.default = RevenueServices;
// {
//   "startTime":"2022-07-15T00:00:00.000Z",
//   "endTime":"2022-07-17T15:03:49.085Z"
// }
