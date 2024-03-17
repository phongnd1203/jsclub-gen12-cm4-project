const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const getUserService = require("../../services/users/getUser.service.js");
const updateUserService = require("../../services/users/updateUser.service.js");

const userRoles = require("../../constants/enums/userRoles.enum.js");

const getUpdateCurrentUserPage = async (req, res) => {
  const { user } = req.session;

  res.render("pages/users/edit.view.ejs", {
    user,
  });
};

const postUpdateCurrentUser = async (req, res) => {
  const { user } = req.session;

  const { name, phone, email, password } = req.body;

  await updateUserService.updateUser(user.id, {
    name,
    phone,
    email,
    password,
  });

  res.redirect("/users/profile");
};

const getUpdateUserPage = async (req, res) => {
  const { id } = req.params;

  const { user: currentUser } = req.session;

  if (currentUser.id === id) {
    return res.redirect("/users/edit");
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

  res.render("pages/users/edit.view.ejs", {
    user,
  });
};

const postUpdateUser = async (req, res) => {
  const { id } = req.params;

  const { name, phone, email, password, role } = req.body;

  const updatedUser = await updateUserService.updateUser(id, {
    name,
    phone,
    email,
    password,
    role,
  });

  res.redirect(`/users/${id}/profile`);
};

module.exports = {
  getUpdateCurrentUserPage,
  postUpdateCurrentUser,
  getUpdateUserPage,
  postUpdateUser,
};
