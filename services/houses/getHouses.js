const HouseModel = require("../../models/houses/house.js");

const getFileService = require("../files/getFiles.js");

const defaultOptions = {
  limit: 30,
  page: 1,
  sort: { createdAt: -1 },
  populate: [],
};

const getHouses = async (options) => {
  const _options = { ...defaultOptions, ...options };

  const limit = Math.min(30, Math.max(0, _options.limit));
  const skip = (Math.max(1, _options.page) - 1) * limit;

  let houses = await HouseModel.find()
    .skip(skip)
    .limit(limit)
    .sort(_options.sort)
    .populate(_options.populate)
    .exec();

  console.log(JSON.stringify(houses, null, 2));
  console.log("===============================================");

  if (_options.populate.includes("images")) {
    const promises = houses.map(async (house) => {
      const images = await getFileService.getFiles(house.images);
      return { ...house._doc, images };
    });

    houses = await Promise.all(promises);
  }

  console.log(JSON.stringify(houses, null, 2));

  return houses;
};

const getFeaturedHouses = async (options) => {
  const _options = { ...defaultOptions, ...options };

  const limit = Math.min(30, Math.max(0, _options.limit));
  const skip = (Math.max(1, _options.page) - 1) * limit;

  let houses = await HouseModel.find({ isFeatured: true })
    .skip(skip)
    .limit(limit)
    .sort(_options.sort)
    .populate(_options.populate)
    .exec();

  if (_options.populate.includes("images")) {
    const promises = houses.map(async (house) => {
      const images = await getFileService.getFiles(house.images);
      return { ...house._doc, images };
    });

    houses = await Promise.all(promises);
  }

  return houses;
};

const getHousesByOwner = async (ownerId, options) => {
  const _options = { ...defaultOptions, ...options };

  const limit = Math.min(30, Math.max(0, _options.limit));
  const skip = (Math.max(1, _options.page) - 1) * limit;

  let houses = await HouseModel.find({ owner: ownerId })
    .skip(skip)
    .limit(limit)
    .sort(_options.sort)
    .populate(_options.populate)
    .exec();

  if (_options.populate.includes("images")) {
    const promises = houses.map(async (house) => {
      const images = await getFileService.getFiles(house.images);
      return { ...house._doc, images };
    });

    houses = await Promise.all(promises);
  }

  return houses;
};

const getHouseById = async (houseId, populate = []) => {
  const house = HouseModel.findById(houseId).populate(populate).exec();

  if (populate.includes("images")) {
    const images = await getFileService.getFiles(house.images);
    house.images = images;
  }

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
