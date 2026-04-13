"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
const actionSchema = zod_1.z.object({
    type: zod_1.z.enum(["login", "purchase"]),
    count: zod_1.z.number().positive(),
});
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    actions: zod_1.z.array(actionSchema).min(1),
});
