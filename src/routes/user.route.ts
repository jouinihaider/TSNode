import { Router, Request, Response } from "express";
import { calculateScoreUser, createUser } from "../controllers/user.controller";

const router = Router();

router.get("/user", (req: Request, res: Response) => {
  res.send("Hello friends!");
});

router.post("/user", createUser);
router.post("/user/calculate", calculateScoreUser);

export default router;
