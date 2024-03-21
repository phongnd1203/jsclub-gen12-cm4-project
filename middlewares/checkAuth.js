const { StatusCodes } = require("http-status-codes");
const HttpException = require("../utils/httpException.js");

const userRoles = require("../enums/userRoles.js");

const checkAuth = (role, throwHttpException) => async (req, res, next) => {
  try {
    if (!req.session.userId) {
      if (throwHttpException) {
        throw new HttpException(
          StatusCodes.UNAUTHORIZED,
          "Bạn cần đăng nhập để thực hiện hành động này",
        );
      }

      return res.redirect("/auth/login");
    }

    if (role) {
      const { user } = req.app.locals;

      if (userRoles[user.role] < userRoles[role]) {
        if (!throwHttpException) {
          return res.redirect("back");
        }

        throw new HttpException(
          StatusCodes.FORBIDDEN,
          "Bạn không có quyền thực hiện hành động này",
        );
      }
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = checkAuth;
