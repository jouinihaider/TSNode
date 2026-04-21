"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialSchema = void 0;
const zod_1 = require("zod");
exports.materialSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    co2_per_unit: zod_1.z.number(),
});
