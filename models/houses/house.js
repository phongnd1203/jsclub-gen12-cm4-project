const mongoose = require("mongoose");

const houseStatus = require("../../enums/houseStatus.js");

const locationSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    district: {
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
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: locationSchema,
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
    images: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "File",
        },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: Object.keys(houseStatus),
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const HouseModel = mongoose.model("House", houseSchema);

module.exports = HouseModel;
