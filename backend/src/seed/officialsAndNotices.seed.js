import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";

import Official from "../models/official.model.js";
import Notice from "../models/notice.model.js";

const connectDB = async () => {
  const uri = `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`;
  await mongoose.connect(uri);
};

const departments = ["health", "school", "ration", "sanitation", "panchayat"];

const seedOfficials = async () => {
  console.log("Seeding officials...");

  const officials = [];

  for (let i = 1; i <= 10; i++) {
    const dept = departments[i % departments.length];

    const phone = `90000000${i}${i}`;
    const exists = await Official.findOne({ phone });
    if (exists) continue;

    const hashedPassword = await bcrypt.hash("password123", 10);

    const official = await Official.create({
      name: `Official ${i}`,
      phone,
      password: hashedPassword,
      department: dept,
      role: "official",
      isActive: true,
    });

    officials.push(official);
  }

  console.log(`Officials seeded: ${officials.length}`);
  return officials;
};

const seedNotices = async (officials) => {
  console.log("Seeding notices...");

  const existing = await Notice.countDocuments();
  if (existing > 0) {
    console.log("Notices already exist. Skipping.");
    return;
  }

  const notices = [];

  for (let i = 0; i < 20; i++) {
    const official = officials[i % officials.length];

    notices.push({
      title: `Notice ${i + 1} - ${official.department}`,
      description: `This is an important notice related to ${official.department} department.`,
      department: official.department,
      eventDate: new Date(Date.now() + (i - 5) * 24 * 60 * 60 * 1000),
      postedBy: official._id, // ✅ FIXED
      isActive: true,
    });
  }

  await Notice.insertMany(notices);
  console.log(`Notices seeded: ${notices.length}`);
};

const runSeed = async () => {
  try {
    await connectDB();

    const officials = await seedOfficials();
    await seedNotices(officials);

    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

runSeed();
