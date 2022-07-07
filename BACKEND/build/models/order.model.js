"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_STATUS = void 0;
var mongoose_1 = require("mongoose");
exports.ORDER_STATUS = {
    PENDING: 'pending',
    SHIPPING: 'shipping',
    DONE: 'done',
    OVER: 'over',
    PAID: 'paid',
};
var ProductSchema = new mongoose_1.Schema({
    totalPrice: {
        type: Number,
        required: true,
    },
    deliveryAddress: {
        type: String,
    },
    product: [
        {
            type: 'ObjectId',
            ref: 'Product',
        },
    ],
    user: {
        type: 'ObjectId',
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: [
            exports.ORDER_STATUS.PENDING,
            exports.ORDER_STATUS.SHIPPING,
            exports.ORDER_STATUS.DONE,
            exports.ORDER_STATUS.PAID,
            exports.ORDER_STATUS.OVER,
        ],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    currentAddress: {
        type: String,
    },
    note: {
        type: String
    }
}, { timestamps: true });
var Order = (0, mongoose_1.model)('Order', ProductSchema);
exports.default = Order;
