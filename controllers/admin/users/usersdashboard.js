const { StatusCodes } = require("http-status-codes");

const userdashboardService = require('../../../services/admins/userdashboard.service.js');

const getUserDashboardPage = async(req, res, next) => {
  try{
    dashboardData = await userdashboardService.getAdminDashboardData();
    res.status(StatusCodes.OK).json(dashboardData);
  } catch(err) {
    console.log(err);
  };


  const pageMetadata = {
    title: "UserDashboard",
  };

  return res.render("admin/dashboard", {
    page: pageMetadata,
  });
};

module.exports = {
  getUserDashboardPage,
};
