export default class AuthMiddleware {
  static verify = (req, res, next) => {
    const authHeader = req.headers["X-Access-Token"];
    console.log("from middleware", authHeader);
    next();
  };
}
