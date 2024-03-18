const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getUserService = require("../../services/users/getUsers.service.js");
const deleteUserService = require("../../services/users/deleteUser.service.js");

const userRoles = require("../../constants/enums/userRoles.enum.js");

const getDeleteCurrentUserPage = async (req, res, next) => {
  try {
    const { user } = req.session;

    res.render("pages/users/delete.view.ejs", {
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

    res.redirect("/");
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

    res.render("pages/users/delete.view.ejs", {
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

    res.redirect("/");
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
