const getUsersService = require("../../../services/users/getUsers.js");

const getUsersPage = async (req, res, next) => {
  try {
    const { page } = req.query;

    const users = await getUsersService.getUsers({ page });

    metadata = {
      title: "Users",
    };

    return res.render("pages/admin/users/list.ejs", {
      metadata,
      users,
    });
  } catch (error) {
    return next(error);
  }
};

const getUserDetailPage = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await getUsersService.getUserById(userId);

    metadata = {
      title: "User Detail",
    };

    return res.render("pages/admin/users/detail.ejs", {
      metadata,
      user,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsersPage,
  getUserDetailPage,
};
