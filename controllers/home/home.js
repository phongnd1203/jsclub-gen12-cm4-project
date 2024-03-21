const getHousesService = require("../../services/houses/getHouses.js");

const getHomePage = async (req, res, next) => {
  try {
    const metadata = {
      title: "Trang chủ",
    };

    const ownedHouses = await getHousesService.getHousesByOwner(
      req.session.userId,
      6,
      0,
    );

    const featuredHouses = await getHousesService.getFeaturedHouses(6, 0);

    const latestHouses = await getHousesService.getHouses(6, 0, {
      createdAt: "desc",
    });

    return res.render("home", {
      metadata,
      ownedHouses,
      featuredHouses,
      latestHouses,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getHomePage,
};
