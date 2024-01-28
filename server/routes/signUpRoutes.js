// signupRoute.js
const express = require("express");
const router = express.Router();
const User = require("../models/signup"); // Adjust the path accordingly
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
