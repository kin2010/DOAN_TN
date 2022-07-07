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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
var http_status_1 = __importDefault(require("http-status"));
var category_service_1 = __importDefault(require("../services/category.service"));
var CategoryController = /** @class */ (function () {
    function CategoryController() {
    }
    var _a;
    _a = CategoryController;
    CategoryController.getAll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, category_service_1.default.getAll()];
                case 1:
                    response = _b.sent();
                    res.status(http_status_1.default.OK).json(response).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    next(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    CategoryController.getAllSub = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, category_service_1.default.getAllSub()];
                case 1:
                    response = _b.sent();
                    res.status(http_status_1.default.OK).json(response).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    CategoryController.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var responce, error_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, category_service_1.default.update({
                            categoryId: req.params._id,
                            body: req.body,
                        })];
                case 1:
                    responce = _b.sent();
                    res.json(responce).status(http_status_1.default.OK).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    next(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    CategoryController.updateSub = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var responce, error_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, category_service_1.default.updateSub({
                            categoryId: req.params._id,
                            body: req.body,
                        })];
                case 1:
                    responce = _b.sent();
                    res.json(responce).status(http_status_1.default.OK).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    next(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    CategoryController.create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var responce, error_5;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, category_service_1.default.create({
                            body: req.body,
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
    CategoryController.createSub = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var responce, error_6;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, category_service_1.default.createSubCategory({
                            body: req.body,
                        })];
                case 1:
                    responce = _b.sent();
                    res.json(responce).status(http_status_1.default.OK).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _b.sent();
                    next(error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return CategoryController;
}());
exports.CategoryController = CategoryController;
