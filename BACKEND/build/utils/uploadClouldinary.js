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
var cloudinary_1 = __importDefault(require("cloudinary"));
var http_status_1 = __importDefault(require("http-status"));
var fs_1 = __importDefault(require("fs"));
var appConfig_1 = __importDefault(require("../configs/appConfig"));
var APIError_1 = __importDefault(require("./APIError"));
var logger_1 = __importDefault(require("./logger"));
cloudinary_1.default.v2.config({
    cloud_name: appConfig_1.default.cloudinary.cloudName,
    api_key: appConfig_1.default.cloudinary.apiKey,
    api_secret: appConfig_1.default.cloudinary.apiSecret,
});
var Cloudinary = /** @class */ (function () {
    function Cloudinary() {
    }
    var _a;
    _a = Cloudinary;
    Cloudinary.upload = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var res, e_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, cloudinary_1.default.v2.uploader.upload(file, {
                            folder: appConfig_1.default.cloudinary.folder,
                            use_filename: true,
                        })];
                case 1:
                    res = _b.sent();
                    fs_1.default.unlinkSync(file);
                    return [2 /*return*/, res.secure_url];
                case 2:
                    e_1 = _b.sent();
                    logger_1.default.error("Upload file to cloudinary failed");
                    throw new APIError_1.default({
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        message: "Upload file to cloudinary failed",
                    });
                case 3: return [2 /*return*/];
            }
        });
    }); };
    Cloudinary.uploadVideo = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var res, e_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, cloudinary_1.default.v2.uploader.upload(file, {
                            folder: appConfig_1.default.cloudinary.folder,
                            use_filename: true,
                            resource_type: "video",
                            eager: [
                                { width: 300, height: 300, crop: "pad", audio_codec: "none" },
                                {
                                    width: 160,
                                    height: 100,
                                    crop: "crop",
                                    gravity: "south",
                                    audio_codec: "none",
                                },
                            ],
                            eager_async: true,
                        })];
                case 1:
                    res = _b.sent();
                    fs_1.default.unlinkSync(file);
                    return [2 /*return*/, res.secure_url];
                case 2:
                    e_2 = _b.sent();
                    logger_1.default.error("Upload file to cloudinary failed");
                    throw new APIError_1.default({
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        message: "Upload file to cloudinary failed",
                    });
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return Cloudinary;
}());
exports.default = Cloudinary;
