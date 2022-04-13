"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, HOSTNAME = _a.HOSTNAME, PORT = _a.PORT, DB_URI = _a.DB_URI, JWT_PRIVATE_KEY = _a.JWT_PRIVATE_KEY;
var SERVER_HOSTNAME = HOSTNAME || 'localhost';
var SERVER_PORT = PORT || 3003;
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
};
exports.default = {
    server: SERVER,
    dbUri: DB_URI ||
        'mongodb+srv://lequangthong:thong0333428011@cluster0.x0ugk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    bcryptSaltRounds: 10,
    jwtPrivateKey: JWT_PRIVATE_KEY || 'doantotnghiep@',
};
