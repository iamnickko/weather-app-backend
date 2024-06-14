import { expect } from "chai";
import supertest from "supertest";

import AuthRoutes from "../../src/routes/Auth.routes.js";
import Config from "../../src/config/Config.js";
import Database from "../../src/db/Database.js";
import LocationRoutes from "../../src/routes/Location.routes.js";
import Server from "../../src/server/Server.js";
import testData from "../data/testUsers.js";
import User from "../../src/models/User.model.js";

const { testUsers, newUser } = testData;

describe("Integration Tests:", () => {
  let server;
  let database;
  let request;

  before(async () => {
    Config.load();
    const { PORT, HOST, DB_URI } = process.env;
    const authRoutes = new AuthRoutes();
    const locationRoutes = new LocationRoutes();
    database = new Database(DB_URI);
    server = new Server(PORT, HOST, authRoutes, locationRoutes);
    server.start();
    await database.connect();
    request = supertest(server.getApp());
  });

  after(async () => {
    await server.close();
    await database.close();
  });

  beforeEach(async () => {
    try {
      await User.deleteMany();
      console.log("Database successfully cleared.");
    } catch (error) {
      console.log(error.message);
      console.log("Error when clearing.");
      throw new Error();
    }
    try {
      await User.insertMany(testUsers);
      console.log("Database successfully filled with users.");
    } catch (error) {
      console.log(error.message);
      console.log("Error when inserting test users.");
      throw new Error();
    }
  });

  describe("POST requests to /signup on authRoutes", () => {
    it("should respond with a 201 status code for a POST request to /signup", async () => {
      const response = await request.post("/auth/signup").send(newUser);
      expect(response.status).to.equal(201);
    });

    it('should respond with a "X-Access-Token" header', async () => {
      const response = await request.post("/auth/signup").send(newUser);
      expect(response.headers["x-access-token"]).to.exist;
    });
  });
});
