var express = require("express");
var router = express.Router();
const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const { userTypes } = require("../constants");

router.post("/create", async (req, res) => {
  const { name, email, password, userType, userRole, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      userRole,
      phoneNumber,
    });

    await newUser.save();

    return res.status(201).json({ message: "Sign-up successful", token });
  } catch (error) {
    console.error("Error during sign-up", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user-types", async (req, res) => {
  return res.status(200).json({ message: "Success", userTypes: userTypes });
});

module.exports = router;
