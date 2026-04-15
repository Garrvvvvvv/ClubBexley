import { Router } from "express";

import {
  getEvents,
  getEventBySlug,
  getEventFlow,
  getEventMemories
} from "../controllers/events/publicEventController.js";

const router = Router();

/* ===========================================
   PUBLIC EVENT ROUTES
   =========================================== */
router.get("/ongoing", getEvents);
router.get("/:slug/flow", getEventFlow);
router.get("/:slug/memories", getEventMemories);
router.get("/:slug", getEventBySlug);

export default router;
