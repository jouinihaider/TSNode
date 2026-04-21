"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError2 = void 0;
class AppError2 extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError2 = AppError2;
