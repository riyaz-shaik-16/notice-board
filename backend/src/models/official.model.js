import mongoose from "mongoose";

const officialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "official"],
      default: "official",
    },

    department: {
      type: String,
      enum: ["school", "health", "ration", "sanitation", "panchayat"],
      required: function () {
        return this.role !== "admin";
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Official", officialSchema);
