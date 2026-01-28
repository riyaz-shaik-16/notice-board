import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";

import Official from "../models/official.model.js";

const seedAdmin = async () => {
  try {
    const uri = `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`;
    await mongoose.connect(uri);

    const existingAdmin = await Official.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await Official.create({
      name: "Village Admin",
      phone: "9999999999",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("Admin created successfully:");
    console.log({
      phone: admin.phone,
      password: "admin123",
    });

    process.exit(0);
  } catch (err) {
    console.error("Admin seed failed:", err.message);
    process.exit(1);
  }
};

seedAdmin();
