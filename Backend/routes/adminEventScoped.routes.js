import express from "express";
import mongoose from "mongoose";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import Controller from "../models/Controller.js";
import Image from "../models/Image.js";
import requireAdmin from "../middleware/requireAdmin.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import { logFromReq } from "../utils/logAdminAction.js";
import { sendApprovalEmail } from "../utils/emailService.js";
const upload = multer({ storage: multer.memoryStorage() });

/* ==========================================
   Helper: Buffer to Data URI
   ========================================== */
const uploadToCloudinary = async (file, folderPath) => {
  if (!file || !file.buffer) throw new Error("File buffer is missing");

  const b64 = Buffer.from(file.buffer).toString("base64");
  const dataURI = "data:" + file.mimetype + ";base64," + b64;

  return await cloudinary.uploader.upload(dataURI, {
    folder: folderPath,
    resource_type: "auto"
  });
};


const router = express.Router();

/* ----------------------------------------------------
   🔐 Event Ownership Guard
---------------------------------------------------- */
async function verifyEventAccess(req, res, next) {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId))
    return res.status(400).json({ message: "Invalid event id" });

  const event = await Event.findById(eventId);
  if (!event || event.isDeleted)
    return res.status(404).json({ message: "Event not found" });

  // Only super admin or event creator can access
  // For legacy events where createdBy is not set, we allow current admins access
  if (
    req.admin.role !== "SUPER_ADMIN" &&
    event.createdBy &&
    String(event.createdBy) !== String(req.admin._id)
  ) {
    return res.status(403).json({ message: "Access denied: You are not the creator of this event." });
  }

  req.event = event;
  next();
}

/* ----------------------------------------------------
   📊 Event Dashboard
---------------------------------------------------- */
router.get("/events/:eventId/stats", requireAdmin, verifyEventAccess, async (req, res) => {
  const eventId = req.params.eventId;

  const [total, approved, pending, controllers] = await Promise.all([
    Registration.countDocuments({ event: eventId }),
    Registration.countDocuments({ event: eventId, status: "APPROVED" }),
    Registration.countDocuments({ event: eventId, status: "PENDING" }),
    Controller.countDocuments({ approvedEvents: eventId })
  ]);

  res.json({ total, approved, pending, controllers });
});

/* ----------------------------------------------------
   🧾 Registrations
---------------------------------------------------- */
router.get("/events/:eventId/registrations", requireAdmin, verifyEventAccess, async (req, res) => {
  const list = await Registration.find({ event: req.params.eventId })
    .select("-receipt.data") // Exclude heavy buffer data
    .populate('approvedBy', 'username')  // Admin model uses 'username' not 'name'
    .sort({ createdAt: -1 });

  res.json(list);
});

router.put(
  "/events/:eventId/registrations/:id/status",
  requireAdmin,
  verifyEventAccess,
  async (req, res) => {
    const { status, sendMail } = req.body;

    const reg = await Registration.findOne({
      _id: req.params.id,
      event: req.params.eventId,
    });

    if (!reg) return res.status(404).json({ message: "Registration not found" });

    reg.status = status;

    // Set approvedBy when approving
    if (status === "APPROVED") {
      reg.approvedAt = new Date();
      reg.approvedBy = req.admin.id;
    }
    // Clear approvedBy when disapproving (changing from APPROVED to PENDING)
    else if (status === "PENDING") {
      reg.approvedAt = null;
      reg.approvedBy = null;
    }
    // Record who rejected
    else if (status === "REJECTED") {
      reg.approvedBy = req.admin.id;
    }

    // Send approval email if requested
    let mailSent = false;
    if (status === "APPROVED" && sendMail) {
      try {
        mailSent = await sendApprovalEmail(reg.oauthEmail, reg, req.event);
        if (mailSent) {
          reg.mailLogs.push({ sentAt: new Date(), sentBy: req.admin.id });
        }
      } catch (mailErr) {
        console.error("[Mail Error] Failed to send approval email:", mailErr);
      }
    }

    await reg.save();

    // Determine action label based on new status
    const actionMap = {
      APPROVED: "APPROVE_REGISTRATION",
      REJECTED: "REJECT_REGISTRATION",
      PENDING: "RESET_REGISTRATION",
    };
    logFromReq(req, actionMap[status] || `REGISTRATION_STATUS_${status}`, {
      registrationId: reg._id,
      eventId: req.params.eventId,
      status,
      mailSent,
    });

    res.json({ ok: true, mailSent });
  }
);

/* ----------------------------------------------------
   📧 RESEND APPROVAL MAIL
---------------------------------------------------- */
router.put(
  "/events/:eventId/registrations/:id/resend-mail",
  requireAdmin,
  verifyEventAccess,
  async (req, res) => {
    try {
      const reg = await Registration.findOne({
        _id: req.params.id,
        event: req.params.eventId,
      });

      if (!reg) return res.status(404).json({ message: "Registration not found" });
      if (reg.status !== "APPROVED") {
        return res.status(400).json({ message: "Can only resend mail for APPROVED registrations" });
      }

      const mailSent = await sendApprovalEmail(reg.oauthEmail, reg, req.event);

      if (mailSent) {
        reg.mailLogs.push({ sentAt: new Date(), sentBy: req.admin.id });
        await reg.save();
        logFromReq(req, "RESEND_APPROVAL_MAIL", {
          registrationId: reg._id,
          eventId: req.params.eventId,
          email: reg.oauthEmail,
        });
        res.json({ ok: true, mailCount: reg.mailLogs.length });
      } else {
        res.status(500).json({ message: "Failed to send email" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Error resending mail" });
    }
  }
);

/* ----------------------------------------------------
   GET RECEIPT IMAGE
---------------------------------------------------- */
router.get(
  "/events/:eventId/registrations/:id/receipt",
  requireAdmin,
  verifyEventAccess,
  async (req, res) => {
    try {
      const reg = await Registration.findOne({
        _id: req.params.id,
        event: req.params.eventId,
      });

      if (!reg || !reg.receipt || !reg.receipt.data) {
        return res.status(404).json({ message: "Receipt not found" });
      }

      res.set("Content-Type", reg.receipt.contentType || "image/jpeg");
      res.send(reg.receipt.data);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Error fetching receipt" });
    }
  }
);

/* ----------------------------------------------------
   🗑️ DELETE REGISTRATION
---------------------------------------------------- */
router.delete(
  "/events/:eventId/registrations/:id",
  requireAdmin,
  verifyEventAccess,
  async (req, res) => {
    try {
      const reg = await Registration.findOneAndDelete({
        _id: req.params.id,
        event: req.params.eventId,
      });

      if (!reg) return res.status(404).json({ message: "Registration not found" });

      logFromReq(req, "DELETE_REGISTRATION", {
        registrationId: reg._id,
        eventId: req.params.eventId,
      });

      res.json({ ok: true, message: "Registration deleted successfully" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Error deleting registration" });
    }
  }
);

/* Rooms removed (room allocation not required) */

/* ----------------------------------------------------
   🖼️ Event Memories
---------------------------------------------------- */
/* ----------------------------------------------------
   🖼️ Event Memories
---------------------------------------------------- */
router.get("/events/:eventId/photos", requireAdmin, verifyEventAccess, async (req, res) => {
  try {
    // 1. Fetch "New" Images (Image Model)
    const images = await Image.find({
      event: req.params.eventId,
      category: "event_memories",
    }).sort({ createdAt: -1 });

    // 2. Fetch "Legacy" Gallery (Event Model)
    // We access req.event because verifyEventAccess middleware populates it
    const event = req.event;
    const legacyImages = event.gallery || [];

    // 3. Normalize Legacy Images to match Image Model structure
    const normalizedLegacy = legacyImages.map(img => ({
      _id: img._id,
      url: img.url,
      public_id: img.public_id,
      category: "event_memories",
      createdAt: img.uploadedAt,
      isLegacy: true // Flag for frontend or delete logic if needed
    }));

    // 4. Combine and return (Newest first)
    // Note: This naive merge doesn't duplicate-check, but usually they don't overlap.
    const combined = [...images, ...normalizedLegacy].sort((a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json(combined);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching photos" });
  }
});

router.post(
  "/events/:eventId/photos",
  requireAdmin,
  verifyEventAccess,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No file uploaded" });

      // Get event slug for folder path (optional, strictly speaking eventId is enough but slug is nicer)
      const event = req.event; // Populated by verifyEventAccess
      const folderPath = `arc_events/${event.slug || event._id}/memories`;

      // Upload to Cloudinary using buffer
      const result = await uploadToCloudinary(req.file, folderPath);

      const img = await Image.create({
        event: req.params.eventId,
        url: result.secure_url,
        public_id: result.public_id,
        category: "event_memories",
      });

      logFromReq(req, "UPLOAD_PHOTO", {
        eventId: req.params.eventId,
        imageId: img._id,
        url: result.secure_url,
      });

      res.json(img);
    } catch (e) {
      console.error("[Upload Error]", e);
      res.status(500).json({ message: "Upload failed: " + e.message });
    }
  }
);

router.delete(
  "/events/:eventId/photos/:id",
  requireAdmin,
  verifyEventAccess,
  async (req, res) => {
    try {
      // 1. Try deleting from Image collection
      const image = await Image.findOne({
        _id: req.params.id,
        event: req.params.eventId,
      });

      if (image) {
        // Delete from Cloudinary
        if (image.public_id) {
          try {
            await cloudinary.uploader.destroy(image.public_id);
          } catch (cErr) {
            console.error("Cloudinary delete failed:", cErr);
          }
        }
        await Image.deleteOne({ _id: image._id });
        logFromReq(req, "DELETE_PHOTO", {
          eventId: req.params.eventId,
          imageId: image._id,
          source: "image_model",
        });
        return res.json({ ok: true, source: 'image_model' });
      }

      // 2. If not found, try deleting from Event.gallery (Legacy)
      const event = await Event.findById(req.params.eventId);
      if (event && event.gallery) {
        const photo = event.gallery.find(p => p._id.toString() === req.params.id);

        if (photo) {
          // Delete from Cloudinary
          if (photo.public_id) {
            try {
              await cloudinary.uploader.destroy(photo.public_id);
            } catch (cErr) {
              console.error("Cloudinary delete failed:", cErr);
            }
          }

          // Remove from array
          event.gallery.pull(req.params.id);
          await event.save();
          logFromReq(req, "DELETE_PHOTO", {
            eventId: req.params.eventId,
            imageId: req.params.id,
            source: "legacy_gallery",
          });
          return res.json({ ok: true, source: 'legacy_gallery' });
        }
      }

      res.status(404).json({ message: "Photo not found" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Delete failed" });
    }
  }
);

router.post(
  "/events/:eventId/photos/import",
  requireAdmin,
  verifyEventAccess,
  async (req, res) => {
    try {
      // Changed strategy: Receive full photo objects from frontend
      // This bypasses the issue where backend couldn't find IDs in DB
      const { sourceEventId, photos } = req.body;

      if (!photos || !Array.isArray(photos) || photos.length === 0) {
        return res.status(400).json({ message: "No photos provided" });
      }

      console.log(`[DEBUG] Import request (Direct). Target: ${req.params.eventId}, PhotoCount: ${photos.length}`);

      // 1. Prepare new image documents pointing to the SAME URL
      // CRITICAL: Explicitly cast event ID to ensure it matches schema type
      const targetEventId = new mongoose.Types.ObjectId(req.params.eventId);

      const newImages = photos.map(img => ({
        event: targetEventId,
        url: img.url,
        public_id: img.public_id,
        category: "event_memories",
      }));

      // 2. Bulk insert
      const result = await Image.insertMany(newImages);
      console.log(`[DEBUG] Imported ${result.length} images.`);

      logFromReq(req, "IMPORT_PHOTOS", {
        targetEventId: req.params.eventId,
        sourceEventId,
        count: result.length,
      });

      res.json({ message: "Imported successfully", count: newImages.length });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Import failed" });
    }
  }
);

export default router;
