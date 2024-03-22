const HouseRatingModel = require("../../../models/houses/ratings/rating.js");

const defaultOptions = {
  limit: 30,
  page: 1,
  sort: { createdAt: -1 },
  populate: [],
};

const getHouseRatings = async (houseId, options = defaultOptions) => {
  const limit = Math.min(30, Math.max(0, options.limit));
  const skip = (Math.max(1, options.page) - 1) * limit;

  const ratings = HouseRatingModel.find({ house: houseId })
    .skip(skip)
    .limit(limit)
    .sort(options.sort)
    .populate(options.populate)
    .exec();

  return ratings;
};

module.exports = {
  getHouseRatings,
};
