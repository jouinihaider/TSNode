import Server from "./server";
import dotenv from "dotenv";

dotenv.config();
const server = new Server(4001);
server.start();
