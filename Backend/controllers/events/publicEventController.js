import Event from "../../models/Event.js";
import Image from "../../models/Image.js";

/* ----------------------------------------------------
   1. GET ALL "LIVE" EVENTS (Public Directory)
   - Used for Home Page / Event Directory
   - Filters out DRAFT, PAUSED, CLOSED, HIDDEN, DELETED
   - Lock-aware: Returns only locked event if lock is active
---------------------------------------------------- */
export async function getEvents(req, res) {
  try {
    // If locked, return only the locked event
    if (req.isLocked && req.lockedEventId) {
      const event = await Event.findById(req.lockedEventId)
        .select("name slug posterUrl status paid description");

      if (!event) {
        return res.status(404).json({ message: "Locked event not found" });
      }

      // Return as array for consistency with normal response
      return res.json([event]);
    }

    // Normal mode: return all visible events (exclude DRAFT)
    const events = await Event.find({
      status: { $in: ["LIVE", "PAUSED", "CLOSED"] },
      isHidden: false,
      isDeleted: false,
    })
      .select("name slug posterUrl status paid description") // Lightweight selection
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (err) {
    console.error("getEvents Error:", err);
    res.status(500).json({ message: "Failed to load events" });
  }
}

/* ----------------------------------------------------
   2. GET SINGLE EVENT BY SLUG (Full Details)
   - Used for Registration Page logic
   - Lock-aware: Validates slug matches locked event
---------------------------------------------------- */
export async function getEventBySlug(req, res) {
  try {
    const { slug } = req.params;

    // If locked, verify slug matches locked event
    if (req.isLocked && slug !== req.lockedEventSlug) {
      return res.status(403).json({ message: "Access to this event is restricted" });
    }

    const event = await Event.findOne({ slug, isDeleted: false });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    // Hide sensitive fields if needed (none strictly sensitive here yet)
    res.json(event);
  } catch (err) {
    console.error("getEventBySlug Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/* ----------------------------------------------------
   3. GET EVENT FLOW (Timeline Only) - NEW FUNCTION
   - Used for the Timeline/Flow Page
   - Lock-aware: Validates slug matches locked event
---------------------------------------------------- */
export async function getEventFlow(req, res) {
  try {
    const { slug } = req.params;

    // If locked, verify slug matches locked event
    if (req.isLocked && slug !== req.lockedEventSlug) {
      return res.status(403).json({ message: "Access to this event is restricted" });
    }

    // Find event by slug, return ONLY name and flow array
    const event = await Event.findOne({ slug, isDeleted: false })
      .select("name flow");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error("Get Flow Error:", err);
    res.status(500).json({ message: "Server error fetching flow" });
  }
}

/* ----------------------------------------------------
   4. GET EVENT MEMORIES (Gallery)
   - Used for the Public Gallery Page
   - Lock-aware: Validates slug matches locked event
---------------------------------------------------- */
/* ----------------------------------------------------
   4. GET EVENT MEMORIES (Gallery)
   - Used for the Public Gallery Page
   - Lock-aware: Validates slug matches locked event
---------------------------------------------------- */
export async function getEventMemories(req, res) {
  try {
    const { slug } = req.params;

    // If locked, verify slug matches locked event
    if (req.isLocked && slug !== req.lockedEventSlug) {
      return res.status(403).json({ message: "Access to this event is restricted" });
    }

    // 1. Find Event (need ID for Image query)
    const event = await Event.findOne({ slug, isDeleted: false }).select("gallery _id");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 2. Fetch "New" Images (Image Model)
    const newImages = await Image.find({
      event: event._id,
      category: "event_memories"
    }).sort({ createdAt: -1 });

    // 3. Fetch "Legacy" Gallery
    const legacyImages = event.gallery || [];

    // 4. Normalize Legacy Images
    const normalizedLegacy = legacyImages.map(img => ({
      _id: img._id,
      url: img.url,
      public_id: img.public_id,
      category: "event_memories",
      createdAt: img.uploadedAt,
      isLegacy: true
    }));

    // 5. Combine and Sort (Newest first)
    const combined = [...newImages, ...normalizedLegacy].sort((a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json(combined);
  } catch (err) {
    console.error("Get Memories Error:", err);
    res.status(500).json({ message: "Server error fetching memories" });
  }
}