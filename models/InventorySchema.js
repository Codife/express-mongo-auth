const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  LCDs: [
    {
      company: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
    },
  ],
  storageDevices: [
    {
      type: {
        type: String,
        required: true,
        enum: ["HDD", "SSD"],
      },
      company: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
    },
  ],
  rams: [
    {
      company: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
    },
  ],
  cards: [
    {
      company: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
    },
  ],
  psu: [
    {
      company: {
        type: String,
        required: true,
      },
      watt: {
        type: Number,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
    },
  ],
  headphone: [
    {
      company: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
    },
  ],
  mouse: [
    {
      company: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
    },
  ],
  keyboard: [
    {
      company: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
    },
  ],
  case: [
    {
      company: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
    },
  ],
  fan: [
    {
      company: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
    },
  ],
});

const Inventory = mongoose.model("Inventory_item", inventorySchema);

module.exports = Inventory;
