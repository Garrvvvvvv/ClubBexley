import Podcast from "../models/Podcast.js";
import { logFromReq } from "../utils/logAdminAction.js";

/* --------------------------------------------------
   PUBLIC: GET all visible podcasts
-------------------------------------------------- */
export async function getPublicPodcasts(req, res) {
  try {
    const podcasts = await Podcast.find({ isHidden: false }).sort({ series: 1, order: 1 });
    res.json(podcasts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load podcasts" });
  }
}

/* --------------------------------------------------
   ADMIN: GET all podcasts
-------------------------------------------------- */
export async function getAllPodcasts(req, res) {
  try {
    const podcasts = await Podcast.find({}).sort({ series: 1, order: 1 });
    res.json(podcasts);
  } catch (err) {
    res.status(500).json({ message: "Failed to load podcasts" });
  }
}

/* --------------------------------------------------
   ADMIN: CREATE podcast
-------------------------------------------------- */
export async function createPodcast(req, res) {
  try {
    const { series, title, host, guest, description, youtubeLink, date, order, isHidden } = req.body;
    if (!series || !title || !host || !guest || !description || !youtubeLink) {
      return res.status(400).json({ message: "series, title, host, guest, description, and youtubeLink are required" });
    }

    // Auto-assign order if not provided (append at end of series)
    let finalOrder = order;
    if (finalOrder === undefined || finalOrder === null || finalOrder === "") {
      const count = await Podcast.countDocuments({ series });
      finalOrder = count;
    }

    const podcast = await Podcast.create({
      series, title, host, guest, description, youtubeLink,
      date: date || "",
      order: Number(finalOrder),
      isHidden: isHidden || false,
    });

    logFromReq(req, "CREATE_PODCAST", { podcastId: podcast._id, title: podcast.title, series: podcast.series });
    res.status(201).json(podcast);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Creation failed" });
  }
}

/* --------------------------------------------------
   ADMIN: UPDATE podcast
-------------------------------------------------- */
export async function updatePodcast(req, res) {
  try {
    const podcast = await Podcast.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
    logFromReq(req, "UPDATE_PODCAST", { podcastId: podcast._id, title: podcast.title });
    res.json(podcast);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
}

/* --------------------------------------------------
   ADMIN: DELETE podcast
-------------------------------------------------- */
export async function deletePodcast(req, res) {
  try {
    const podcast = await Podcast.findByIdAndDelete(req.params.id);
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });
    logFromReq(req, "DELETE_PODCAST", { podcastId: podcast._id, title: podcast.title });
    res.json({ message: "Podcast deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
}

/* --------------------------------------------------
   ADMIN: REORDER — swap order of two podcasts
-------------------------------------------------- */
export async function reorderPodcast(req, res) {
  try {
    const { idA, idB } = req.body;
    const [a, b] = await Promise.all([Podcast.findById(idA), Podcast.findById(idB)]);
    if (!a || !b) return res.status(404).json({ message: "Podcast not found" });

    const tmpOrder = a.order;
    a.order = b.order;
    b.order = tmpOrder;
    await Promise.all([a.save(), b.save()]);

    res.json({ message: "Reordered" });
  } catch (err) {
    res.status(500).json({ message: "Reorder failed" });
  }
}
