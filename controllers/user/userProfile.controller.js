const getHousesService = require("../../services/houses/getHouses.service.js");

const getUserProfilePage = async (req, res, next) => {
  const { user } = req.session;

  const houses = await getHousesService.getHousesByUserId(user._id);

  res.render("pages/users/user-profile.view.ejs", {
    houses,
  });
};

module.exports = {
  getUserProfilePage,
};
