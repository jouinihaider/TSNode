"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const error_middleware_1 = require("./middlewares/error.middleware");
const jsonMiddleware = (req, res, next) => {
    if (!req.is("application/json")) {
        return res.status(400).json({ error: "JSON required" });
    }
    next();
};
exports.jsonMiddleware = jsonMiddleware;
class Server {
    constructor(port) {
        this.port = port;
    }
    start() {
        const app = (0, express_1.default)();
        // Json Access
        app.use(express_1.default.json());
        // Middleware
        app.use(error_middleware_1.errorHandler);
        // Router
        app.use(user_route_1.default);
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
exports.default = Server;
