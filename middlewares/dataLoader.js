const { config } = require("../configs/appConfig.js");

const getUsersService = require("../services/users/getUsers.js");
const getDistrictsService = require("../services/districts/getDistricts.js");

const houseStatus = require("../enums/houseStatus.js");

const dataLoader = async (req, res, next) => {
  try {
    const user = await getUsersService.getUserById(req.session.userId);
    req.user = user;
    req.app.locals.user = user;

    const districts = await getDistrictsService.getDistricts();
    const listHouseStatus = Object.keys(houseStatus).map((key) => ({
      key,
      value: houseStatus[key],
    }));

    req.app.locals.enums = {
      districts,
      houseStatus: listHouseStatus,
    };

    req.app.locals.maps = { apiKey: config.google.maps.apiKey };

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = dataLoader;
