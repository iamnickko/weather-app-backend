import Config from "./config/Config.js";
import Database from "./db/Database.js";
import Server from "./Server/Server.js";

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const server = new Server(PORT, HOST);
const database = new Database(DB_URI);

server.start();
database.connect();
