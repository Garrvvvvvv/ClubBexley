import { Router } from "express";
import { signup, login, logout, requestOtp, verifyOtp, resetPassword } from "../controllers/auth/controllerAuthController.js";
import { seedDashboard } from "../controllers/auth/seedController.js";

const router = Router();

router.post("/seed-dashboard", seedDashboard); // Dev tool
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", requestOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
