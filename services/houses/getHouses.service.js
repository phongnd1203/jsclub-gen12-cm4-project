const HouseModel = require("../../models/houses/house.model.js");

const getAllHouses = async (filter, options) => {
  if (!options?.limit || options.limit < 0 || options.limit > 30) {
    options.limit = 30;
  }

  if (!options?.page || options.page < 1) {
    options.page = 1;
  }

  const houses = await HouseModel.find({
    district: fillter?.district,
    price: {
      $gte: fillter?.price?.min,
      $lte: fillter?.price?.max,
    },
    area: {
      $gte: fillter?.area?.min,
      $lte: fillter?.area?.max,
    },
  })
    .populate("owner", "images")
    .limit(options.limit)
    .skip(options.limit * (options.page - 1));
};

const getHouseById = async (id) => {
  const house = await HouseModel.findById(id).populate("owner").exec();
  return house;
};

const getHousesByUserId = async (userId) => {
  const houses = await HouseModel.find({ owner: userId }).exec();
  return houses;
};

module.exports = {
  getAllHouses,
  getHousesByUserId,
  getHouseById,
};
