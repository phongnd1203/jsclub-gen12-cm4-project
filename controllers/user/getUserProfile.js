const getUserProfilePage = (req, res) => {
  const metadata = { title: "Trang cá nhân" };

  res.render("user/profile.ejs", { metadata });
};

module.exports = { getUserProfilePage };
