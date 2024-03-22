const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getUserService = require("../../services/users/getUsers.js");
const deleteUserService = require("../../services/users/deleteUser.js");

const userRoles = require("../../enums/userRoles.js");

const getDeleteCurrentUserPage = async (req, res, next) => {
  try {
    const { user } = req.session;

    return res.render("pages/users/delete.ejs", {
      user,
    });
  } catch (error) {
    return next(error);
  }
};

const postDeleteCurrentUser = async (req, res, next) => {
  try {
    const { user } = req.session;

    await deleteUserService.deleteUser(user.id);
    req.session.destroy();

    return res.redirect("/");
  } catch (error) {
    return next(error);
  }
};

const getDeleteUserPage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { user: currentUser } = req.session;

    if (currentUser.id === id) {
      return res.redirect("/users/delete");
    }

    if (userRoles[currentUser.role] > userRoles.admin) {
      throw new HttpException(
        StatusCodes.FORBIDDEN,
        "Không có quyền truy cập trang này",
      );
    }

    const user = await getUserService.getUser(id);

    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }

    return res.render("pages/users/delete.ejs", {
      user,
    });
  } catch (error) {
    return next(error);
  }
};

const postDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteUserService.deleteUser(id);

    req.session.destroy();

    return res.redirect("/");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDeleteCurrentUserPage,
  postDeleteCurrentUser,
  getDeleteUserPage,
  postDeleteUser,
};
