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
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-use-before-define */
var https_1 = __importDefault(require("https"));
var uuidv4_1 = require("uuidv4");
var crypto_1 = __importDefault(require("crypto"));
var bill_model_1 = __importDefault(require("../models/bill.model"));
var appConfig_1 = __importDefault(require("../configs/appConfig"));
var MOMO_PATH = appConfig_1.default.MOMO_PATH, MOMO_PARTNER_CODE = appConfig_1.default.MOMO_PARTNER_CODE, MOMO_ACCESS_KEY = appConfig_1.default.MOMO_ACCESS_KEY, MOMO_SECRET_KEY = appConfig_1.default.MOMO_SECRET_KEY, MOMO_RETURN_URL = appConfig_1.default.MOMO_RETURN_URL, MOMO_REQUEST_TYPE = appConfig_1.default.MOMO_REQUEST_TYPE, MOMO_HOST_NAME = appConfig_1.default.MOMO_HOST_NAME, MOMO_NOTIFY_URL = appConfig_1.default.MOMO_NOTIFY_URL, MOMO_PORT = appConfig_1.default.MOMO_PORT;
var payMomo = function (id) {
    var partnerCode = MOMO_PARTNER_CODE;
    var accessKey = MOMO_ACCESS_KEY;
    var serectkey = MOMO_SECRET_KEY;
    var returnUrl = MOMO_RETURN_URL;
    var notifyurl = MOMO_NOTIFY_URL;
    var requestType = MOMO_REQUEST_TYPE;
    var orderId = (0, uuidv4_1.uuid)();
    var requestId = (0, uuidv4_1.uuid)();
    var orderInfo = "Pay with MoMo";
    var amount = "1000";
    var extraData = "merchantName=;merchantId=";
    var rawSignature = "partnerCode=" +
        partnerCode +
        "&accessKey=" +
        accessKey +
        "&requestId=" +
        requestId +
        "&amount=" +
        amount +
        "&orderId=" +
        orderId +
        "&orderInfo=" +
        orderInfo +
        "&returnUrl=" +
        returnUrl +
        "&notifyUrl=" +
        notifyurl +
        "&extraData=" +
        extraData;
    var signature = crypto_1.default
        .createHmac("sha256", serectkey)
        .update(rawSignature)
        .digest("hex");
    var body = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        returnUrl: returnUrl,
        notifyUrl: notifyurl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
    });
    var options = {
        hostname: MOMO_HOST_NAME,
        path: MOMO_PATH,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body),
        },
    };
    return new Promise(function (resolve) {
        var requestMoMoServer = function (res) {
            res.setEncoding("utf8");
            res.on("data", onData);
        };
        var onData = function (body) { return __awaiter(void 0, void 0, void 0, function () {
            var payUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payUrl = JSON.parse(body).payUrl;
                        return [4 /*yield*/, bill_model_1.default.create({ requestId: requestId, amount: amount, orderId: orderId, order: id })];
                    case 1:
                        _a.sent();
                        resolve(payUrl);
                        return [2 /*return*/];
                }
            });
        }); };
        var req = https_1.default.request(options, requestMoMoServer);
        req.write(body);
        req.end();
    });
};
exports.default = payMomo;
