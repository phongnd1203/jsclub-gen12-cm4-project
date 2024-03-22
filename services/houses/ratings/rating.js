const HouseModel = require("../../../models/houses/house.js");
const HouseRatingModel = require("../../../models/houses/ratings/rating.js");

const getYourRating = async (houseId, userId) => {
  const ratings = await HouseRatingModel.find({
    house: houseId,
    user: userId,
  }).exec();
  return ratings;
};
const createRating = async (houseId, userId, rating) => {
  if (rating < 1 || rating > 5) {
    throw new Error("Đánh giá phải từ 1 đến 5 sao");
  }

  let isExist = await HouseRatingModel.findOne({
    house: houseId,
    user: userId,
  }).exec();
  if (isExist) {
    isExist.score = rating;
    await isExist.save();
    // await HouseModel.findByIdAndUpdate(isExist._id, {score: rating}, {new: true}).exec();
    return;
  }

  isExist = new HouseRatingModel({
    house: houseId,
    user: userId,
    score: rating,
  });

  await isExist.save();
};

const deleteRating = async (ratingId) => {
  const rating = await HouseRatingModel.findById(ratingId).exec();

  if (!rating.length) {
    return;
  }

  await HouseRatingModel.findByIdAndDelete(ratingId).exec();

  return;
};

module.exports = {
  getYourRating,
  createRating,
  deleteRating,
};
