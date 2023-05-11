var express = require("express");
var router = express.Router();
const User = require('../models/UserSchema');

/* GET users listing. */
router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;

  // Find the user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        // User not found
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the password matches
      if (user.password !== password) {
        // Incorrect password
        return res.status(401).json({ message: "Incorrect password" });
      }

      // Successful sign-in
      return res.status(200).json({ message: "Sign-in successful" });
    })
    .catch((error) => {
      // Error occurred during sign-in
      console.error("Error during sign-in", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post("/signup", (req, res, next) => {
  const { name, email, password, userType } = req.body;

  // Check if the email is already registered
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        // Email is already registered
        return res.status(409).json({ message: "Email is already registered" });
      }

      // Create a new user
      const newUser = new User({
        name,
        email,
        password,
        userType,
      });

      // Save the new user to the database
      return newUser.save();
    })
    .then(() => {
      // Successful sign-up
      res.status(201).json({ message: "Sign-up successful" });
    })
    .catch((error) => {
      // Error occurred during sign-up
      console.error("Error during sign-up", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
