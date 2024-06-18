import jwt from "jsonwebtoken";

/**
 * AuthMiddleware class contains static methods for authorizing requests.
 * @class
 */
export default class AuthMiddleware {
  /**
   * authoriseRequest method checks if the request has a valid JWT token.
   * If the token is valid, it adds the user's id to the request object and calls the next middleware function.
   * If the token is not valid or not provided, it sends a response with an error message and a corresponding status code.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
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
