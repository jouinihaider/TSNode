"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError2_1 = require("../errors/AppError2");
const errorHandler = (req, res, nex, err) => {
    if (err instanceof AppError2_1.AppError2) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    return res.status(err.statusCode).json({
        message: "internal server",
    });
};
exports.errorHandler = errorHandler;
