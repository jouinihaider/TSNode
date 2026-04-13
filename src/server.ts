import express, { Request, Response, NextFunction } from "express";
import { createProject } from "./controllers/project.controller";
import userRoutes from "./routes/user.route";
import { errorHandler } from "./middlewares/error.middleware";

export const jsonMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.is("application/json")) {
    return res.status(400).json({ error: "JSON required" });
  }
  next();
};

export default class Server {
  readonly port: number;

  constructor(port: number) {
    this.port = port;
  }

  start() {
    const app = express();

    // Json Access
    app.use(express.json());

    // Middleware
    app.use(errorHandler);

    // Router
    app.use(userRoutes);

    // app.get("/", (req: Request, res: Response) => {
    //   res.send("Hello friends!");
    // });
    // app.post("/", createProject);

    /* create User */
    //app.post("/createUser", createUser);
    //createUserRoute(req, res);

    app.listen(this.port, function () {
      console.log("server start");
    });
  }
}
