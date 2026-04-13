"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScoreUser = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const user_service_1 = require("../services/user.service");
const createUser = (req, res, next) => {
    try {
        const data = user_model_1.createUserSchema.parse(req.body);
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const calculateScoreUser = (req, res, next) => {
    try {
        const { email, actions } = user_model_1.createUserSchema.parse(req.body);
        const score = (0, user_service_1.calculateScore)(actions);
        return res.status(200).json({
            email: email,
            score: score,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.calculateScoreUser = calculateScoreUser;
