const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getUserService = require("../../services/users/getUsers.service.js");

const userRoles = require("../../constants/enums/userRoles.enum.js");

const getCurrentUserProfilePage = async (req, res, next) => {
  try {
    const { user } = req.session;

    if (!user) {
      return res.redirect("/auth/login");
    }

    res.render("pages/users/profile.view.ejs", {
      user,
      isAdmin: userRoles[user.role] <= userRoles.admin,
    });
  } catch (error) {
    return next(error);
  }
};

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

    const user = await getUserService.getUserById(id);

    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }

    res.render("pages/users/profile.view.ejs", {
      user,
      isAdmin: userRoles[currentUser.role] <= userRoles.admin,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCurrentUserProfilePage,
  getUserProfilePage,
};