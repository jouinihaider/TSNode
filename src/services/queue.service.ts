import { EventEmitter } from "events";

type Job = {
  email: string;
  actions: any[];
};

const queue: Job[] = [];
const emitter = new EventEmitter();

export const addJob = (job: Job) => {
  queue.push(job);

  // 🔥 trigger event
  emitter.emit("job_added");
};

export const processJobs = (handler: (job: Job) => void) => {
  emitter.on("job_added", () => {
    while (queue.length > 0) {
      const job = queue.shift();
      if (job) {
        handler(job);
      }
    }
  });
};
