import jwt from "jsonwebtoken";

export default class AuthMiddleware {
  static authoriseRequest = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token)
      return res.status(403).json({ message: "An access token is required." });

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorised." });
      } else {
        req.id = decoded.id;
        next();
      }
    });
  };
}
