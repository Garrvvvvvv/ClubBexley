// routes/adminAuthRoutes.js
// adminAuthRoutes.js → admin login

import express from "express";
import { seedAdmin, login, logout, requestOtp, verifyOtp, resetPassword } from "../controllers/auth/adminAuthController.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

// /api/admin/auth/*
router.post("/seed", seedAdmin);  // dev-only; guarded in controller
router.post("/login", login);
router.post("/logout", requireAdmin, logout);

// OTP Reset Password Flow
router.post("/forgot-password", requestOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
