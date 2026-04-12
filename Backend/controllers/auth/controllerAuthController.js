import Controller from "../../models/Controller.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../../utils/emailService.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(username)) {
      return res.status(400).json({ message: "Username must be a valid email address" });
    }

    const existing = await Controller.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const controller = await Controller.create({
      username,
      password,
      active: false, // Requires Admin Approval
      requestedEvents: req.body.requestedEvent ? [req.body.requestedEvent] : []
    });

    res.status(201).json({ message: "Account created! Ask an admin to approve you." });
  } catch (error) {
    console.error("Controller Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const controller = await Controller.findOne({ username });

    if (!controller || !(await controller.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!controller.active) {
      return res.status(403).json({ message: "Account not approved yet" });
    }

    const token = jwt.sign(
      { id: controller._id, role: "CONTROLLER" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ token, username: controller.username });
  } catch (error) {
    console.error("Controller Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT (Client-side mainly, but provided for consistency)
export const logout = (req, res) => {
  res.json({ message: "Logged out" });
};

// ======= OTP PASSWORD RESET FLOW =======

// 1. Request OTP
export const requestOtp = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: "Email is required" });

    const controller = await Controller.findOne({ username });
    if (!controller) {
      return res.status(404).json({ message: "Please enter a valid email." });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save hashed OTP & expiration (5 mins)
    controller.resetPasswordOtp = hashedOtp;
    controller.resetPasswordOtpExpires = Date.now() + 5 * 60 * 1000;
    await controller.save();

    // Send Email
    const emailSent = await sendOtpEmail(username, otp);
    if (!emailSent) {
      return res.status(500).json({ message: "Could not send email. Try again later." });
    }

    res.status(200).json({ message: "An OTP has been sent to your email." });
  } catch (error) {
    console.error("Request OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { username, otp } = req.body;
    if (!username || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    const controller = await Controller.findOne({ username });
    if (!controller || !controller.resetPasswordOtp || !controller.resetPasswordOtpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (controller.resetPasswordOtpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const isValid = await bcrypt.compare(otp.toString(), controller.resetPasswordOtp);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid. Clear the OTP so it can't be reused.
    controller.resetPasswordOtp = undefined;
    controller.resetPasswordOtpExpires = undefined;
    await controller.save();

    // Issue a short-lived reset token (5 minutes)
    const resetToken = jwt.sign(
      { id: controller._id, action: "reset_password" },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.status(200).json({ message: "OTP verified", resetToken });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 3. Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    if (!resetToken || !newPassword) return res.status(400).json({ message: "Token and new password required" });

    // Verify the temporary reset token
    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    if (decoded.action !== "reset_password") {
      return res.status(400).json({ message: "Invalid token action" });
    }

    const controller = await Controller.findById(decoded.id);
    if (!controller) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash and save new password
    controller.password = newPassword; // The pre-save hook in schema handles hashing
    await controller.save();
    res.status(200).json({ message: "Password has been successfully reset" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
