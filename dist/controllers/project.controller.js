"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = void 0;
const project_service_1 = require("../services/project.service");
const project_model_1 = require("../models/project.model");
const createProject = (req, res) => {
    try {
        //return res.status(200).json({ req: req.body });
        const { name, materials } = project_model_1.ProjectSchema.parse(req.body);
        // if (!name || !Array.isArray(materials))
        //   return res.status(400).json({ error: "invalid data" });
        const result = (0, project_service_1.calculateProjectScore)(materials);
        return res.status(200).json({ result: result });
    }
    catch (error) {
        console.log("error : ", error);
    }
};
exports.createProject = createProject;
