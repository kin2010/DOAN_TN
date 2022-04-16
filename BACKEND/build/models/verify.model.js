"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var VerifySchema = new mongoose_1.Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    verifiedAt: {
        type: Date,
    },
    expiredAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
var Verify = (0, mongoose_1.model)('Verify', VerifySchema);
exports.default = Verify;
