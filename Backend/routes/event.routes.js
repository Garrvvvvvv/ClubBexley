import { Router } from "express";
import multer from "multer";

// 1. Import from PUBLIC controller
import {
  getEvents,
  getEventBySlug,
  getEventFlow,
  getEventMemories
} from "../controllers/events/publicEventController.js";

// 2. Import from REGISTRATION controller 
// FIX: Added 'getMyAllRegistrations' to this list 👇
import {
  registerEvent,
  getMyRegistration,
  getMyAllRegistrations
} from "../controllers/registration/eventController.js";

import requireUser from "../middleware/requireUser.js";
import eventLock from "../middleware/eventLock.js";
import lockAware from "../middleware/lockAware.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/* ===========================================
   1. USER DASHBOARD ROUTES (My Registrations)
   Must be BEFORE generic /:slug routes
   =========================================== */
router.get("/registrations/mine", requireUser, getMyAllRegistrations);

/* ===========================================
   2. PUBLIC EVENT ROUTES
   Lock-aware middleware applied
   =========================================== */
router.get("/ongoing", lockAware, getEvents);
router.get("/:slug/flow", lockAware, getEventFlow);
router.get("/:slug/memories", lockAware, getEventMemories);

/* ===========================================
   3. SINGLE EVENT DETAILS
   =========================================== */
router.get("/:slug", lockAware, getEventBySlug);

/* ===========================================
   4. REGISTRATION ACTIONS
   =========================================== */
router.post(
  "/:eventSlug/register",
  requireUser,
  eventLock,
  upload.single("receipt"),
  registerEvent
);

import Registration from "../models/Registration.js";

// ... existing code ...

router.get(
  "/:eventSlug/me",
  requireUser,
  eventLock,
  getMyRegistration
);

router.get(
  "/:eventSlug/me/receipt",
  requireUser,
  eventLock,
  async (req, res) => {
    try {
      const { event } = req;
      const { sub: oauthUid, email: oauthEmail } = req.user;

      console.log(`[DEBUG] Fetching receipt for User: ${oauthUid} (${oauthEmail}) Event: ${event._id}`);

      const reg = await Registration.findOne({
        event: event._id,
        $or: [{ oauthUid }, { oauthEmail }]
      });

      if (!reg) {
        console.log("[DEBUG] Registration not found");
        return res.status(404).json({ message: "Registration not found" });
      }

      if (!reg.receipt || !reg.receipt.data) {
        console.log("[DEBUG] Receipt data missing in registration", reg._id);
        return res.status(404).json({ message: "Receipt not found" });
      }

      console.log(`[DEBUG] Sending receipt. Size: ${reg.receipt.data.length}, Type: ${reg.receipt.contentType}`);
      res.set("Content-Type", reg.receipt.contentType || "image/jpeg");
      res.send(reg.receipt.data);
    } catch (e) {
      console.error("[DEBUG] Error fetching receipt:", e);
      res.status(500).json({ message: "Error fetching receipt" });
    }
  }
);

export default router;