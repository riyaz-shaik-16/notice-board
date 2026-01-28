import jwt from "jsonwebtoken";
import Official from "../models/official.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const official = await Official.findById(decoded.id).select("-password");

    if (!official || !official.isActive) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    req.user = official;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
