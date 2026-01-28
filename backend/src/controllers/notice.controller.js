import Notice from "../models/notice.model.js";

export const getAllNotices = async (req, res, next) => {
  try {
    const { department, upcoming } = req.query;

    const filter = { isActive: true };

    if (department) {
      filter.department = department;
    }

    if (upcoming === "true") {
      filter.eventDate = { $gte: new Date() };
    }

    const notices = await Notice.find(filter)
      .sort({ eventDate: 1 })
      .populate("postedBy", "name role");

    res.json(notices);
  } catch (err) {
    next(err);
  }
};


export const getNoticeById = async (req, res, next) => {
  try {
    const notice = await Notice.findOne({
      _id: req.params.id,
      isActive: true,
    }).populate("postedBy", "name role");

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json(notice);
  } catch (err) {
    next(err);
  }
};


export const createNotice = async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, description, department, eventDate } = req.body;

    if (!title || !description || !department || !eventDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (
      req.user.role === "official" &&
      req.user.department !== department
    ) {
      return res.status(403).json({ message: "Department access denied" });
    }

    const notice = await Notice.create({
      title,
      description,
      department,
      eventDate,
      postedBy: req.user._id,
    });

    res.status(201).json(notice);
  } catch (err) {
    next(err);
  }
};

export const updateNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice || !notice.isActive) {
      return res.status(404).json({ message: "Notice not found" });
    }

    if (
      req.user.role === "official" &&
      notice.department !== req.user.department
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    Object.assign(notice, req.body);
    await notice.save();

    res.json(notice);
  } catch (err) {
    next(err);
  }
};

export const deleteNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice || !notice.isActive) {
      return res.status(404).json({ message: "Notice not found" });
    }

    if (
      req.user.role === "official" &&
      notice.department !== req.user.department
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    notice.isActive = false;
    await notice.save();

    res.json({ message: "Notice deleted successfully" });
  } catch (err) {
    next(err);
  }
};
