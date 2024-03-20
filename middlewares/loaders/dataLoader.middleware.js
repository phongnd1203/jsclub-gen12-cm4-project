const getUsersService = require("../../services/users/getUsers.service.js");
const getDistrictsService = require("../../services/districts/getDistricts.service.js");

const houseStatus = require("../../constants/enums/houseStatus.enum.js");

const dataLoader = async (req, res, next) => {
  console.log("dataLoader");

  try {
    try {
      const user = await getUsersService.getUserById(req.session.userId);

      console.log("user", user);

      req.app.locals.user = user;
    } catch (error) {
      req.app.locals.user = null;
    }

    const districts = await getDistrictsService.getDistricts();
    const listHouseStatus = Object.keys(houseStatus).map((key) => ({
      key,
      value: houseStatus[key],
    }));

    req.app.locals.enums = {
      districts,
      houseStatus: listHouseStatus,
    };

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = dataLoader;
