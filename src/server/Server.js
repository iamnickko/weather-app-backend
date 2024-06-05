import express from "express";

export default class Server {
  #app;
  #host;
  #port;
  #server;
  #router;

  constructor(port, host) {
    this.#app = express();
    this.#port = port;
    this.#host = host;
    this.#server = null;
  }

  start = () => {
    this.#server = this.#app.listen(this.#port, this.#host, () => {
      console.log(`Server is running on http://${this.#host}/${this.#port}`);
    });
  };
}
