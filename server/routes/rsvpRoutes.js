const express = require("express");
const router = express.Router();
const rsvpController = require("../controllers/rsvpController");
const RSVP = require("../models/RSVP");

router.get("/", rsvpController.getRSVPs);
router.post("/add", rsvpController.createRSVP);
router.delete("/delete/:id", rsvpController.deleteRSVP);

module.exports = router;
