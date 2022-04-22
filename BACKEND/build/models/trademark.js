"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TrademarkSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
var Trademark = (0, mongoose_1.model)('Trademark', TrademarkSchema);
exports.default = Trademark;
