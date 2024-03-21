const getUserProfilePage = (req, res) => {
  const metadata = { title: "Trang cá nhân" };

  res.render("pages/user/profile.ejs", { metadata });
};

module.exports = { getUserProfilePage };
