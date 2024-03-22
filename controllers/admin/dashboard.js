const { StatusCodes } = require("http-status-codes");
const getUsersService = require("../../services/users/getUsers.service.js");
const getHouseService = require("../../services/houses/getHouses.service.js");
const getCommentService = require("#");

const getDashboardPage = async (req, res, next) => {
  try {
    const users = await getUsersService.getAllUsers();
    const houses = await getHouseService.getAllHouses();
    const comments = await getCommentService.getAllComments();

    res.status(StatusCodes.OK).json({
      users,
      houses,
      comments,
    });
  } catch (error) {
    next(error);
  }

  const pageMetadata = {
    title: "Dashboard",
  };

  return res.render("pages/admin/dashboard", {
    page: pageMetadata,
  });
};

module.exports = {
  getDashboardPage,
};
