const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },
    districtCode: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    _id: false,
  },
);

const houseSchema = mongoose.Schema(
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
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      index: true,
    },
    area: {
      type: Number,
      default: 0,
      index: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const HouseModel = mongoose.model("House", houseSchema);

module.exports = HouseModel;
