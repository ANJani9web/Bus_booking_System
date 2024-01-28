// loginRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/signup");


const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
      res.send("We need a token, please give it to us next time");
  } else {
      jwt.verify(token, "jwtSecret", (err, decoded) => {
          if (err) {
              console.log(err);
              res.json({ auth: false, message: "you are failed to authenticate"});
          } else {
              req.userId = decoded.id;
              next();
          }
      });
  }
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Set a session cookie or store session information as needed
    // req.session.userId = user._id;
    const id =  user._id;
    const token = jwt.sign({ id }, "jwtSecret", {
      expiresIn: 300,
    });
    req.session.user = user;
    res.json({ message: "Login successful", auth: true, token: token, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/isUserAuth", verifyJWT, (req, res) => {
  res.json({ auth: true, message: "User authenticated", user: req.userId, hello: "hello" });
});

module.exports = router;
