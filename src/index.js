import Config from "./config/Config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js";
import AuthRouter from "./routes/Auth.routes.js";
import AuthController from "./controllers/Auth.controller.js";

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const authController = new AuthController();
const authRoutes = new AuthRouter("/auth", authController);

const server = new Server(PORT, HOST, authRoutes);
const database = new Database(DB_URI);

server.start();
database.connect();
