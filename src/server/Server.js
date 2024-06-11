import express from "express";
import AuthMiddleware from "../middleware/Auth.middleware.js";

export default class Server {
  #app;
  #host;
  #port;
  #server;
  #authRouter;
  #locationRouter;

  constructor(port, host, authRouter, locationRouter) {
    this.#app = express();
    this.#port = port;
    this.#host = host;
    this.#server = null;
    this.#authRouter = authRouter;
    this.#locationRouter = locationRouter;
  }

  start = () => {
    this.#server = this.#app.listen(this.#port, this.#host, () => {
      console.log(
        `Server is running on http://${this.#server.address().address}:${
          this.#server.address().port
        }`
      );
    });

    this.#app.use(express.json());
    // this.#app.use((req, res, next) => {
    //   res.header("X-Access-Token", "");
    //   next();
    // });
    this.#app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Headers",
        "X-Access-Token, Origin, Content-Type, Accept"
      );
      next();
    });
    // this.#app.use((req, res, next) => AuthMiddleware.verify(req, res, next));

    this.#app.use(
      this.#authRouter.getRouterPath(),
      this.#authRouter.getRouter()
    );
    this.#app.use(
      this.#locationRouter.getRouterPath(),
      this.#locationRouter.getRouter()
    );
  };
}
