const getDashboardPage = (req, res) => {
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
