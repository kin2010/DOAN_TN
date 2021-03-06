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
exports.ProductService = void 0;
var http_status_1 = __importDefault(require("http-status"));
var models_1 = require("../models");
var APIError_1 = __importDefault(require("../utils/APIError"));
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    var _a;
    _a = ProductService;
    ProductService.create = function (_b) {
        var name = _b.name, description = _b.description, trademark = _b.trademark, price = _b.price, detailImage = _b.detailImage, avatar = _b.avatar, category = _b.category, subCategory = _b.subCategory, instruction = _b.instruction, stock = _b.stock, tag = _b.tag;
        return __awaiter(void 0, void 0, void 0, function () {
            var newProduct;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.Product.create({
                            name: name,
                            description: description,
                            trademark: trademark,
                            price: price,
                            detailImage: detailImage,
                            avatar: avatar,
                            category: category,
                            subCategory: subCategory,
                            instruction: instruction,
                            stock: stock,
                            tag: tag,
                        })];
                    case 1:
                        newProduct = _c.sent();
                        if (!newProduct) {
                            throw new APIError_1.default({
                                message: "Cannot create product",
                                status: http_status_1.default.BAD_REQUEST,
                            });
                        }
                        return [2 /*return*/, newProduct.populate([
                                {
                                    path: "trademark",
                                    select: "name",
                                },
                                {
                                    path: "category",
                                    select: "name description",
                                },
                                {
                                    path: "subCategory",
                                    select: "name description",
                                },
                                {
                                    path: "comments",
                                    select: "name comment rating avatar createdAt",
                                },
                                {
                                    path: "tag",
                                    select: "name color",
                                },
                            ])];
                }
            });
        });
    };
    ProductService.getById = function (_b) {
        var _id = _b._id;
        return __awaiter(void 0, void 0, void 0, function () {
            var product;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.Product.findById(_id).populate([
                            {
                                path: "trademark",
                                select: "name",
                            },
                            {
                                path: "category",
                                select: "name description",
                            },
                            {
                                path: "subCategory",
                                select: "name description",
                            },
                            {
                                path: "comments",
                                select: "name comment rating avatar createdAt",
                            },
                            {
                                path: "tag",
                                select: "name color",
                            },
                        ])];
                    case 1:
                        product = _c.sent();
                        if (!product) {
                            throw new APIError_1.default({
                                message: "Product not found",
                                status: http_status_1.default.BAD_REQUEST,
                            });
                        }
                        return [2 /*return*/, product];
                }
            });
        });
    };
    ProductService.getAll = function (_b) {
        var query = _b.query, category = _b.category, subCategory = _b.subCategory;
        return __awaiter(void 0, void 0, void 0, function () {
            var productConditions, skip, limit, products;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0:
                        productConditions = {};
                        if (category) {
                            productConditions.category = category;
                        }
                        if (subCategory) {
                            productConditions.subCategory = subCategory;
                        }
                        skip = query.skip, limit = query.limit;
                        return [4 /*yield*/, models_1.Product.find(__assign({}, productConditions))
                                .limit(limit)
                                .skip(skip)
                                .sort({ createdAt: -1 })
                                .populate([
                                {
                                    path: "trademark",
                                    select: "name",
                                },
                                {
                                    path: "category",
                                    select: "name",
                                },
                                {
                                    path: "subCategory",
                                    select: "name",
                                },
                                {
                                    path: "tag",
                                    select: "name color",
                                },
                                {
                                    path: "comments",
                                    select: "name comment rating avatar createdAt",
                                },
                            ])];
                    case 1:
                        products = _c.sent();
                        return [2 /*return*/, products];
                }
            });
        });
    };
    ProductService.update = function (_b) {
        var body = _b.body, productId = _b.productId;
        return __awaiter(void 0, void 0, void 0, function () {
            var shop, productUpdated;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.Product.findById(productId)];
                    case 1:
                        shop = _c.sent();
                        if (!shop) {
                            throw new APIError_1.default({
                                message: "Product not found",
                                status: http_status_1.default.NOT_FOUND,
                            });
                        }
                        return [4 /*yield*/, models_1.Product.findByIdAndUpdate(productId, body, {
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
                        return [2 /*return*/, productUpdated.populate([
                                {
                                    path: "trademark",
                                    select: "name",
                                },
                                {
                                    path: "category",
                                    select: "name description",
                                },
                                {
                                    path: "subCategory",
                                    select: "name description",
                                },
                                {
                                    path: "comments",
                                    select: "name comment rating avatar createdAt",
                                },
                                {
                                    path: "tag",
                                    select: "name color",
                                },
                            ])];
                }
            });
        });
    };
    return ProductService;
}());
exports.ProductService = ProductService;
