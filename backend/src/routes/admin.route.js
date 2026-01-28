import express from "express";
import { createOfficial, getAdminDashboardStats, getOfficials, toggleOfficialStatus } from "../controllers/admin.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/admin/officials
 * @desc    Admin creates an official
 * @access  Admin only
 */
router.post(
  "/officials",
  authMiddleware,
  roleMiddleware("admin"),
  createOfficial
);

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  getAdminDashboardStats
);


router.get(
  "/officials",
  authMiddleware,
  roleMiddleware("admin"),
  getOfficials
);

router.patch(
  "/officials/:id/toggle",
  authMiddleware,
  roleMiddleware("admin"),
  toggleOfficialStatus
);

export default router;
