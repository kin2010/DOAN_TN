"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RevenueShema = new mongoose_1.Schema({
    revenue: {
        type: Number,
    },
    orders: [{ type: "ObjectId", ref: "Order" }],
    data: [{ type: Object }],
}, { timestamps: true });
var Revenue = (0, mongoose_1.model)("Revenue", RevenueShema);
exports.default = Revenue;
