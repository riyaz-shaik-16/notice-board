import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`;

    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
