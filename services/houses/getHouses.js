const HouseModel = require("../../models/houses/house.js");

const getHouses = async (pageLimit, pageNumber, sort, populate) => {
  const limit = Math.min(30, Math.max(0, pageLimit));
  const skip = (Math.max(1, pageNumber) - 1) * limit;

  let query = HouseModel.find().skip(skip).limit(limit);

  if (sort) {
    query = query.sort(sort);
  }

  if (populate) {
    query = query.populate(populate);
  }

  const houses = await query.exec();

  return houses;
};

const getFeaturedHouses = async (pageLimit, pageNumber, sort, populate) => {
  const limit = Math.min(30, Math.max(1, pageLimit));
  const skip = (Math.max(1, pageNumber) - 1) * limit;
  let query = HouseModel.find({ isFeatured: true }).skip(skip).limit(limit);
  if (sort) {
    query = query.sort(sort);
  }
  if (populate) {
    query = query.populate(populate);
  }
  const houses = await query.exec();
  return houses;
};

const getHousesByOwner = async (
  ownerId,
  pageLimit,
  pageNumber,
  sort,
  populate,
) => {
  const limit = Math.min(30, Math.max(0, pageLimit));
  const skip = (Math.max(1, pageNumber) - 1) * limit;

  let query = HouseModel.find({ owner: ownerId }).skip(skip).limit(limit);

  if (sort) {
    query = query.sort(sort);
  }

  if (populate) {
    query = query.populate(populate);
  }

  const houses = await query.exec();

  return houses;
};

const getHouseById = async (houseId, populate) => {
  let query = HouseModel.findById(houseId);
  if (populate) {
    query = query.populate(populate);
  }
  const house = await query.lean().exec();

  if (!house) {
    throw new Error("Không tìm thấy nhà");
  }

  return house;
};

module.exports = {
  getHouses,
  getHousesByOwner,
  getFeaturedHouses,
  getHouseById,
};
