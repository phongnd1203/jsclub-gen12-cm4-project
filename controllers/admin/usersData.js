const getUsersService = require("../../services/users/getUsers.js");

const getUsersDataPage = async (req, res, next) => {
  try {
    const users = await getUsersService.getAllUsers();

    const pageMetadata = {
      title: "User Data",
    };

    return res.render("pages/admin/users", {
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
