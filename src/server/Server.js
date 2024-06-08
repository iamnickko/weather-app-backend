import express from "express";

export default class Server {
  #app;
  #host;
  #port;
  #server;
  #router;

  constructor(port, host, router) {
    this.#app = express();
    this.#port = port;
    this.#host = host;
    this.#server = null;
    this.#router = router;
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
    this.#app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    this.#app.use(this.#router.getRouterPath(), this.#router.getRouter());
  };
}
