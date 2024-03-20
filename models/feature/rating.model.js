const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema(
  {
    house: {
      type: mongoose.Schema.Types.ObjectId,
      rel: "House",
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      enum: [1, 2, 3, 4, 5], // Only allow ratings from 1 to 5 stars
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const RatingModel = mongoose.model("Rating", ratingSchema);

module.exports = RatingModel;
