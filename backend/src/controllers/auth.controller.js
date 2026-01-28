import bcrypt from "bcryptjs";
import Official from "../models/official.model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }

    const official = await Official.findOne({ phone });

    if (!official || !official.isActive) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, official.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: official._id, role: official.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        id: official._id,
        name: official.name,
        role: official.role,
        department: official.department || null,
      },
    });
  } catch (err) {
    next(err);
  }
};
