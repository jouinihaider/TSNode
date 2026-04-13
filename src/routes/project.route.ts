import express, { Request, Response, Router } from "express";
import { createProject } from "../controllers/project.controller";

const router = Router();

router.get("/", createProject);
