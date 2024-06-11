import Config from "./config/Config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js";
import AuthRouter from "./routes/Auth.routes.js";
import LocationRoutes from "./routes/Location.routes.js";

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const authRoutes = new AuthRouter();
const locationRoutes = new LocationRoutes();

const server = new Server(PORT, HOST, authRoutes, locationRoutes);
const database = new Database(DB_URI);

server.start();
database.connect();
