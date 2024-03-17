const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getUserService = require("../../services/users/getUser.service.js");

const userRoles = require("../../constants/enums/userRoles.enum.js");

const getCurrentUserProfilePage = async (req, res) => {
  const { user } = req.session;

  if (!user) {
    return res.redirect("/auth/login");
  }

  res.render("pages/users/profile.view.ejs", {
    user,
    isAdmin: userRoles[user.role] <= userRoles.admin,
  });
};

const getUserProfilePage = async (req, res) => {
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

  res.render("pages/users/profile.view.ejs", {
    user,
    isAdmin: userRoles[currentUser.role] <= userRoles.admin,
  });
};

module.exports = {
  getCurrentUserProfilePage,
  getUserProfilePage,
};
