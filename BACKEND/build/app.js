"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var express_1 = __importDefault(require("express"));
var http_status_1 = __importDefault(require("http-status"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var http = __importStar(require("http"));
var cors_1 = __importDefault(require("cors"));
var google_auth_library_1 = require("google-auth-library");
var user_model_1 = __importDefault(require("./models/user.model"));
var appConfig_1 = __importDefault(require("./configs/appConfig"));
var database_1 = __importDefault(require("./configs/database"));
var error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
var logger_1 = __importDefault(require("./utils/logger"));
var APIError_1 = __importDefault(require("./utils/APIError"));
var routers_1 = __importDefault(require("./routers"));
var nodemailer = require('nodemailer');
var app = (0, express_1.default)();
var httpServer = http.createServer(app);
(0, morgan_1.default)('tiny');
/** Parser the request **/
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
/** Cors **/
app.use((0, cors_1.default)());
/** Rules of our API **/
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET POST PUT DELETE PATCH');
        return res.status(http_status_1.default.OK).end();
    }
    return next();
});
var client = new google_auth_library_1.OAuth2Client('411768487503-e06gsoh9etobrarghoagn8gbh6fjo7u8.apps.googleusercontent.com');
app.post('/auth/google', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, ticket, email, name, customUser, user;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                token = req.body.token;
                return [4 /*yield*/, client.verifyIdToken({
                        idToken: token,
                        audience: process.env.CLIENT_ID,
                    })];
            case 1:
                ticket = _c.sent();
                email = (_a = ticket.getPayload()) === null || _a === void 0 ? void 0 : _a.email;
                name = (_b = ticket.getPayload()) === null || _b === void 0 ? void 0 : _b.name;
                return [4 /*yield*/, user_model_1.default.findOne({
                        email: email,
                    })];
            case 2:
                user = _c.sent();
                if (!!user) return [3 /*break*/, 4];
                return [4 /*yield*/, user_model_1.default.create({ email: email, name: name })];
            case 3:
                customUser = _c.sent();
                if (!customUser) {
                    throw new APIError_1.default({
                        status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        message: 'Can not create',
                    });
                }
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, user_model_1.default.findOneAndUpdate({ email: email }, { email: email, name: name }, { new: true })];
            case 5:
                customUser = _c.sent();
                _c.label = 6;
            case 6:
                res.status(201);
                res.json(customUser);
                return [2 /*return*/];
        }
    });
}); });
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use('/doan', routers_1.default);
/** Logging the request **/
app.use((0, morgan_1.default)(':remote-addr :method :url :status :response-time ms'));
/** Error handling **/
app.use(error_middleware_1.default.routeNotFound);
app.use(error_middleware_1.default.handler);
/** Create the server **/
httpServer.listen(appConfig_1.default.server.port, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.default.info("Server :".concat(appConfig_1.default.server.hostname, " is running on port: ").concat(appConfig_1.default.server.port));
                return [4 /*yield*/, (0, database_1.default)()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// sgMail.setApiKey(configs.sendGrid.key);
// const msg = {
//   from: 'kinle2k7@gmail.com',
//   to: 'kin2000vippro@gmail.com',
//   html: '<div>kakaka</div>',
//   subject: 'hellozzz',
//   text: 'hellozz',
//   dynamic_template_data: {
//     otp: 11817,
//   },
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent');
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// const send = async () => {
//   //await sendPhone({ otp: 'dmm :))', phone: '932526706' });
//   await sendPhone({ otp: 'dmm :))', phone: '333428011' });
// };
// send();
