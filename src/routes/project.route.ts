import express, { Request, Response, Router } from "express";
import { createProject } from "../controllers/project.controller";

const router = Router();

router.get("/list", (req: Request, res: Response) => {
  res.send("Hello Projects!");
});

router.post("/", createProject);

export default router;
