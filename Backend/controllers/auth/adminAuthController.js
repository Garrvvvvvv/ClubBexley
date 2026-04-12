import Admin from "../../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendAdminOtpEmail } from "../../utils/emailService.js";
import { logAdminAction } from "../../utils/logAdminAction.js";

export async function seedAdmin(req, res) {
  if (process.env.ALLOW_SEED !== "TRUE") {
    return res.status(403).json({ message: "Seeding is disabled on this environment." });
  }

  const { username, password } = req.body;

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(username)) {
    return res.status(400).json({ message: "Username must be a valid email address" });
  }

  const exists = await Admin.findOne({ username });
  if (exists) return res.status(400).json({ message: "Admin exists" });

  const admin = await Admin.create({ username, password });
  res.json({ message: "Admin created", id: admin._id });
}

export async function login(req, res) {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: admin._id,
      username: admin.username,
      role: "ADMIN",
    },
    process.env.ADMIN_JWT_SECRET,
    { expiresIn: "10m" }
  );

  // Log the login action (fire-and-forget)
  logAdminAction({
    adminId: admin._id,
    adminName: admin.username,
    action: "LOGIN",
    details: {},
    ip: req.ip,
  });

  res.json({
    token,
    admin: { id: admin._id, username: admin.username },
  });
}

// export function logout(req, res) {
//   res.json({ ok: true });
// }

// ======= OTP PASSWORD RESET FLOW =======

export const requestOtp = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: "Email is required" });

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Please enter a valid admin email." });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save hashed OTP & expiration (5 mins)
    admin.resetPasswordOtp = hashedOtp;
    admin.resetPasswordOtpExpires = Date.now() + 5 * 60 * 1000;
    await admin.save();

    // Send Email
    const emailSent = await sendAdminOtpEmail(username, otp);
    if (!emailSent) {
      return res.status(500).json({ message: "Could not send email. Try again later." });
    }

    res.status(200).json({ message: "An OTP has been sent to your administrator email." });
  } catch (error) {
    console.error("Admin Request OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { username, otp } = req.body;
    if (!username || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    const admin = await Admin.findOne({ username });
    if (!admin || !admin.resetPasswordOtp || !admin.resetPasswordOtpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (admin.resetPasswordOtpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const isValid = await bcrypt.compare(otp.toString(), admin.resetPasswordOtp);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid. Clear the OTP so it can't be reused.
    admin.resetPasswordOtp = undefined;
    admin.resetPasswordOtpExpires = undefined;
    await admin.save();

    // Issue a short-lived reset token (5 minutes)
    const resetToken = jwt.sign(
      { id: admin._id, action: "admin_reset_password" },
      process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.status(200).json({ message: "OTP verified", resetToken });
  } catch (error) {
    console.error("Admin Verify OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    if (!resetToken || !newPassword) return res.status(400).json({ message: "Token and new password required" });

    // Verify the temporary reset token
    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    if (decoded.action !== "admin_reset_password") {
      return res.status(400).json({ message: "Invalid token action" });
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Hash and save new password
    admin.password = newPassword; // The pre-save hook in schema handles hashing
    await admin.save();
    res.status(200).json({ message: "Password has been successfully reset" });
  } catch (error) {
    console.error("Admin Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export function logout(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({
      success: false,
      message: "No token provided",
    });
  }

  // Log the logout action (fire-and-forget)
  if (req.admin) {
    logAdminAction({
      adminId: req.admin.id || req.admin._id,
      adminName: req.admin.username || req.admin.email || "unknown",
      action: "LOGOUT",
      details: {},
      ip: req.ip,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}