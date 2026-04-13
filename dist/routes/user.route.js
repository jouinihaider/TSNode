"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get("/user", (req, res) => {
    res.send("Hello friends!");
});
router.post("/user", user_controller_1.createUser);
router.post("/user/calculate", user_controller_1.calculateScoreUser);
exports.default = router;
