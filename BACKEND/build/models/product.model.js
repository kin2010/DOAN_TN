"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    trademark: {
        type: "ObjectId",
        ref: "Trademark",
        required: true,
    },
    tag: {
        type: "ObjectId",
        ref: "Tag",
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 999,
    },
    detailImage: [
        {
            type: String,
        },
    ],
    avatar: {
        type: String,
        required: true,
    },
    category: {
        type: "ObjectId",
        ref: "Category",
    },
    subCategory: {
        type: "ObjectId",
        ref: "SubCategory",
    },
    comments: [{ type: "ObjectId", ref: "Comment" }],
    instruction: {
        type: String,
    },
}, {
    timestamps: true,
});
var Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
