const express = require("express");
const router = express.Router();
const Bus = require("../models/busModel");
const { ObjectId } = require("mongodb");

// Get all buses
router.get("/getAllBus", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new bus

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

router.post("/addBus", async (req, res) => {
  const { busName, totalSeats, currentOccupancy, availableDays, route } =
    req.body;

  try {
    // Initialize the seat plan with the correct number of seats
    const seatPlan = Array.from({ length: totalSeats }, (_, index) => ({
      seatNumber: `Seat-${index + 1}`,
      design: index % 2 === 0 ? "Window" : "Aisle",
      isBooked: false,
    }));

    // Randomly allocate occupied seats
    const occupiedSeats = seatPlan.slice(0, currentOccupancy);
    shuffleArray(occupiedSeats);

    // Update isBooked for occupied seats
    occupiedSeats.forEach((seat) => {
      seat.isBooked = true;
    });

    const newBus = new Bus({
      busName,
      totalSeats,
      currentOccupancy,
      availableDays,
      route,
      seatPlan,
    });

    await newBus.save();
    res.status(201).json(newBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// getBusById
router.get("/getBusById/:id", async (req, res) => {
  const { id } = req.params;
  const _id = new ObjectId(id);
  try {
    const bus = await Bus.findById(_id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update bus details
router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const _id = new ObjectId(id);
  try {
    const updatedBus = await Bus.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    //res.json({ message: "Bus deleted successfully" });
    res.json(updatedBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a bus
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const _id = new ObjectId(id);
  try {
    await Bus.findByIdAndDelete(_id);
    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
