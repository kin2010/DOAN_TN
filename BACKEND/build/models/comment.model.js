"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    productId: { require: true, type: String },
    name: { type: String, require: true },
    rating: { type: Number, require: true },
    comment: { type: String },
    avatar: { type: String },
}, { timestamps: true });
var Comment = (0, mongoose_1.model)("Comment", CommentSchema);
exports.default = Comment;
