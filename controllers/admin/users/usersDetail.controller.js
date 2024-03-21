const { StatusCodes } = require("http-status-codes");
const getUsersService = require("../../../services/users/getUsers.service.js");

const getUsersDataPage = async (req, res, next) => {
  try {
    const userId = req.session.user._id;

    const users = await getUsersService.getAllUsers(userId);

    res.status(StatusCodes.OK).json(users);

    const pageMetadata = {
      title: "User Data",
    };

    return res.render("admin/users", {
      page: pageMetadata,
      users,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsersDataPage,
};
