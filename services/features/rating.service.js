const RatingModel = require('../../models/feature/rating.model');

// CREATE: Thêm một đánh giá mới
const addRating = async (house, user, score) => {
  try {
    const newRate = new RatingModel({
      house,
      user,
      score
    });
    const rate = await RatingModel.findOne({ house, user }).exec();
    if (rate) { //update
      rate.score = score;
      await rate.save();
    } else {
      await newRate.save();
    }
    return newRate;
  } catch (error) {
    throw error;
  }
};


// READ: Lấy trung binh cong đánh giá của một căn nhà
const getAverageRatings = async (houseId) => {
  try {
    const rates = await RatingModel.find({ house: houseId }).exec();

    if (!rates) return 0;
    else {
      let sum = 0;
      for (let i = 0; i < rates.length; i++)
        sum += rates[i].score;
      return sum / rates.length;
    }
  } catch (error) {
    throw error;
  }
};


// // DELETE: Xóa đánh giá của một người dùng
const deleteRating = async (house, user) => {
  try {
    // const rate = await RatingModel.findOne({ house, user }).exec();
    await RatingModel.deleteOne({ house, user }).exec();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addRating,
  getAverageRatings,
  deleteRating
};