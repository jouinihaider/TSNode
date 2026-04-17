import { Router, Request, Response } from "express";
import {
  calculateScoreUser,
  calculateScoreUserQueue,
  createUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello friends!");
});

router.post("/", createUser);
router.post("/calculate", calculateScoreUser);
router.post("/calculate-queue", calculateScoreUserQueue);

export default router;
