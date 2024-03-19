const getUsersService = require("../../services/users/getUsers.service.js")
const getDashboardPage = async (req, res, next) => {
  try {
  const metadata = {
    page: { title: "Users" }
  }

  const users = await getUsersService.getUsers()
  res.render("pages/admin/users.view.ejs", {
    page: {
      title: "hello"
    }, users
  }); 
} catch (error) {
  next (error)
}
};

module.exports = {
  getDashboardPage,
};
