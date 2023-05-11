const express = require("express");
const Inventory = require("../models/InventorySchema");
const verifyJWT = require("../middlewares/auth");

const router = express.Router();

router.get("/", verifyJWT, async (req, res) => {
  if (req.user.userType !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const items = await Inventory.find({});

    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching inventory", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add-items", verifyJWT, async (req, res) => {
  if (req.user.userType !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const items = req.body;

    let inventory = await Inventory.findOne({});

    if (!inventory) {
      inventory = new Inventory();
    }

    for (const category in items) {
      if (Object.hasOwnProperty.call(items, category)) {
        const details = items[category];
        inventory[category].push(details);
      }
    }

    await inventory.save();

    res.status(200).json({ message: "Items added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/update-item", verifyJWT, async (req, res) => {
  if (req.user.userType !== "Admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const { type, company, size, model, watt } = req.body;

  try {
    const inventory = await Inventory.findOne();

    if (type === "LCD") {
      inventory.LCDs.push({ company, size });
    } else if (type === "StorageDevice") {
      inventory.storageDevices.push({ company, size });
    } else if (type === "Ram") {
      inventory.rams.push({ company, size });
    } else if (type === "Card") {
      inventory.cards.push({ company, size });
    } else if (type === "PSU") {
      inventory.psu.push({ company, watt });
    } else if (type === "Headphone") {
      inventory.headphone.push({ company, model });
    } else if (type === "Mouse") {
      inventory.mouse.push({ company, model });
    } else if (type === "Keyboard") {
      inventory.keyboard.push({ company, model });
    } else if (type === "Case") {
      inventory.case.push({ company, model });
    } else if (type === "Fan") {
      inventory.fan.push({ company, model });
    } else {
      return res.status(400).json({ message: "Invalid item type" });
    }

    await inventory.save();

    return res.status(200).json({ message: "Item added to inventory" });
  } catch (error) {
    console.error("Error adding item to inventory", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
