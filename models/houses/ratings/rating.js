const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema(
  {
    house: {
      type: mongoose.Schema.Types.ObjectId,
      rel: "House",
      require: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    score: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

const HouseRatingModel = mongoose.model("Rating", ratingSchema);

module.exports = HouseRatingModel;
