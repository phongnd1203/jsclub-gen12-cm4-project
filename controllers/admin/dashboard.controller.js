const getDashboardPage = (req, res) => {
  res.render("pages/admin/dashboard.view.ejs");
};

module.exports = {
  getDashboardPage,
};
