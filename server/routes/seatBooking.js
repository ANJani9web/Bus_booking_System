
const express = require("express");
const router = express.Router();
const Bus = require("../models/busModel");
const { ObjectId } = require("mongodb");

// Route to reserve a specific seat on a selected bus
router.post("/reserveSeat/:id/:seatNumber", async (req, res) => {
  const { id, seatNumber } = req.params;
  const _id = new ObjectId(id);

  try {
    const bus = await Bus.findById(_id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Find the seat by seat number
    const seatIndex = bus.seatPlan.findIndex(seat => seat.seatNumber === seatNumber);

    if (seatIndex === -1) {
      return res.status(404).json({ message: "Seat not found" });
    }

    // Check if the seat is already booked
    if (bus.seatPlan[seatIndex].isBooked) {
      return res.status(400).json({ message: "Seat is already booked" });
    }

    // Reserve the seat
    bus.seatPlan[seatIndex].isBooked = true;
    bus.currentOccupancy += 1;
    await bus.save();

    res.json({ message: "Seat reserved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
