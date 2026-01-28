import express from "express";
import {
  getAllNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../controllers/notice.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();


router.get("/", getAllNotices);

router.get("/:id", getNoticeById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "official"),
  createNotice
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "official"),
  updateNotice
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "official"),
  deleteNotice
);

export default router;
