import jwt from "jsonwebtoken";
import config from "../config.js";

function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Use correct secret key for verifying JWT
    const decoded = jwt.verify(token, config.JWT_SECRET);

    
    if (!decoded?.id) {
      return res.status(401).json({ errors: "Invalid token payload" });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ errors: "Invalid token or expired" });
  }
}

export default userMiddleware;
