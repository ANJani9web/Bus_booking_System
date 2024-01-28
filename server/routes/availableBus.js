const express = require("express");
const router = express.Router();
const Bus = require("../models/busModel");
const geolib = require("geolib");

// Route to get available buses between source and destination
router.post("/availableBuses", async (req, res) => {
  const { source, destination } = req.body;
  console.log(req.body);
  const buses = await Bus.find({
    'route.origin': source,
    'route.destination': destination,
  })
  res.json(buses);
});

// Other routes from busModel.js

// Helper function to calculate ETA based on distance (you can adjust this)
function calculateETA(distance) {
  // Implement your ETA calculation logic here
  // For example, using average speed or other factors
  return Math.round(distance / 60); // Simple example: ETA in minutes based on average speed
}

module.exports = router;
