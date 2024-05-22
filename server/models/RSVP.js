const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rsvpSchema = new Schema(
  {
    guestName: { type: String, required: true },
    attending: { type: Boolean, required: true },
    guestCount: { type: Number, required: true },
    mealChoice: { type: String, required: false },
    allergies: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const RSVP = mongoose.model("RSVP", rsvpSchema);

module.exports = RSVP;
