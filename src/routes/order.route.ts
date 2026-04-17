import Express, { Router, Request, Response } from "express";
import { calculateOrder } from "../controllers/order.controller";
const router = Router();

router.get("/list", (req: Request, res: Response) => {
  res.send("hello its me!!");
});
router.post("/calculate", calculateOrder);

export default router;
