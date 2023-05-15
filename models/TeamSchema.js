const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  teamLeads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  teamMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
