const getHousesService = require("../../../services/houses/getHouses.js");
const getHouseRatingsService = require("../../../services/houses/ratings/getHouseRatings.js");

const getRatingsPage = async (req, res, next) => {
  try {
    const { houseId } = req.params;

    const house = await getHousesService.getHouse(houseId);
    const ratings = await getHouseRatingsService.getHouseRatings(houseId);

    res.render("pages/houses/ratings/list", {
      house,
      ratings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRatingsPage,
};
