"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SubCategoryShema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    categoryId: {
        type: 'ObjectId',
        ref: 'Category',
    },
});
var subCategory = (0, mongoose_1.model)('SubCategory', SubCategoryShema);
exports.default = subCategory;
