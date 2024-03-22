const HouseModel = require("../../models/houses/house.js");

const defaultOptions = {
  limit: 30,
  page: 1,
  sort: { createdAt: -1 },
  populate: [],
};

const getHouses = async (options = defaultOptions) => {
  const limit = Math.min(30, Math.max(0, options.limit));
  const skip = (Math.max(1, options.page) - 1) * limit;

  const houses = HouseModel.find()
    .skip(skip)
    .limit(limit)
    .sort(options.sort)
    .populate(options.populate)
    .exec();

  return houses;
};

const getFeaturedHouses = async (options = defaultOptions) => {
  const limit = Math.min(30, Math.max(0, options.limit));
  const skip = (Math.max(1, options.page) - 1) * limit;

  const houses = HouseModel.find({ isFeatured: true })
    .skip(skip)
    .limit(limit)
    .sort(options.sort)
    .populate(options.populate)
    .exec();

  return houses;
};

const getHousesByOwner = async (ownerId, options = defaultOptions) => {
  const limit = Math.min(30, Math.max(0, options.limit));
  const skip = (Math.max(1, options.page) - 1) * limit;

  const houses = HouseModel.find({ owner: ownerId })
    .skip(skip)
    .limit(limit)
    .sort(options.sort)
    .populate(options.populate)
    .exec();

  return houses;
};

const getHouseById = async (houseId, populate = "") => {
  const house = HouseModel.findById(houseId).populate(populate).exec();

  return house;
};

const countHouses = async () => {
  const count = HouseModel.countDocuments().exec();
  return count;
};

module.exports = {
  getHouses,
  getHousesByOwner,
  getFeaturedHouses,
  getHouseById,
  countHouses,
};
