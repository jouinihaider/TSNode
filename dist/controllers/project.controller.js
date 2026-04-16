"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = void 0;
const project_service_1 = require("../services/project.service");
const project_model_1 = require("../models/project.model");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.createProject = (0, asyncHandler_1.asyncHandler)((req, res) => {
    const { materials } = project_model_1.ProjectSchema.parse(req.body);
    const result = (0, project_service_1.calculateProjectScore)(materials);
    return res.status(200).json({ result: result });
});
// export const createProject = (req: Request, res: Response) => {
//   try {
//     const { materials } = ProjectSchema.parse(req.body);
//     const result = calculateProjectScore(materials);
//     return res.status(200).json({ result: result });
//   } catch (error: any) {
//     console.log("error : ", error);
//   }
// };
