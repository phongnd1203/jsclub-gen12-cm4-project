const { StatusCodes } = require("http-status-codes");
const HttpException = require("../../utils/httpException.js");

const userRoles = require("../../constants/enums/userRoles.enum.js");

const checkAdmin = (role) => (req, res, next) => {
  const { user } = req.session;

  if (!user || userRoles[user.role] > (role || userRoles.admin)) {
    throw new HttpException(StatusCodes.FORBIDDEN, "Không có quyền truy cập");
  }

  next();
};

module.exports = checkAdmin;
