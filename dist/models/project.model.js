"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSchema = void 0;
const zod_1 = require("zod");
const MaterialSchema = zod_1.z.object({
    type: zod_1.z.string(),
    quantity: zod_1.z.number().positive(),
});
exports.ProjectSchema = zod_1.z.object({
    name: zod_1.z.string(),
    materials: zod_1.z.array(MaterialSchema),
});
