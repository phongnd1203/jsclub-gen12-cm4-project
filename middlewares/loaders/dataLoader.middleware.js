const getDistrictsService = require("../../services/districts/getDistricts.service.js");

const dataLoader = async (req, res, next) => {
  try {
    req.app.locals = {
      user: req.session.user,
      districts: await getDistrictsService.getDistricts(),
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = dataLoader;
