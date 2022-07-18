"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENDER = void 0;
var mongoose_1 = require("mongoose");
var bcrypt_1 = __importDefault(require("bcrypt"));
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
    avatar: {
        type: String,
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
        type: "ObjectId",
        ref: "Role",
        required: true,
    },
    gender: {
        type: String,
        enum: [exports.GENDER.NOGENDER, exports.GENDER.MALE, exports.GENDER.FEMALE],
    },
    isVerify: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
UserSchema.methods.isMatchPassword = function (candidatePassword) {
    var user = this;
    return bcrypt_1.default.compare(candidatePassword, user.password);
};
UserSchema.methods.displayUser = function () {
    var transformed = {};
    var user = this;
    var fields = [
        "_id",
        "email",
        "fullName",
        "role",
        "gender",
        "phone",
        "avatar",
        "address",
        "createdAt",
        "updatedAt",
    ];
    fields.forEach(function (field) {
        // @ts-ignore
        transformed[field] = user.get(field);
    });
    return transformed;
};
var User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
