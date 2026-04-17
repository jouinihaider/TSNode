import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/user.route";
import projectRoutes from "./routes/project.route";
import orderRoutes from "./routes/order.route";
import { errorHandler } from "./middlewares/error.middleware";

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

    // Routes
    app.use("/user", userRoutes);
    app.use("/project", projectRoutes);
    app.use("/order", orderRoutes);

    app.listen(this.port, function () {
      console.log("server start");
    });

    //return app;
  }
}
