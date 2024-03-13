const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    address: {
      type: addressSchema,
    },
    price: {
      type: Number,
    },
    size: {
      type: Number,
    },
    capacity: {
      type: Number,
    },
    available: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const addressSchema = mongoose.Schema({
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
  commune: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commune",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const RoomModel = mongoose.model("Room", roomSchema);

module.exports = RoomModel;
