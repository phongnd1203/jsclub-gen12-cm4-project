const getHousesService = require("../../services/houses/getHouses.service.js");

const getListHousesPage = async (req, res, next) => {
  try {
    res.render("pages/houses/list.view.ejs", {
      houses: await getHousesService.getAllHouses(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListHousesPage,
};
