const mongoose = require("mongoose");
const { userTypes } = require("../constants");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: userTypes,
  },
  userRole: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
