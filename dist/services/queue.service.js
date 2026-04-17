"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processJobs = exports.addJob = void 0;
const events_1 = require("events");
const queue = [];
const emitter = new events_1.EventEmitter();
const addJob = (job) => {
    queue.push(job);
    // 🔥 trigger event
    emitter.emit("job_added");
};
exports.addJob = addJob;
const processJobs = (handler) => {
    emitter.on("job_added", () => {
        while (queue.length > 0) {
            const job = queue.shift();
            if (job) {
                handler(job);
            }
        }
    });
};
exports.processJobs = processJobs;
