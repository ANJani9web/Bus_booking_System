const express = require("express");
const router = express.Router();
const User = require("../models/UsersModel");
const { ObjectId } = require("mongodb");

// Route to get available buses between source and destination
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const _id = new ObjectId(id);
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/update/:id", async (req, res) => {
    const { id } = req.params;
    const _id = new ObjectId(id);
    try {
      const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Other routes from busModel.js

// Helper function to calculate ETA based on distance (you can adjust this)
function calculateETA(distance) {
  // Implement your ETA calculation logic here
  // For example, using average speed or other factors
  return Math.round(distance / 60); // Simple example: ETA in minutes based on average speed
}

module.exports = router;
