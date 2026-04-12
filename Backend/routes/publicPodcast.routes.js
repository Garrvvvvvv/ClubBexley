import { Router } from "express";
import { getPublicPodcasts } from "../controllers/podcastController.js";

const router = Router();

router.get("/", getPublicPodcasts);

export default router;
