const RSVP = require("../models/RSVP");
const path = require("path");

// Get all RSVPs
exports.getRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find();
    res.json(rsvps);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new RSVP
exports.createRSVP = async (req, res) => {
  const { guestName, attending, guestCount, mealChoice, allergies } = req.body;
  const newRSVP = new RSVP({
    guestName,
    attending,
    guestCount,
    mealChoice,
    allergies,
  });

  try {
    const savedRSVP = await newRSVP.save();
    res.status(201).json(savedRSVP);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get RSVP statistics
exports.getRSVPStats = async (req, res) => {
  try {
    const totalAttending = await RSVP.countDocuments({ attending: true });
    const mealChoices = await RSVP.aggregate([{ $match: { attending: true } }, { $group: { _id: "$mealChoice", count: { $sum: 1 } } }]);
    const allergiesList = await RSVP.find({ attending: true, allergies: { $ne: "" } }, "allergies");

    res.json({ totalAttending, mealChoices, allergiesList });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an RSVP
exports.deleteRSVP = async (req, res) => {
  try {
    const deletedRSVP = await RSVP.findByIdAndDelete(req.params.id);
    if (!deletedRSVP) {
      return res.status(404).json({ message: "RSVP not found" });
    }
    res.json(deletedRSVP);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
