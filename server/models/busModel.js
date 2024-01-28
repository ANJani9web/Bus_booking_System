const mongoose = require("mongoose");

// Schema for Bus
const busSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  currentOccupancy: { type: Number, default: 0 },
  availableDays: { type: [String], required: true },
  route: {
    type: {
      origin: { type: String, required: true },
      destination: { type: String, required: true },
    },
  },
  seatPlan: {
    // Define your seat plan structure here
    // For example, an array of objects with seat number, design, and booking status
    type: [
      {
        seatNumber: { type: String, required: true },
        design: { type: String, required: true },
        isBooked: { type: Boolean, default: false },
      },
    ],
    default: [],
  },
});

// Model for Bus
const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
