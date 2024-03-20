const getDashboardPage = (req, res) => {
  const pageMetadata = {
    title: "Dashboard",
  };

  return res.render("admin/dashboard", {
    page: pageMetadata,
  });
};

module.exports = {
  getDashboardPage,
};
