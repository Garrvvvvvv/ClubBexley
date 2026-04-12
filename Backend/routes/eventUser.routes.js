import { Router } from "express";
import multer from "multer";
import Event from "../models/Event.js";
import { registerEvent, getMyRegistration } from "../controllers/registration/eventController.js";
import requireUser from "../middleware/requireUser.js";
import eventLock from "../middleware/eventLock.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/* =========================
   PUBLIC: Ongoing events
========================= */
router.get("/ongoing", async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({
      startDate: { $lte: now },
      endDate: { $gte: now }
    })
      .select("name slug startDate endDate isPaid roomAllocationEnabled")
      .sort({ startDate: 1 });

    res.json(events);
  } catch (err) {
    console.error("fetch ongoing events error:", err);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

/* =========================
   LOCKED EVENT ROUTES
========================= */
router.post(
  "/:eventSlug/register",
  requireUser,
  eventLock,
  upload.single("receipt"),
  registerEvent
);

router.get(
  "/:eventSlug/me",
  requireUser,
  eventLock,
  getMyRegistration
);

import Registration from "../models/Registration.js";

router.get(
  "/:eventSlug/me/receipt",
  requireUser,
  eventLock,
  async (req, res) => {
    try {
      const { event } = req;
      const { sub: oauthUid, email: oauthEmail } = req.user;

      const reg = await Registration.findOne({
        event: event._id,
        $or: [{ oauthUid }, { oauthEmail }]
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

export default router;
