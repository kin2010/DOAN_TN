"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENDER = void 0;
var mongoose_1 = require("mongoose");
//male :0
//female :1
exports.GENDER = {
    NOGENDER: 0,
    MALE: 0,
    FEMALE: 0,
};
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        min: 6,
    },
    role: {
        type: 'ObjectId',
        ref: 'Role',
        required: true,
    },
    gender: {
        type: String,
        enum: [exports.GENDER.NOGENDER, exports.GENDER.MALE, exports.GENDER.FEMALE],
    },
}, { timestamps: true });
var User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
