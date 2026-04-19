import mongoose from "mongoose";

/* --------------------------------------------------
   Sub-schemas
-------------------------------------------------- */

const ItineraryDaySchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true },
  title:     { type: String, required: true, maxlength: 80 },
  description: { type: String, default: "", maxlength: 1000 },
}, { _id: false });

const PricingTierSchema = new mongoose.Schema({
  roomType:       { type: String, required: true }, // "Quad Sharing", "Twin Sharing", etc.
  pricePerPerson: { type: Number, required: true },
}, { _id: false });

const TripDateSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate:   { type: Date, required: true },
  note:      { type: String, default: "" },   // e.g. "Limited Seats"
}, { _id: false });

// Legacy: club-event timeline step (kept for CLUB_EVENT type)
const EventFlowSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 40 },
  desc:  { type: String, required: true, minlength: 2, maxlength: 150 },
  date:  { type: String, required: true },
}, { _id: false });

/* --------------------------------------------------
   Main Event / Trip schema
-------------------------------------------------- */
const EventSchema = new mongoose.Schema({

  /* ---- Core ---- */
  name:        { type: String, required: true, minlength: 3, maxlength: 80 },
  slug:        { type: String, unique: true, required: true, minlength: 1, maxlength: 60 },
  description: { type: String, required: true, minlength: 10, maxlength: 500 },
  type:        { type: String, enum: ["TRIP", "CLUB_EVENT"], default: "CLUB_EVENT" },

  posterUrl:       { type: String, default: "" },
  mobilePosterUrl: { type: String, default: "" },
  paymentQRUrl:    { type: String, default: "" },

  status: {
    type: String,
    enum: ["DRAFT", "LIVE", "PAUSED", "CLOSED"],
    default: "DRAFT",
  },

  isHidden:  { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },

  /* ---- Booking ---- */
  googleFormLink: { type: String, default: "" }, // redirect for registration

  /* ---- Trip-specific fields ---- */
  duration:       { type: String, default: "" },   // e.g. "2N-3D"
  pickupDrop:     { type: String, default: "" },   // e.g. "Delhi"
  startingPrice:  { type: Number, default: 0 },    // lowest tier price shown in listing

  itinerary:    [ItineraryDaySchema],
  pricingTiers: [PricingTierSchema],
  tripDates:    [TripDateSchema],

  inclusions:         [{ type: String }],
  exclusions:         [{ type: String }],
  notes:              [{ type: String }],
  cancellationPolicy: { type: String, default: "" },
  thingsToCarry:      [{ type: String }],

  /* ---- Club-event-specific fields ---- */
  paid:                { type: Boolean, default: false },
  basePrice:           { type: Number, default: 0 },
  familyAllowed:       { type: Boolean, default: false },
  addonPricePerMember: { type: Number, default: 0 },
  flow:                [EventFlowSchema],

  /* ---- Gallery ---- */
  gallery: [{
    url:        String,
    public_id:  String,
    caption:    String,
    uploadedAt: { type: Date, default: Date.now }
  }],

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

}, { timestamps: true });

export default mongoose.model("Event", EventSchema);
