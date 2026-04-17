"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScoreUserQueue = exports.calculateScoreUser = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const user_repository_1 = require("../repositories/user.repository");
const user_service_1 = require("../services/user.service");
const queue_service_1 = require("../services/queue.service");
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
const calculateScoreUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, actions } = user_model_1.createUserSchema.parse(req.body);
        const score = (0, user_service_1.calculateScore)(actions);
        const user = yield (0, user_repository_1.createUser)(email, score);
        return res.status(200).json({
            email: email,
            score: score,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.calculateScoreUser = calculateScoreUser;
const calculateScoreUserQueue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, actions } = user_model_1.createUserSchema.parse(req.body);
        //const score = calculateScore(actions);
        console.log("calculateScoreUserQueue");
        (0, queue_service_1.addJob)({
            email: email,
            actions: actions,
        });
        return res.status(200).json({
            message: "processing started",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.calculateScoreUserQueue = calculateScoreUserQueue;
