var express = require("express");
var router = express.Router();
const User = require("../models/UserSchema");
const bcrypt = require('bcrypt');
const { userTypes } = require("../constants");
const verifyJWT = require("../middlewares/auth");
const checkUserRole = require("../middlewares/isAdmin");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         userType:
 *           type: string
 *           enum: ['Admin', 'User', 'Lead']
 *         userRole:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         team:
 *           type: string
 *           format: uuid
 */

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     security:
 *       - JWT: []
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '409':
 *         description: Email is already registered
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user-types:
 *   get:
 *     summary: Get available user types
 *     tags:
 *       - Users
 *     security:
 *       - JWT: []
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userTypes:
 *                   type: array
 *                   items:
 *                     type: string
 */

router.post("/create", verifyJWT, checkUserRole("Admin"), async (req, res) => {
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

    return res.status(201).json({ message: "Sign-up successful", newUser });
  } catch (error) {
    console.error("Error during sign-up", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/edit/:id", verifyJWT, checkUserRole("Admin"), async (req, res) => {
  const { name, email, password, userType, userRole, phoneNumber, team } =
    req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.userType = userType;
    user.userRole = userRole;
    user.phoneNumber = phoneNumber;
    user.team = team;

    await user.save();

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error during user update", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  "/get-all-users",
  verifyJWT,
  checkUserRole("Admin"),
  async (req, res) => {
    try {
      const users = await User.find().populate("team");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get(
  "/get-user-by-type/:userType",
  verifyJWT,
  checkUserRole("Admin"),
  async (req, res) => {
    const { userType } = req.params;
    try {
      const users = await User.find({ userType: userType });
      console.log("USERS", users);
      res.status(200).json({ message: "Success", users });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/user-types", async (req, res) => {
  return res.status(200).json({ message: "Success", userTypes: userTypes });
});

module.exports = router;
