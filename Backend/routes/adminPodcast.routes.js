import { Router } from "express";
import requireAdmin from "../middleware/requireAdmin.js";
import {
  getAllPodcasts,
  createPodcast,
  updatePodcast,
  deletePodcast,
  reorderPodcast,
} from "../controllers/podcastController.js";

const router = Router();

router.get("/", requireAdmin, getAllPodcasts);
router.post("/", requireAdmin, createPodcast);
router.patch("/reorder", requireAdmin, reorderPodcast);
router.patch("/:id", requireAdmin, updatePodcast);
router.delete("/:id", requireAdmin, deletePodcast);

export default router;
