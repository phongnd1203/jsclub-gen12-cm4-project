const HouseModel = require('./path/to/HouseModel'); // Import your House model
 
// CREATE: Thêm một đánh giá mới
const addRating = async (houseId, userId, stars) => {
  try {
    const house = await HouseModel.findById(houseId);
    if (!house) {
      throw new Error("House not found");
    }

    house.ratings.push({ user: userId, stars });
    await house.save();
    return house;
  } catch (error) {
    throw error;
  }
};

// READ: Lấy tất cả đánh giá của một căn nhà
const getRatings = async (houseId) => {
  try {
    const house = await HouseModel.findById(houseId);
    if (!house) {
      throw new Error("House not found");
    }
    return house.ratings;
  } catch (error) {
    throw error;
  }
};

// UPDATE: Cập nhật đánh giá của một người dùng
const updateRating = async (houseId, userId, stars) => {
  try {
    const house = await HouseModel.findById(houseId);
    if (!house) {
      throw new Error("House not found");
    }

    const rating = house.ratings.find(rating => rating.user.equals(userId));
    if (!rating) {
      throw new Error("Rating not found");
    }

    rating.stars = stars;
    await house.save();
    return house;
  } catch (error) {
    throw error;
  }
};

// DELETE: Xóa đánh giá của một người dùng
const deleteRating = async (houseId, userId) => {
  try {
    const house = await HouseModel.findById(houseId);
    if (!house) {
      throw new Error("House not found");
    }

    house.ratings = house.ratings.filter(rating => !rating.user.equals(userId));
    await house.save();
    return house;
  } catch (error) {
    throw error;
  }
};

module.exports = { 
  addRating, 
  getRatings, 
  updateRating, 
  deleteRating 
};