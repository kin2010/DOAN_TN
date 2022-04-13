"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        min: 6,
    },
}, { timestamps: true });
var User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
