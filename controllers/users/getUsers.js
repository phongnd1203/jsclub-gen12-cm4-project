const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getUserService = require("../../services/users/getUsers.js");

const userRoles = require("../../enums/userRoles.js");

const getUserProfilePage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { user: currentUser } = req.session;

    if (!currentUser) {
      return res.redirect("/auth/login");
    }

    if (currentUser.id === id) {
      return res.redirect("/users/profile");
    }

    const user = await getUserService.getUser(id);

    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }

    return res.render("pages/users/profile.ejs", {
      user,
      isAdmin: userRoles[currentUser.role] <= userRoles.admin,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUserProfilePage,
};
