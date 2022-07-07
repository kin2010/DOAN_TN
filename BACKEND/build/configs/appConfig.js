"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, HOSTNAME = _a.HOSTNAME, PORT = _a.PORT, DB_URI = _a.DB_URI, JWT_PRIVATE_KEY = _a.JWT_PRIVATE_KEY, SENDGRID_API_KEY = _a.SENDGRID_API_KEY, EMAIL_ADMIN = _a.EMAIL_ADMIN, TEMPLATE_ID_EMAIL = _a.TEMPLATE_ID_EMAIL, USER_NODER_MAIL = _a.USER_NODER_MAIL, PASSWORD_NODE_MAIL = _a.PASSWORD_NODE_MAIL, CLOUDINARY_NAME = _a.CLOUDINARY_NAME, CLOUDINARY_API_KEY = _a.CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY = _a.CLOUDINARY_SECRET_KEY, CLOUDINARY_FOLDER = _a.CLOUDINARY_FOLDER;
var SERVER_HOSTNAME = HOSTNAME || "localhost";
var SERVER_PORT = PORT || 3004;
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
};
var SENDGRID = {
    key: SENDGRID_API_KEY ||
        "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",
    email: EMAIL_ADMIN || "kinle2k7@gmail.com",
    template: TEMPLATE_ID_EMAIL || "d-06a37ca9dc66457c86e978b640d57bea",
};
var userNodemail = USER_NODER_MAIL || "kinle2k7@gmail.com";
var passwordNodemail = PASSWORD_NODE_MAIL || "kindeptrai";
var CLOUDINARY = {
    cloudName: CLOUDINARY_NAME || "",
    apiKey: CLOUDINARY_API_KEY || "",
    apiSecret: CLOUDINARY_SECRET_KEY || "",
    folder: CLOUDINARY_FOLDER || "doantotnghiep",
};
exports.default = {
    server: SERVER,
    dbUri: DB_URI ||
        "mongodb+srv://lequangthong:thong0333428011@cluster0.x0ugk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    bcryptSaltRounds: 10,
    jwtPrivateKey: JWT_PRIVATE_KEY || "doantotnghiep@",
    sendGrid: SENDGRID,
    userNodemail: userNodemail,
    passwordNodemail: passwordNodemail,
    MOMO_HOSTNAME: process.env.MOMO_HOSTNAME,
    MOMO_END_POINT: process.env.MOMO_END_POINT,
    MOMO_PATH: process.env.MOMO_PATH,
    MOMO_PARTNER_CODE: process.env.MOMO_PARTNER_CODE,
    MOMO_ACCESS_KEY: process.env.MOMO_ACCESS_KEY,
    MOMO_SECRET_KEY: process.env.MOMO_SECRET_KEY || "cgMfyzdwNsttVlLQkLjGnbwO42WuWDj0",
    MOMO_RETURN_URL: process.env.MOMO_RETURN_URL,
    MOMO_REQUEST_TYPE: process.env.MOMO_REQUEST_TYPE,
    MOMO_NOTIFY_URL: process.env.MOMO_NOTIFY_URL,
    MOMO_HOST_NAME: process.env.MOMO_HOST_NAME,
    MOMO_PORT: process.env.MOMO_PORT,
    cloudinary: CLOUDINARY,
};
