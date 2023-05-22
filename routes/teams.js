var express = require("express");
var router = express.Router();
const Team = require("../models/TeamSchema.js");
const verifyJWT = require("../middlewares/auth");
const checkUserRole = require("../middlewares/isAdmin");

router.post("/create", verifyJWT, checkUserRole("Admin"), async (req, res) => {
  try {
    const team = new Team({
      teamName: req.body.teamName,
      teamLeads: req.body.teamLeads,
      teamMembers: req.body.teamMembers,
    });

    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
});
router.get("/", verifyJWT, checkUserRole("Admin"), async (req, res) => {
  try {
    const teams = await Team.find();
    await Team.populate(teams, {
      path: "teamLeads teamMembers",
      select: "-password",
    });
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", verifyJWT, checkUserRole("Admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const teams = await Team.findById(id);
    await Team.populate(teams, {
      path: "teamLeads teamMembers",
      select: "-password",
    });
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
