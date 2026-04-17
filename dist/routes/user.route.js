"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Hello friends!");
});
router.post("/", user_controller_1.createUser);
router.post("/calculate", user_controller_1.calculateScoreUser);
router.post("/calculate-queue", user_controller_1.calculateScoreUserQueue);
exports.default = router;
