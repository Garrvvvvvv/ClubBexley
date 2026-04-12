import mongoose from "mongoose";

const EventFlowSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength:3, maxlength:40 },
  desc: { type: String, required: true, minlength:2, maxlength:150 },
  date: { type: String, required: true },
}, { _id: false });

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength:3, maxlength:40 },
  slug: { type: String, unique: true, required: true, minlength:1, maxlength:10 },
  description: { type: String, required: true, minlength:10, maxlength:150 },

  // CRITICAL: Ensure these field names match exactly what we set in controller
  posterUrl: { type: String, default: "" },
  paymentQRUrl: { type: String, default: "" },

  status: {
    type: String,
    enum: ["DRAFT", "LIVE", "PAUSED", "CLOSED"],
    default: "DRAFT",
  },

  isHidden: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },

  paid: { type: Boolean, default: false },

  basePrice: { type: Number, default: 10000 },
  familyAllowed: { type: Boolean, default: false },
  addonPricePerMember: { type: Number, default: 5000 },

  flow: [EventFlowSchema],

  gallery: [{
    url: String,
    public_id: String,
    caption: String,
    uploadedAt: { type: Date, default: Date.now }
  }],

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
}, { timestamps: true });

export default mongoose.model("Event", EventSchema);