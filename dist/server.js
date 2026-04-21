"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const project_route_1 = __importDefault(require("./routes/project.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const error_middleware_1 = require("./middlewares/error.middleware");
class Server {
    constructor(port = 4001) {
        this.port = port;
    }
    start() {
        const app = (0, express_1.default)();
        // Json Access
        app.use(express_1.default.json());
        // Middleware
        app.use(error_middleware_1.errorHandler);
        // Routes
        app.use("/user", user_route_1.default);
        app.use("/project", project_route_1.default);
        app.use("/order", order_route_1.default);
        // app.listen(this.port, function () {
        //   console.log("server start");
        // });
        return app;
    }
}
exports.default = Server;
