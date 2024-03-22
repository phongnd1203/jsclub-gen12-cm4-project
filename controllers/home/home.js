const getHousesService = require("../../services/houses/getHouses.js");

const getHomePage = async (req, res, next) => {
  try {
    const metadata = {
      title: "Trang chủ",
    };

    const ownedHouses = await getHousesService.getHousesByOwner(
      req.session.userId,
      {
        limit: 6,
        populate: ["images"],
      },
    );

    const featuredHouses = await getHousesService.getFeaturedHouses({
      limit: 6,
      populate: ["images"],
    });

    const latestHouses = await getHousesService.getHouses({
      limit: 6,
      populate: ["images"],
    });

    return res.render("pages/home", {
      metadata,
      ownedHouses,
      featuredHouses,
      latestHouses,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getHomePage,
};
