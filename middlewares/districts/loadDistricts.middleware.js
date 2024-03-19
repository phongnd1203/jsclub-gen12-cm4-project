const getDistrictsService = require("../../services/districts/getDistricts.service.js");

const loadDistricts = async (req, res, next) => {
  try {
    const districts = await getDistrictsService.getDistricts();
    req.app.locals.districts = districts;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = loadDistricts;
