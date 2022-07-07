"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TagSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    color: {
        type: String,
        default: "green"
    }
});
var Tag = (0, mongoose_1.model)("Tag", TagSchema);
exports.default = Tag;
