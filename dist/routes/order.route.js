"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
router.get("/list", (req, res) => {
    res.send("hello its me!!");
});
router.post("/calculate", order_controller_1.calculateOrder);
exports.default = router;
