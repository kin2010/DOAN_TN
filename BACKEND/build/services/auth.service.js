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
var http_status_1 = __importDefault(require("http-status"));
var models_1 = require("../models");
var APIError_1 = __importDefault(require("../utils/APIError"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var appConfig_1 = __importDefault(require("../configs/appConfig"));
var SendEmail_1 = require("../utils/SendEmail");
var otp_1 = require("../utils/otp");
var moment_1 = __importDefault(require("moment"));
var jwt_1 = __importDefault(require("../utils/jwt"));
var sendPhone_1 = require("../utils/sendPhone");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    var _a;
    _a = AuthService;
    AuthService.getUser = function (_b) {
        var _id = _b._id;
        return __awaiter(void 0, void 0, void 0, function () {
            var user;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.User.findOne({
                            _id: _id,
                            isVerify: true,
                        })];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            throw new APIError_1.default({
                                status: http_status_1.default.NOT_FOUND,
                                message: 'User not found',
                            });
                        }
                        return [2 /*return*/, user.displayUser()];
                }
            });
        });
    };
    AuthService.Register = function (_b) {
        var fullName = _b.fullName, email = _b.email, password = _b.password;
        return __awaiter(void 0, void 0, void 0, function () {
            var passwordEncode, user, otp_2, expiredAt_1, role, newUser, otp, expiredAt;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, bcrypt_1.default.hash(password, appConfig_1.default.bcryptSaltRounds)];
                    case 1:
                        passwordEncode = _c.sent();
                        return [4 /*yield*/, models_1.User.findOne({ email: email })];
                    case 2:
                        user = _c.sent();
                        if (user && user.isVerify) {
                            throw new APIError_1.default({
                                message: 'Email already exists',
                                status: http_status_1.default.BAD_REQUEST,
                            });
                        }
                        if (!(user && !user.isVerify)) return [3 /*break*/, 6];
                        return [4 /*yield*/, models_1.User.findOneAndUpdate({ email: email }, { password: passwordEncode })];
                    case 3:
                        _c.sent();
                        otp_2 = (0, otp_1.generateOTP)();
                        expiredAt_1 = (0, moment_1.default)().add(30, 'minutes').toDate();
                        return [4 /*yield*/, models_1.Verify.findOneAndUpdate({ email: email }, {
                                otp: otp_2.toString(),
                                expiredAt: expiredAt_1,
                            })];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, (0, SendEmail_1.sendMailNodeMaier)(email, otp_2)];
                    case 5:
                        _c.sent();
                        return [2 /*return*/];
                    case 6: return [4 /*yield*/, models_1.Role.findOne({ roleName: 'User' })];
                    case 7:
                        role = _c.sent();
                        if (!role) {
                            throw new APIError_1.default({
                                message: 'Internal server error',
                                status: http_status_1.default.INTERNAL_SERVER_ERROR,
                            });
                        }
                        newUser = {
                            email: email,
                            password: passwordEncode,
                            fullName: fullName,
                            role: role._id,
                        };
                        return [4 /*yield*/, models_1.User.create(newUser)];
                    case 8:
                        _c.sent();
                        return [4 /*yield*/, (0, otp_1.generateOTP)()];
                    case 9:
                        otp = _c.sent();
                        expiredAt = (0, moment_1.default)().add(30, 'minutes');
                        return [4 /*yield*/, models_1.Verify.create({ email: email, otp: otp, expiredAt: expiredAt })];
                    case 10:
                        _c.sent();
                        return [4 /*yield*/, (0, SendEmail_1.sendMailNodeMaier)(email, otp)];
                    case 11:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.verifyEmail = function (_b) {
        var email = _b.email, otp = _b.otp;
        return __awaiter(void 0, void 0, void 0, function () {
            var user, verify;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0:
                        user = models_1.User.findOne({ email: email });
                        if (!user) {
                            throw new APIError_1.default({
                                message: 'User not found',
                                status: http_status_1.default.NOT_FOUND,
                            });
                        }
                        return [4 /*yield*/, models_1.Verify.findOne({ email: email })
                                .sort({ createdAt: -1 })
                                .limit(1)];
                    case 1:
                        verify = _c.sent();
                        if (!verify) {
                            throw new APIError_1.default({
                                message: 'Invalid OTP',
                                status: http_status_1.default.BAD_REQUEST,
                            });
                        }
                        if (verify && verify.otp !== otp) {
                            throw new APIError_1.default({
                                message: 'Invalid OTP',
                                status: http_status_1.default.BAD_REQUEST,
                            });
                        }
                        if (verify.verifiedAt) {
                            throw new APIError_1.default({
                                message: 'OTP code was verified before',
                                status: http_status_1.default.BAD_REQUEST,
                            });
                        }
                        if ((0, moment_1.default)().isAfter(verify.expiredAt)) {
                            throw new APIError_1.default({
                                message: 'OTP code was expired',
                                status: http_status_1.default.BAD_REQUEST,
                            });
                        }
                        return [4 /*yield*/, models_1.Verify.findOneAndUpdate({ email: email }, { verifiedAt: new Date() })];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, models_1.User.findOneAndUpdate({ email: email }, { isVerify: true })];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.login = function (_b) {
        var email = _b.email, password = _b.password;
        return __awaiter(void 0, void 0, void 0, function () {
            var user, isMatchPassword, token;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.User.findOne({ email: email }).limit(1)];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            throw new APIError_1.default({
                                message: 'User not found',
                                status: http_status_1.default.NOT_FOUND,
                            });
                        }
                        if (!user.isVerify) {
                            throw new APIError_1.default({
                                message: 'User is not verify',
                                status: http_status_1.default.BAD_REQUEST,
                            });
                        }
                        return [4 /*yield*/, user.isMatchPassword(password)];
                    case 2:
                        isMatchPassword = _c.sent();
                        if (!isMatchPassword) {
                            throw new APIError_1.default({
                                message: 'Invalid Password',
                                status: http_status_1.default.BAD_REQUEST,
                            });
                        }
                        token = jwt_1.default.sign({ _id: user._id });
                        // log.info(user);
                        // log.info(user.displayUser());
                        return [2 /*return*/, {
                                user: user.displayUser(),
                                token: token,
                            }];
                }
            });
        });
    };
    AuthService.changePassword = function (_b) {
        var email = _b.email, password = _b.password, newPassword = _b.newPassword;
        return __awaiter(void 0, void 0, void 0, function () {
            var user, isMatchPassword, newHashPassword;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.User.findOne({ email: email })];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            throw new APIError_1.default({
                                message: 'User not found',
                                status: http_status_1.default.NOT_FOUND,
                            });
                        }
                        return [4 /*yield*/, user.isMatchPassword(password)];
                    case 2:
                        isMatchPassword = _c.sent();
                        if (!isMatchPassword) {
                            throw new APIError_1.default({
                                message: 'Invalid Password',
                                status: http_status_1.default.BAD_REQUEST,
                            });
                        }
                        if (password === newPassword) {
                            throw new APIError_1.default({
                                message: 'Password is matched with previous password',
                                status: http_status_1.default.BAD_REQUEST,
                            });
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(newPassword, appConfig_1.default.bcryptSaltRounds)];
                    case 3:
                        newHashPassword = _c.sent();
                        return [4 /*yield*/, models_1.User.findOneAndUpdate({ email: email }, { password: newHashPassword })];
                    case 4:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.sendPhone = function (_b) {
        var otp = _b.otp, phone = _b.phone;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, sendPhone_1.sendPhone)({ otp: otp, phone: phone })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
exports.default = AuthService;
