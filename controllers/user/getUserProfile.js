const getHousesService = require("../../services/houses/getHouses.js");

const getUserProfilePage = async (req, res, next) => {
  try {
    const metadata = { title: "Trang cá nhân" };

    const houses = await getHousesService.getHousesByOwner(req.session.userId, {
      limit: 10,
      page: 1,
      sort: { createdAt: -1 },
      populate: ["images"],
    });

    res.render("pages/user/profile.ejs", { metadata, houses });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProfilePage };
