
const express = require("express");
const router = express.Router();
const Bus = require("../models/busModel");
const { ObjectId } = require("mongodb");

// Route to cancel seat booking
router.post("/cancelSeatBooking/:busId/:seatNumber", async (req, res) => {
  const { busId, seatNumber } = req.params;
  const busObjectId = new ObjectId(busId);

  try {
    const bus = await Bus.findById(busObjectId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const seatIndex = bus.seatPlan.findIndex(
      (seat) => seat.seatNumber === seatNumber
    );

    if (seatIndex === -1) {
      return res.status(404).json({ message: "Seat not found" });
    }

    // Check if the seat is booked
    if (!bus.seatPlan[seatIndex].isBooked) {
      return res.status(400).json({ message: "Seat is not booked" });
    }

    // Cancel the seat booking
    bus.seatPlan[seatIndex].isBooked = false;
    bus.currentOccupancy--;

    await bus.save();

    res.json({ message: "Seat booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
