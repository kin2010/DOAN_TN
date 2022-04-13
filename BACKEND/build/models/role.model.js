"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RoleSchema = new mongoose_1.Schema({
    roleName: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
var Role = (0, mongoose_1.model)('Role', RoleSchema);
exports.default = Role;
