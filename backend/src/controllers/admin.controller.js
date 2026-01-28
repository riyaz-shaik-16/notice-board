import bcrypt from "bcryptjs";
import Official from "../models/official.model.js";
import Notice from "../models/notice.model.js";

export const createOfficial = async (req, res, next) => {
  try {
    const { name, phone, password, department } = req.body;

    if (!name || !phone || !password || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Official.findOne({ phone });
    if (existing) {
      return res.status(409).json({ message: "Official already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const official = await Official.create({
      name,
      phone,
      password: hashedPassword,
      department,
      role: "official",
    });

    res.status(201).json({
      message: "Official created successfully",
      official: {
        id: official._id,
        name: official.name,
        phone: official.phone,
        department: official.department,
        role: official.role,
      },
    });
  } catch (err) {
    next(err);
  }
};


export const getAdminDashboardStats = async (req, res, next) => {
  try {
    const totalOfficials = await Official.countDocuments({
      role: "official",
    });

    const activeOfficials = await Official.countDocuments({
      role: "official",
      isActive: true,
    });

    const totalNotices = await Notice.countDocuments();

    res.status(200).json({
      totalOfficials,
      activeOfficials,
      totalNotices,
    });
  } catch (err) {
    next(err);
  }
};

export const getOfficials = async (req, res, next) => {
  try {
    const officials = await Official.find({ role: "official" })
      .select("-password") // NEVER send password
      .sort({ createdAt: -1 });

    res.status(200).json(officials);
  } catch (err) {
    next(err);
  }
};

export const toggleOfficialStatus = async (req, res, next) => {
  try {
    const official = await Official.findById(req.params.id);

    if (!official) {
      return res.status(404).json({ message: "Official not found" });
    }

    official.isActive = !official.isActive;
    await official.save();

    res.status(200).json({
      message: "Status updated",
      isActive: official.isActive,
    });
  } catch (err) {
    next(err);
  }
};
