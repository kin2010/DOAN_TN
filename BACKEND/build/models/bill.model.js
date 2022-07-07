"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BillSchema = new mongoose_1.Schema({
    requestId: {
        type: String,
        require: true,
    },
    orderId: {
        type: String,
        require: true,
    },
    order: {
        type: "ObjectId",
        ref: "Order",
        required: true,
    },
    message: {
        type: String,
    },
    responseAt: {
        type: Date,
    },
}, { timestamps: true });
var Bill = (0, mongoose_1.model)("Bill", BillSchema);
exports.default = Bill;
