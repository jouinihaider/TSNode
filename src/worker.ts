import { processJobs } from "./services/queue.service";
import { calculateScore } from "./services/user.service";

processJobs((job) => {
  console.log("Processing job for:", job.email);

  const score = calculateScore(job.actions);

  console.log("Score:", score);
});
