import mongoose from "mongoose";

const PodcastSchema = new mongoose.Schema({
  series: { type: String, required: true }, // Display name, e.g. "Engineers Beyond Engineering"
  title: { type: String, required: true },
  host: { type: String, required: true },
  guest: { type: String, required: true },
  description: { type: String, required: true },
  youtubeLink: { type: String, required: true },
  date: { type: String, default: "" },
  order: { type: Number, default: 0 },
  isHidden: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Podcast", PodcastSchema);
