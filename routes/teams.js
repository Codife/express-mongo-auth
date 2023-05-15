var express = require("express");
var router = express.Router();
const Team = require("../models/TeamSchema.js");

router.post(
  "/create",
  requireAuth,
  checkUserRole("Admin"),
  async (req, res) => {
    try {
      const team = new Team({
        teamName: req.body.teamName,
        teamLeads: req.body.teamLeads,
        teamMembers: req.body.teamMembers,
      });

      const newTeam = await team.save();
      res.status(201).json(newTeam);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
