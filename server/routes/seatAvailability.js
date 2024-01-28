
const express = require("express");
const router = express.Router();
const Bus = require("../models/busModel");
const { ObjectId } = require("mongodb");

// Route to check seat availability on a specific bus
router.get("/checkSeatAvailability/:id", async (req, res) => {
  const { id } = req.params;
  const _id = new ObjectId(id);

  try {
    const bus = await Bus.findById(_id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const availableSeats = bus.totalSeats - bus.currentOccupancy;

    res.json({ availableSeats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
