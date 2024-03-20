const getUsersService = require("../../services/users/getUsers.service.js");

const getUsersDataPage = async (req, res, next) => {
  try {
    const users = await getUsersService.getAllUsers();

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
