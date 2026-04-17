"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_service_1 = require("./services/queue.service");
const user_service_1 = require("./services/user.service");
(0, queue_service_1.processJobs)((job) => {
    console.log("Processing job for:", job.email);
    const score = (0, user_service_1.calculateScore)(job.actions);
    console.log("Score:", score);
});
